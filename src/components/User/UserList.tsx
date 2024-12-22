import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { User } from "../../types/user";

interface UserListProps {
  users: User[] | undefined; // Izinkan undefined
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ users = [], onEdit, onDelete }) => {
  console.log("UserList received users:", users); // Log daftar pengguna

  if (!users || users.length === 0) {
    return <p className="text-gray-500 text-center">Tidak ada data pengguna.</p>;
  }

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h3 className="text-lg font-bold text-gray-700 mb-4">Daftar Pengguna</h3>
      <table className="w-full table-auto border-collapse border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-blue-100 text-blue-800 text-sm">
            <th className="border border-gray-300 p-3 text-left">No</th>
            <th className="border border-gray-300 p-3 text-left">Nama</th>
            <th className="border border-gray-300 p-3 text-left">Username</th>
            <th className="border border-gray-300 p-3 text-left">Email</th>
            <th className="border border-gray-300 p-3 text-left">Nomor WA</th>
            <th className="border border-gray-300 p-3 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.username || user.id}>
              <td className="border border-gray-300 p-3">{index + 1}</td>
              <td className="border border-gray-300 p-3">{user.nama}</td>
              <td className="border border-gray-300 p-3">{user.username}</td>
              <td className="border border-gray-300 p-3">{user.email}</td>
              <td className="border border-gray-300 p-3">{user.nomorWa}</td>
              <td className="border border-gray-300 p-3 text-center flex gap-4 justify-center">
                <button onClick={() => onEdit(user)} className="text-blue-500 hover:text-blue-700">
                  <FaEdit size={18} />
                </button>
                <button onClick={() => onDelete(user)} className="text-red-500 hover:text-red-700">
                  <FaTrashAlt size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default UserList;
