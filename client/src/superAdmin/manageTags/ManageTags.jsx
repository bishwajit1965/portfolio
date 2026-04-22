import { useEffect, useState } from "react";
import { FaCloudUploadAlt, FaDatabase } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import TagTable from "./TagTable";
import UpdateTagModal from "./UpdateTagModal";
import SuperAdminPageSubHeader from "../superAdminPageSubHeader/SuperAdminPageSubHeader";

const ManageTags = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [filterText, setFilterText] = useState("");
  const apiURL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
  const navigate = useNavigate();

  const handleAddCategoryFormToggle = () => {
    navigate("/super-admin/add-tag");
  };

  const handleClearSearchText = () => {
    setFilterText("");
  };

  // Fetch tags on component mount
  useEffect(() => {
    const fetchTags = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiURL}/tags`, {
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
  }, [apiURL]);

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

      const response = await fetch(`${apiURL}/tags/${updatedTag._id}`, {
        method: "PATCH", // Ensure it's PATCH
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedTag),
      });

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
        const fetchTagsResponse = await fetch(`${apiURL}/tags`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

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
      "Are you sure you want to delete this project?",
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

  if (errorMessage)
    return <div className="text-center text-red-500">{errorMessage}</div>;

  return (
    <div>
      <SuperAdminPageSubHeader
        title="Tags"
        decoratedText="Management Table"
        dataLength={tags?.length}
        variant="success"
        buttonLabel="Add Tag"
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

      <div className="p-2 shadow-sm">
        {/* Pass tags to TagTable */}
        {loading ? (
          <div className="text-center">
            <span className="loading loading-ring loading-lg"></span>
          </div>
        ) : (
          <TagTable
            tags={tags}
            onEdit={handleEditTag}
            onDelete={handleDeleteTag}
            filterText={filterText}
          />
        )}

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
