import { FaPlusCircle } from "react-icons/fa";
import SuperAdminPageTitle from "../superAdminPageTitle/SuperAdminPageTitle";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import apiRequest from "../utils/apiRequest";
import SkillsTable from "./SkillsTable";
import UpdateSkillsModal from "./UpdateSkillsModal";
import Swal from "sweetalert2";

const ManageSkills = () => {
  const baseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSkillsUpdateModal, setShowSkillsUpdateModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await apiRequest("/skills", "GET", null, token, {
          autoMessage: false,
        });
        if (response.success) {
          console.log("Skills fetched", response?.data);
        }
        setSkills(response?.data);
      } catch (error) {
        console.error("Something went wrong, Please try later", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const refetchSkills = async () => {
    const token = localStorage.getItem("token");
    const response = await apiRequest("/skills", "GET", null, token, {
      autoMessage: false,
    });
    if (response.success) {
      setSkills(response?.data);
    }
  };

  const handleEditSkills = (skill) => {
    setSelectedSkill(skill);
    setShowSkillsUpdateModal(true);
  };

  const handleUpdateSkills = async (formData) => {
    try {
      const response = await fetch(`${baseUrl}/skills/${selectedSkill._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Update failed");
      }
      await refetchSkills();
      Swal.fire("Success!", "Skill updated successfully.", "success");
      setShowSkillsUpdateModal(false);
    } catch (error) {
      Swal.fire("Error!", error.message, "error");
    }
  };

  const handleDeleteSkills = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone. Do you want to delete this blog post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // API call to delete blog post
          const response = await fetch(`${baseUrl}/skills/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          // Check if the response status is not successful
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              errorData.message || "Failed to delete the blog post.",
            );
          }

          // Update the UI by removing the deleted blog post
          setSkills((prevSkill) =>
            prevSkill.filter((skill) => skill._id !== id),
          );

          // Show success message
          Swal.fire({
            title: "Deleted!",
            text: "Skill has been deleted successfully.",
            icon: "success",
            confirmButtonText: "OK",
          });
        } catch (error) {
          console.error("Error during deletion:", error);
          // Show error message
          Swal.fire({
            title: "Error!",
            text:
              error.message || "An error occurred while deleting the skill.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };

  return (
    <div>
      <SuperAdminPageTitle
        title="Manage"
        decoratedText="Skills"
        subtitle="Super admin only!"
      />

      <div className="flex lg:justify-start items-center justify-between lg:mb-2 bg-base-200 p-2 shadow-sm">
        <NavLink to="/super-admin/add-skills" className="m-0">
          <button className="btn btn-xs btn-primary">
            <FaPlusCircle />
            Add New Skill
          </button>
        </NavLink>
      </div>
      <div className="lg:col-span-4 col-span-12 flex lg:justify-center items-center">
        <h2 className="text-xl font-bold">
          Skills List: {skills?.length > 0 ? skills?.length : 0}
        </h2>
      </div>

      {/* Pass skills to skills notice table */}
      {loading ? (
        <div className="text-center">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      ) : (
        <SkillsTable
          skills={skills}
          onEdit={handleEditSkills}
          onUpdate={handleUpdateSkills}
          onDelete={handleDeleteSkills}
        />
      )}

      {showSkillsUpdateModal && selectedSkill && (
        <UpdateSkillsModal
          skill={selectedSkill}
          onClose={() => setShowSkillsUpdateModal(false)}
          onUpdate={handleUpdateSkills}
        />
      )}
    </div>
  );
};

export default ManageSkills;
