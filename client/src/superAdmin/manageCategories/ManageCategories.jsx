import { useEffect, useState } from "react";

import CategoryTable from "./CategoryTable";
import { FaPlusCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import SuperAdminPageTitle from "../superAdminPageTitle/SuperAdminPageTitle";
import Swal from "sweetalert2";
import UpdateCategoryModal from "./UpdateCategoryModal";

const ManageCategories = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const baseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${baseUrl}/categories`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCategories(data); // Save the fetched categories
        } else {
          const errorResponse = await response.json();
          setErrorMessage(
            errorResponse.message || "Failed to fetch categories"
          );
        }
      } catch (error) {
        setErrorMessage("Something went wrong. Please try again.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [baseUrl]);

  // Handlers for edit and delete actions (to be implemented)
  const handleEditCategory = (category) => {
    // Logic for opening modal and editing category
    console.log("Edit button clicked for:", category);
    setSelectedCategory(category);
    setShowUpdateModal(true);
  };

  const handleUpdateCategory = async (updatedCategory) => {
    try {
      console.log("Updating category ID:", updatedCategory._id); // Debugging

      const response = await fetch(
        `${baseUrl}/categories/${updatedCategory._id}`,
        {
          method: "PATCH", // Ensure it's PATCH
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updatedCategory),
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

        // Force fetch all categories again to update the UI
        const fetchCategoriesResponse = await fetch(`${baseUrl}/categories`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (fetchCategoriesResponse.ok) {
          const updatedCategories = await fetchCategoriesResponse.json();
          setCategories(updatedCategories);
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

  const handleDeleteCategory = async (categoryId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (confirmed) {
      try {
        await fetch(`${baseUrl}/categories/${categoryId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category._id !== categoryId)
        );
        alert("Category deleted successfully!");
      } catch (error) {
        console.error("Encountered an error!", error);
      }
    }
  };

  if (errorMessage)
    return <div className="text-center text-red-500">{errorMessage}</div>;
  return (
    <div>
      <SuperAdminPageTitle
        title="Manage"
        decoratedText="Categories"
        subtitle="Super admin only!"
      />
      <div className="flex lg:justify-start items-center justify-between lg:mb-4 bg-base-200 p-2 shadow-sm">
        <NavLink to="/super-admin/add-categories" className="m-0">
          <button className="btn btn-xs btn-primary">
            <FaPlusCircle />
            Add Category
          </button>
        </NavLink>
        <h2 className="text-xl font-bold text-center lg:ml-72">
          Category List:{" "}
          {categories.length > 0
            ? categories.length
            : "No category uploaded yet"}
        </h2>
      </div>

      <div className="p-2">
        {/* Pass categories to CategoryTable */}
        {loading ? (
          <div className="text-center">
            <span className="loading loading-ring loading-lg"></span>
          </div>
        ) : (
          <CategoryTable
            categories={categories}
            onEdit={handleEditCategory}
            onDelete={handleDeleteCategory}
          />
        )}

        {showUpdateModal && selectedCategory && (
          <UpdateCategoryModal
            category={selectedCategory}
            onClose={() => setShowUpdateModal(false)}
            onUpdate={handleUpdateCategory}
          />
        )}
      </div>
    </div>
  );
};

export default ManageCategories;
