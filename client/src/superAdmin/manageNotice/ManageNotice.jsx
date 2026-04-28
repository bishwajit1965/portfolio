import { useEffect, useState } from "react";

import { FaCloudUploadAlt, FaDatabase } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import NoticeTable from "./NoticeTable";
import Swal from "sweetalert2";
import UpdateNoticeModal from "./UpdateNoticeModal";
import apiRequest from "../utils/apiRequest";
import SuperAdminPageSubHeader from "../superAdminPageSubHeader/SuperAdminPageSubHeader";

const ManageNotice = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();

  const handleAddCategoryFormToggle = () => {
    navigate("/super-admin/add-notice");
  };

  const handleClearSearchText = () => {
    setFilterText("");
  };

  // Fetch notices on component mount
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");
        const response = await apiRequest("/notices", "GET", null, token, {
          autoMessage: false,
        });

        if (response.success) {
          console.log("Notices fetched", response.data);
        }

        setNotices(response.data);
      } catch (error) {
        setErrorMessage("Something went wrong. Please try again.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  // Handler methods for editing and deleting notices
  const handleEditNotice = (notice) => {
    // Logic for opening modal and editing notice
    console.log("Notice button clicked", notice);
    setSelectedNotice(notice);
    setShowUpdateModal(true);
  };

  const handleUpdateNotice = async (updatedNotice) => {
    try {
      console.log("Updating notice", updatedNotice._id);
      const token = localStorage.getItem("token");
      const response = await apiRequest(
        `/notices/${updatedNotice._id}`,
        "PATCH",
        updatedNotice,
        token,
      );
      if (response) {
        setNotices((prevNotices) =>
          prevNotices.map((notice) =>
            notice._id === updatedNotice._id
              ? { ...notice, ...updatedNotice }
              : notice,
          ),
        );
        setShowUpdateModal(false);
      }
    } catch (error) {
      console.error("Error in updating notice", error);
    }
  };

  const handleDeleteNotice = async (noticeId) => {
    // Show a confirmation swal message before proceeding with the notice deletion
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the notice!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true, // To place 'Cancel' on the left
    });

    if (result.isConfirmed) {
      try {
        // Proceed with the deletion if the user confirms
        const response = await apiRequest(
          `/notices/${noticeId}`,
          "DELETE",
          null,
          localStorage.getItem("token"),
        );
        if (response) {
          // Optionally update your state to delete the notice from the UI
          setNotices((preNotices) =>
            preNotices.filter((notice) => notice._id !== noticeId),
          );
          Swal.fire({
            icon: "success",
            title: "Success",
            text: response.message || "Operation successful!",
            timer: 3000,
            showConfirmButton: false,
            toast: true,
            position: "top-end",
          });
        } else {
          Swal.fire(
            "Error",
            "There was a problem in deleting the notice.",
            "error",
          );
        }
      } catch (error) {
        console.error("Error deleting comment:", error);
        Swal.fire(
          "Error",
          "Failed to delete the comment. Please try again later.",
          "error",
        );
      }
    }
  };
  if (errorMessage)
    return <div className="text-center text-red-500">{errorMessage}</div>;

  return (
    <div>
      <SuperAdminPageSubHeader
        title="Notices"
        decoratedText="Management Table"
        dataLength={notices?.length}
        variant="success"
        buttonLabel="Add Notice"
        icon={<FaCloudUploadAlt size={20} />}
        labelIcon={<FaDatabase />}
        searchBox={true}
        setFilterText={setFilterText}
        onButtonClick={handleAddCategoryFormToggle}
        // For refreshing search input field
        filterText={filterText} //important for clearing field
        refreshButton={true}
        onRefreshBtnClick={handleClearSearchText}
      />

      {/* Pass notices to notice table */}
      <div className="p-2 shadow-sm w-full overflow-x-auto">
        {loading ? (
          <div className="text-center">
            <span className="loading loading-ring loading-lg admin-dark:text-slate-200"></span>
          </div>
        ) : (
          <NoticeTable
            notices={notices}
            onEdit={handleEditNotice}
            onDelete={handleDeleteNotice}
            filterText={filterText}
          />
        )}

        {showUpdateModal && selectedNotice && (
          <UpdateNoticeModal
            notice={selectedNotice}
            onClose={() => setShowUpdateModal(false)}
            onUpdate={handleUpdateNotice}
          />
        )}
      </div>
    </div>
  );
};

export default ManageNotice;
