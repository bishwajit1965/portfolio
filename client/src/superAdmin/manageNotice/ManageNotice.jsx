import { useEffect, useState } from "react";

import { FaPlusCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import NoticeTable from "./NoticeTable";
import SuperAdminPageTitle from "../superAdminPageTitle/SuperAdminPageTitle";
import Swal from "sweetalert2";
import UpdateNoticeModal from "./UpdateNoticeModal";
import apiRequest from "../utils/apiRequest";

const ManageNotice = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);

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
        token
      );
      if (response) {
        setNotices((prevNotices) =>
          prevNotices.map((notice) =>
            notice._id === updatedNotice._id
              ? { ...notice, ...updatedNotice }
              : notice
          )
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
          localStorage.getItem("token")
        );
        if (response) {
          // Optionally update your state to delete the notice from the UI
          setNotices((preNotices) =>
            preNotices.filter((notice) => notice._id !== noticeId)
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
            "error"
          );
        }
      } catch (error) {
        console.error("Error deleting comment:", error);
        Swal.fire(
          "Error",
          "Failed to delete the comment. Please try again later.",
          "error"
        );
      }
    }
  };
  if (errorMessage)
    return <div className="text-center text-red-500">{errorMessage}</div>;

  return (
    <div>
      <SuperAdminPageTitle
        title="Manage"
        decoratedText="Notices"
        subtitle="Super admin only!"
      />
      <div className="grid lg:grid-cols-12 lg:justify-between items-center justify-between lg:mb-4 bg-base-200 shadow-sm p-2">
        <div className="lg:col-span-4 col-span-12">
          <NavLink to="/super-admin/add-notice" className="m-0">
            <button className="btn btn-xs btn-primary">
              <FaPlusCircle />
              Add Notice
            </button>
          </NavLink>
        </div>

        <div className="lg:col-span-4 col-span-12 flex lg:justify-center items-center">
          <h2 className="text-xl font-bold">
            Notices List: {notices.length > 0 ? notices.length : 0}
          </h2>
        </div>
        <div className="lg:col-span-4 col-span-12 flex lg:justify-center items-center"></div>
      </div>
      {/* Pass notices to notice table */}
      <div className="p-2 shadow-sm">
        {loading ? (
          <div className="text-center">
            <span className="loading loading-ring loading-lg"></span>
          </div>
        ) : (
          <NoticeTable
            notices={notices}
            onEdit={handleEditNotice}
            onDelete={handleDeleteNotice}
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
