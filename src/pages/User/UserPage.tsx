import React, { useState } from "react";
import UserList from "../../components/User/UserList";
import { User } from "../../types/user";
import Layout from "../Layout";

const UserPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [users, setUsers] = useState<User[]>([
    {
      nama: "John Doe",
      username: "johndoe",
      email: "john@example.com",
      password: "password123",
      nomorWa: "081234567890",
    },
    {
      nama: "Jane Smith",
      username: "janesmith",
      email: "jane@example.com",
      password: "password123",
      nomorWa: "081987654321",
    },
  ]);

  const handleEdit = (user: User) => {
    console.log("Edit user:", user);
  };

  const handleDelete = (user: User) => {
    console.log("Delete user:", user);
  };

  return (
    <Layout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
      <div className="container mx-auto py-8">
        <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </Layout>
  );
};

export default UserPage;
