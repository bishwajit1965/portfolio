import {
  FaCloudUploadAlt,
  FaDatabase,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa";
import SuperAdminPageSubHeader from "../superAdminPageSubHeader/SuperAdminPageSubHeader";
import DataTable from "react-data-table-component";
import { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import api from "../../services/api";
import MiniButton from "../../components/buttons/MiniButton";
import SystemPreferencesForm from "./SystemPreferencesForm";

const ManageSystemPreferences = () => {
  const [filterText, setFilterText] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [systemPreferences, setSystemPreferences] = useState([]);
  const [mode, setMode] = useState("create");
  const [selectedSystemPreference, setSelectedSystemPreference] =
    useState(null);

  const [isOpenSystemPreferencesForm, setIsOpenSystemPreferencesForm] =
    useState(false);

  console.log("Selected system preference", selectedSystemPreference);
  console.log("Selected system mode", mode);

  // Handlers
  const handleClearSearchText = () => {
    setFilterText("");
  };

  const handleEditSystemPreferences = (item) => {
    // setSelectedSystemPreference(item);
    handleSystemPreferencesFormToggle("edit", item);
  };

  const handleSystemPreferencesFormToggle = (
    formMode = "create",
    item = null,
  ) => {
    setMode(formMode);
    setSelectedSystemPreference(item);
    setIsOpenSystemPreferencesForm((prev) => !prev);
  };

  const fetchSystemPreferences = async (page, limit) => {
    try {
      setLoading(true);
      const response = await api.get("/system-settings", {
        params: {
          page,
          limit,
        },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // Attach the JWT token
      });
      console.log("Responses:", response);
      // Update the users and pagination state
      setSystemPreferences(response?.data?.data); // Use the data field from the backend response
      setTotalRows(response?.data?.totalRows); // Set total number of rows for pagination
    } catch (error) {
      console.error("Failed to fetch system preferences", error);
      Swal.fire("Error", "Failed to fetch system preferences", "error");
    } finally {
      setLoading(false); // Stop the loading spinner
    }
  };

  // Fetch users initially and when page or rows per page changes
  useEffect(() => {
    fetchSystemPreferences(currentPage, rowsPerPage); // Fetch users with current pagination
  }, [currentPage, rowsPerPage]);

  console.log("System Preferences", systemPreferences);

  const handleDeleteSystemPreferencesToggler = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
    });

    if (!confirm.isConfirmed) return;

    try {
      const response = await api.delete(`/system-settings/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        Swal.fire("Deleted!", "System preferences deleted.", "success");

        fetchSystemPreferences(currentPage, rowsPerPage);
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error?.response?.data?.message || "Delete failed",
        "error",
      );
    }
  };

  // Define columns for DataTable
  const columns = [
    {
      name: "S.No", // Serial number column
      selector: (row, index) => (currentPage - 1) * rowsPerPage + index + 1, // Serial number
      width: "75px",
      sortable: true,
    },
    {
      name: "AppName",
      selector: (row) => row.appName,
      sortable: true,
      width: "480px",
    },

    {
      name: "Photo",
      selector: (row) => (
        <img
          src={row.imageUrl}
          alt={row.name}
          style={{ width: "35px", height: "35px", borderRadius: "50%" }}
        />
      ),
      sortable: true,
      width: "490px",
    },

    {
      name: "Actions",
      cell: (row) => (
        <div className="lg:flex items-center grid gap-1">
          <MiniButton
            icon={<FaEdit />}
            variant="default"
            onClick={() => handleEditSystemPreferences(row)}
            label="Edit"
          />
          <MiniButton
            icon={<FaTrashAlt />}
            variant="danger"
            onClick={() => handleDeleteSystemPreferencesToggler(row?._id)}
            label="Delete"
          />
        </div>
      ),
    },
  ];

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page); // Update current page in the state
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage); // Update rows per page in the state
  };

  return (
    <div>
      <SuperAdminPageSubHeader
        title="System"
        decoratedText="Preferences Management Table"
        dataLength={systemPreferences?.length}
        variant="success"
        buttonLabel="Add System Preferences"
        icon={<FaCloudUploadAlt size={20} />}
        labelIcon={<FaDatabase />}
        searchBox={true}
        setFilterText={setFilterText}
        onButtonClick={() => handleSystemPreferencesFormToggle("create")}
        //✅ For refreshing search input field
        filterText={filterText} //important for clearing field
        refreshButton={true}
        onRefreshBtnClick={handleClearSearchText}
      />

      <div className="lg:p-4 p-2">
        {isOpenSystemPreferencesForm && (
          <SystemPreferencesForm
            onCancel={handleSystemPreferencesFormToggle}
            selectedSystemPreference={selectedSystemPreference}
            mode={mode}
            refetch={fetchSystemPreferences}
          />
        )}

        {loading ? (
          <div className="text-center">
            <span className="loading loading-ring loading-lg admin-dark:text-slate-200"></span>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={systemPreferences}
            pagination
            paginationServer
            paginationTotalRows={totalRows} // Total rows fetched from backend
            onChangePage={handlePageChange} // Handle page change
            onChangeRowsPerPage={handleRowsPerPageChange} // Handle rows per page change
            paginationPerPage={rowsPerPage} // Set rows per page
            highlightOnHover
            dense
            pointerOnHover
            responsive
            striped
          />
        )}
      </div>
    </div>
  );
};

export default ManageSystemPreferences;
