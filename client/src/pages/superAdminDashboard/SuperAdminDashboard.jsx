import { useEffect, useState } from "react";

import { FaEdit } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import axios from "axios";

const SuperAdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [updatedRoles, setUpdatedRoles] = useState({});
  console.log("Users:", users);
  // Fetch all users from the backend

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const response = await axios.get(
          "http://localhost:5000/api/admin/users",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUsers(response.data.data); // assuming response.data.data contains users array
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();
  }, []);

  // handle role assignment in drop down
  const handleRoleChange = async (userId, newRole) => {
    // Update the UI after role assignment
    setUpdatedRoles((prevRole) => ({ ...prevRole, [userId]: newRole }));
    alert("Role assigned successfully");
  };
  //  Assign the updated roles to the selected users
  const assignRoles = async () => {
    try {
      await Promise.all(
        Object.keys(updatedRoles).map(async (userId) => {
          await axios.patch(
            `http://localhost:5000/api/admin/users/${userId}/role`,
            { role: updatedRoles[userId] }
          );
        })
      );
      Swal.fire({
        icon: "success",
        title: "Role updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setUpdatedRoles({}); // Clear the role changes after successful assignment
    } catch (error) {
      console.error("Failed to assign roles", error);
      Swal.fire({
        icon: "error",
        title: "Failed to assign roles",
        text: error.message,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Web-tech-services || Admin dashboard</title>
      </Helmet>
      <div className="super-admin-dashboard px-4">
        <h2 className="text-3xl font-bold text-center">
          Super Admin Dashboard
        </h2>
        <table className="table table-xs">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{(index += 1)}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <select
                    value={updatedRoles[user._id] || user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="editor">Editor</option>
                    <option value="admin">Admin</option>
                    <option value="super-admin">Super Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-primary mt-4" onClick={assignRoles}>
          <FaEdit /> Assign Roles
        </button>
      </div>
    </>
  );
};

export default SuperAdminDashboard;
