import { useEffect, useState } from "react";

import { FaPlusCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import SuperAdminPageTitle from "../superAdminPageTitle/SuperAdminPageTitle";
import Swal from "sweetalert2";
import TagTable from "./TagTable";
import UpdateTagModal from "./UpdateTagModal";

const ManageTags = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  console.log("tags", tags);
  // Fetch tags on component mount
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/tags", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTags(data);
        } else {
          const errorResponse = await response.json();
          setErrorMessage(errorResponse.message || "Error in fetching tags.");
        }
      } catch (error) {
        setErrorMessage("Something went wrong. Please try again.", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTags();
  }, []);

  // Handlers for edit and delete actions (to be implemented)
  const handleEditTag = (tag) => {
    // Logic for opening modal and editing tag
    console.log("Edit button clicked for:", tag);
    setSelectedTag(tag);
    setShowUpdateModal(true);
  };

  const handleUpdateTag = async (updatedTag) => {
    try {
      console.log("Updating tag ID:", updatedTag._id); // Debugging

      const response = await fetch(
        `http://localhost:5000/api/tags/${updatedTag._id}`,
        {
          method: "PATCH", // Ensure it's PATCH
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updatedTag),
        }
      );

      if (response.ok) {
        // Show a success message with Swal
        Swal.fire({
          title: "Success!",
          text: "Category updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });

        setShowUpdateModal(false); // Close modal

        // Force fetch all tags again to update the UI
        const fetchTagsResponse = await fetch(
          "http://localhost:5000/api/tags",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (fetchTagsResponse.ok) {
          const updatedTags = await fetchTagsResponse.json();
          setTags(updatedTags);
        }
      } else {
        const errorResponse = await response.json();
        Swal.fire({
          title: "Error!",
          text: `Error: ${errorResponse.message}`,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error updating category:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while updating the category.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleDeleteTag = async (tagId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (confirmed) {
      try {
        await fetch(`http://localhost:5000/api/tags/${tagId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTags((prevTags) => prevTags.filter((tag) => tag._id !== tagId));
        alert("Tag deleted successfully!");
      } catch (error) {
        console.error("Encountered an error!", error);
      }
    }
  };

  if (loading) return <div>Loading categories...</div>;
  if (errorMessage) return <div>{errorMessage}</div>;

  return (
    <div>
      <SuperAdminPageTitle
        title="Manage"
        decoratedText="Tags"
        subtitle="Super admin only!"
      />
      <div className="flex lg:justify-start justify-between items-center lg:mb-4 bg-base-200 p-2 shadow-sm">
        <NavLink to="/super-admin/add-tag" className="m-0 lg:mr-6">
          <button className="btn btn-xs btn-primary">
            <FaPlusCircle />
            Add Tag
          </button>
        </NavLink>

        <h2 className="text-xl font-bold text-center lg:ml-80">
          Tag List: {tags.length > 0 ? tags.length : "No tag uploaded yet"}
        </h2>
      </div>

      <div className="p-2 shadow-sm">
        {/* Pass tags to TagTable */}
        <TagTable
          tags={tags}
          onEdit={handleEditTag}
          onDelete={handleDeleteTag}
        />

        {showUpdateModal && selectedTag && (
          <UpdateTagModal
            tag={selectedTag}
            onClose={() => setShowUpdateModal(false)}
            onUpdate={handleUpdateTag}
          />
        )}
      </div>
    </div>
  );
};

export default ManageTags;
