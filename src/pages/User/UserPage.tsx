import React, { useEffect, useState } from "react";
import UserList from "../../components/User/UserList";
import UserForm from "../../components/User/UserForm";
import { User } from "../../types/user";
import Layout from "../Layout";
import { userService } from "../../services/userService";

const UserPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Omit<User, "id"> | null>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await userService.getAllUsers();
        setUsers(usersData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleOpenModal = (user?: User) => {
    if (user) {
      setEditingUser({
        nama: user.nama,
        username: user.username,
        email: user.email,
        password: "", // Password kosong saat edit
        nomorWa: user.nomorWa,
      });
    } else {
      setEditingUser(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleSaveUser = async (data: Omit<User, "id">) => {
    try {
      if (editingUser) {
        // Update user
        const updatedUser = await userService.updateUser(
          users.find((u) => u.username === editingUser.username)?.id || 0,
          data
        );
        setUsers((prevUsers) =>
          prevUsers.map((u) => (u.id === updatedUser.id ? updatedUser : u))
        );
      } else {
        // Create user
        const newUser = await userService.createUser(data);
        setUsers((prevUsers) => [...prevUsers, newUser]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      handleCloseModal();
    }
  };

  const handleEdit = (user: User) => {
    handleOpenModal(user);
  };

  const handleDelete = async (user: User) => {
    try {
      await userService.deleteUser(user.id);
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  if (loading) {
    return (
      <Layout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
        <div className="container mx-auto py-8 text-center">Loading...</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
        <div className="container mx-auto py-8 text-center text-red-500">
          Error: {error}
        </div>
      </Layout>
    );
  }

  return (
    <Layout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
      <div className="container mx-auto py-8">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => handleOpenModal()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Tambah Pengguna
          </button>
        </div>
        <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
      </div>

      <UserForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSaveUser}
        initialData={editingUser || undefined}
      />
    </Layout>
  );
};

export default UserPage;
