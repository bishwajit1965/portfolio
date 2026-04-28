import { useEffect, useState } from "react";
import Avatar from "/assets/Avatar-Profile-PNG-Photos.png";
import DataTable from "react-data-table-component";
import { FaUserCog } from "react-icons/fa";
import Swal from "sweetalert2";
import api from "../../services/api";
import SuperAdminPageSubHeader from "../superAdminPageSubHeader/SuperAdminPageSubHeader";
import MiniButton from "../../components/buttons/MiniButton";

const ManageUsers = () => {
  const [users, setUsers] = useState([]); // Users data
  const [loading, setLoading] = useState(true); // Loading state
  const [totalRows, setTotalRows] = useState(0); // Total number of users
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page
  const [filterText, setFilterText] = useState(""); // Filter text for search

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

      // Update the users and pagination state
      setUsers(response?.data?.data); // Use the data field from the backend response
      setTotalRows(response?.data?.length); // Set total number of rows for pagination
    } catch (error) {
      Swal.fire("Error", "Failed to fetch users data", "error", error);
    } finally {
      setLoading(false); // Stop the loading spinner
    }
  };

  // Fetch users initially and when page or rows per page changes
  useEffect(() => {
    fetchUsers(currentPage, rowsPerPage); // Fetch users with current pagination
  }, [currentPage, rowsPerPage]);

  const filteredUsers = users.filter(
    (user) =>
      typeof user.email === "string" &&
      user.email.toLowerCase().includes(filterText.toLowerCase()),
  );

  // Define columns for DataTable
  const columns = [
    {
      name: "S.No",
      selector: (row, index) => (currentPage - 1) * rowsPerPage + index + 1, // Serial number
      width: "60px",
      sortable: true,
    },
    {
      name: "Photo",
      cell: (row) => (
        <img
          src={row?.photoUrl || Avatar}
          alt={row.name}
          style={{ width: "35px", height: "35px", borderRadius: "50%" }}
        />
      ),
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
        <MiniButton
          type="submit"
          label="Assign Role"
          variant="success"
          icon={<FaUserCog />}
          className=" "
          onClick={() => handleAssignRole(row._id)}
        />
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
      customClass: {
        popup: "admin-swal",
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
              },
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
                error.response || error,
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
      <SuperAdminPageSubHeader
        title="Users"
        decoratedText="Management Table"
        dataLength={users.length}
        searchBox={true}
        setFilterText={setFilterText}
      />

      <div className="table-container">
        {loading ? (
          <div className="text-center">
            <span className="loading loading-ring loading-lg admin-dark:text-slate-200"></span>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={filteredUsers}
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
