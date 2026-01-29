import { useEffect, useState } from "react";

import CommentsTable from "./CommentsTable";
import SuperAdminPageTitle from "../superAdminPageTitle/SuperAdminPageTitle";
import Swal from "sweetalert2";
import UpdateCommentsModal from "./UpdateCommentsModal";
import apiRequest from "../utils/apiRequest";

const ManageComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  console.log("Comments:", comments);

  // Fetch comments on component mount
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token"); // Retrieve token
        const response = await apiRequest("/comments", "GET", null, token, {
          autoMessage: false,
        });
        if (response.success) {
          console.log("Comments:", response.data);
        }
        setComments(response.data);
      } catch (error) {
        setErrorMessage("Something went wrong. Please try again.", error);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, []);

  // Handlers for edit and delete actions (to be implemented)
  const handleEditComment = (comment) => {
    // Logic for opening modal and editing comment
    console.log("Edit button clicked for:", comment);
    setSelectedComment(comment);
    setShowUpdateModal(true);
  };

  const handleUpdateComment = async (updatedComment) => {
    try {
      console.log("Updating comment:", updatedComment._id); // Debugging

      const token = localStorage.getItem("token");
      const response = await apiRequest(
        `/comments/${updatedComment._id}`,
        "PATCH",
        updatedComment,
        token,
      );

      if (response) {
        // Update the state with the updated comment
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === updatedComment._id
              ? { ...comment, ...updatedComment }
              : comment,
          ),
        );
        setShowUpdateModal(false); // Close modal
        // Swal.fire("Success", "Comment updated successfully!", "success");
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    // Show a confirmation message before proceeding with the deletion
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the comment!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true, // To place 'Cancel' on the left
    });

    if (result.isConfirmed) {
      try {
        // Proceed with the deletion if user confirms
        const response = await apiRequest(
          `/comments/${commentId}`,
          "DELETE",
          null,
          localStorage.getItem("token"),
        );

        if (response) {
          // Optionally, update your state to remove the deleted comment from the UI
          setComments((prevComments) =>
            prevComments.filter((comment) => comment._id !== commentId),
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
          // Swal.fire("Deleted!", "The comment has been deleted.", "success");
        } else {
          Swal.fire(
            "Error",
            "There was a problem deleting the comment.",
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
      <SuperAdminPageTitle
        title="Manage"
        decoratedText="Comments"
        subtitle="Super admin only!"
      />
      <div className="flex lg:justify-center items-center lg:mb-4 bg-base-200 p-2 shadow-sm">
        <h2 className="text-xl font-bold flex items-center">
          Comments List: {comments?.length > 0 ? comments?.length : 0}
        </h2>
      </div>

      <div className="p-2 shadow-sm">
        {/* Pass tags to TagTable */}
        {loading ? (
          <div className="text-center">
            <span className="loading loading-ring loading-lg"></span>
          </div>
        ) : (
          <CommentsTable
            comments={comments}
            onEdit={handleEditComment}
            onDelete={handleDeleteComment}
          />
        )}

        {showUpdateModal && selectedComment && (
          <UpdateCommentsModal
            comment={selectedComment}
            onClose={() => setShowUpdateModal(false)}
            onUpdate={handleUpdateComment}
          />
        )}
      </div>
    </div>
  );
};

export default ManageComments;
