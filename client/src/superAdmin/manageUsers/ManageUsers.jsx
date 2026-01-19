import { useEffect, useState } from "react";

import Avatar from "/assets/Avatar-Profile-PNG-Photos.png";
import DataTable from "react-data-table-component";
import { FaEdit } from "react-icons/fa";
import SuperAdminPageTitle from "../superAdminPageTitle/SuperAdminPageTitle";
import Swal from "sweetalert2";
import api from "../../services/api";

const ManageUsers = () => {
  const [users, setUsers] = useState([]); // Users data
  const [loading, setLoading] = useState(true); // Loading state
  const [totalRows, setTotalRows] = useState(0); // Total number of users
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page
  console.log("Total users:", users);

  // Function to fetch users data from the backend with pagination
  const fetchUsers = async (page, limit) => {
    try {
      const response = await api.get("/users", {
        params: {
          page,
          limit,
        },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // Attach the JWT token
      });
      console.log("Responses:", response);
      // Update the users and pagination state
      setUsers(response.data.data); // Use the data field from the backend response
      setTotalRows(response.data.totalUsers); // Set total number of rows for pagination
    } catch (error) {
      console.error("Failed to fetch users", error);
      Swal.fire("Error", "Failed to fetch users data", "error");
    } finally {
      setLoading(false); // Stop the loading spinner
    }
  };

  // Fetch users initially and when page or rows per page changes
  useEffect(() => {
    fetchUsers(currentPage, rowsPerPage); // Fetch users with current pagination
  }, [currentPage, rowsPerPage]);

  // Define columns for DataTable
  const columns = [
    {
      name: "S.No",
      selector: (row, index) => (currentPage - 1) * rowsPerPage + index + 1, // Serial number
      width: "60px",
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Photo",
      selector: (row) => (
        <img
          src={row.photoUrl || Avatar}
          alt={row.name}
          style={{ width: "35px", height: "35px", borderRadius: "50%" }}
        />
      ),
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => (row.role ? row.role : "None"),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <button
          className="btn btn-xs btn-primary"
          onClick={() => handleAssignRole(row._id)}
        >
          <FaEdit /> Assign Role
        </button>
      ),
    },
  ];

  // Function to handle role assignment
  const handleAssignRole = (userId) => {
    Swal.fire({
      title: "Assign Role",
      input: "select",
      inputOptions: {
        superAdmin: "Super-admin",
        admin: "Admin",
        editor: "Editor",
        user: "User",
      },
      inputPlaceholder: "Select a role",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to select a role!";
        } else {
          // Log the userId and selected value
          console.log("Assigning role:", value, "to user:", userId);

          // Make API call to update the user role with axios
          api
            .patch(
              `/users/${userId}/role`,
              { role: value },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            )
            .then((response) => {
              if (response.status === 200 && response.data.success) {
                Swal.fire("Success", "Role updated successfully", "success");
                fetchUsers(currentPage, rowsPerPage); // Refresh users list after role update
              } else {
                Swal.fire("Error", "Failed to update role", "error");
              }
            })
            .catch((error) => {
              // Log the error for detailed debugging
              console.error(
                "Error during role update:",
                error.response || error
              );

              // Check if there's an error message from the server
              const errorMessage =
                error.response?.data?.message || "Failed to update role";
              Swal.fire("Error", errorMessage, "error");
            });
        }
      },
    });
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page); // Update current page in the state
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage); // Update rows per page in the state
  };

  return (
    <div className="dashboard">
      <SuperAdminPageTitle
        title="Manage"
        decoratedText="Users"
        subtitle="Manage users here. Assign role and do others. It is for super admin only."
      />

      <div className="table-container">
        {loading ? (
          <div className="text-center">
            <span className="loading loading-ring loading-lg"></span>
          </div>
        ) : (
          <DataTable
            title="Users List"
            columns={columns}
            data={users}
            pagination
            paginationServer
            paginationTotalRows={totalRows} // Total rows fetched from backend
            onChangePage={handlePageChange} // Handle page change
            onChangeRowsPerPage={handleRowsPerPageChange} // Handle rows per page change
            paginationPerPage={rowsPerPage} // Set rows per page
            highlightOnHover
            dense
          />
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
