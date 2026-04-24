import { FaCloudUploadAlt, FaDatabase } from "react-icons/fa";
import { useEffect, useState } from "react";
import apiRequest from "../utils/apiRequest";
import SkillsTable from "./SkillsTable";
import UpdateSkillsModal from "./UpdateSkillsModal";
import Swal from "sweetalert2";
import SuperAdminPageSubHeader from "../superAdminPageSubHeader/SuperAdminPageSubHeader";
import AddSkills from "./AddSkills";

/**=============================================
 * For the toggling of React Multi Select fields
 * @param {*} isDark
 * @returns
 *=============================================*/
const customStyles = (isDark) => ({
  control: (provided) => ({
    ...provided,
    backgroundColor: isDark ? "#1e293b" : "#ffffff",
    borderColor: isDark ? "#334155" : "#d1d5db",
    color: isDark ? "#e5e7eb" : "#111827",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: isDark ? "#1e293b" : "#ffffff",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused
      ? isDark
        ? "#334155"
        : "#e5e7eb"
      : isDark
        ? "#1e293b"
        : "#ffffff",
    color: isDark ? "#e5e7eb" : "#111827",
    cursor: "pointer",
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: isDark ? "#334155" : "#e5e7eb",
  }),

  multiValueLabel: (provided) => ({
    ...provided,
    color: isDark ? "#e5e7eb" : "#111827",
  }),

  multiValueRemove: (provided) => ({
    ...provided,
    color: isDark ? "#e5e7eb" : "#111827",
    ":hover": {
      backgroundColor: "#ef4444",
      color: "white",
    },
  }),
  input: (provided) => ({
    ...provided,
    color: isDark ? "#e5e7eb" : "#111827",
  }),

  placeholder: (provided) => ({
    ...provided,
    color: isDark ? "#94a3b8" : "#6b7280",
  }),

  singleValue: (provided) => ({
    ...provided,
    color: isDark ? "#e5e7eb" : "#111827",
  }),
});

const ManageSkills = () => {
  const baseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSkillsUpdateModal, setShowSkillsUpdateModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false);
  const [isDark, setIsDark] = useState(
    document.body.classList.contains("admin-dark"),
  );

  const handleClearSearchText = () => {
    setFilterText("");
  };

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.body.classList.contains("admin-dark"));
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

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

  const handleAddSkill = () => {
    setIsAddSkillOpen((prev) => !prev);
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
      <SuperAdminPageSubHeader
        title="Skills"
        decoratedText="Management Table"
        dataLength={skills?.length}
        variant="success"
        buttonLabel="Add Skill"
        icon={<FaCloudUploadAlt size={20} />}
        labelIcon={<FaDatabase />}
        searchBox={true}
        setFilterText={setFilterText}
        onButtonClick={handleAddSkill}
        // For refreshing search input field
        filterText={filterText} //important for clearing field
        refreshButton={true}
        onRefreshBtnClick={handleClearSearchText}
      />

      {/* Pass skills to skills notice table */}
      {loading ? (
        <div className="text-center">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      ) : (
        <div className="px-4">
          <SkillsTable
            skills={skills}
            onEdit={handleEditSkills}
            onUpdate={handleUpdateSkills}
            onDelete={handleDeleteSkills}
            filterText={filterText}
            isDark={isDark}
            customStyles={customStyles}
          />
        </div>
      )}

      {isAddSkillOpen && (
        <AddSkills
          isDark={isDark}
          customStyles={customStyles}
          onClose={handleAddSkill}
        />
      )}

      {showSkillsUpdateModal && selectedSkill && (
        <UpdateSkillsModal
          skill={selectedSkill}
          onClose={() => setShowSkillsUpdateModal(false)}
          onUpdate={handleUpdateSkills}
          isDark={isDark}
          customStyles={customStyles}
        />
      )}
    </div>
  );
};

export default ManageSkills;
