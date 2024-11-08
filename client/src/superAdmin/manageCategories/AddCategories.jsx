import { FaHome, FaPlusCircle } from "react-icons/fa";

import { NavLink } from "react-router-dom";
import SuperAdminPageTitle from "../superAdminPageTitle/SuperAdminPageTitle";
import { useState } from "react";

const AddCategories = ({ onCategoryCreated }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const response = await fetch("http://localhost:5000/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name }),
      });
      console.log("Response:", response);
      if (response.ok) {
        const newCategory = await response.json();
        console.log("New category:", newCategory);

        // Call the parent function to update the UI
        if (onCategoryCreated) {
          onCategoryCreated(newCategory); // Ensure this function is called
        }
        setName("");
        setSuccessMessage("Category created successfully.");
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);
      } else {
        const errorResponse = await response.json();
        setErrorMessage(errorResponse.message);
        setTimeout(() => {
          setErrorMessage("");
        }, 2000);
      }
    } catch (error) {
      console.error("Error in creating category.", error.message);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SuperAdminPageTitle
        title="Add"
        decoratedText="Categories"
        subtitle="Super admin only!"
      />

      <div className="flex lg:justify-start items-center justify-between lg:mb-4 bg-base-200 p-2 shadow-sm">
        <NavLink to="/super-admin/manage-categories" className="m-0">
          <button className="btn btn-xs rounded-full text-white btn-success">
            <FaHome />
            Manage Categories
          </button>
        </NavLink>
      </div>
      <div className="my-2 max-w-md mx-auto">
        <div className="">
          {/* Display error messages */}
          {errorMessage && (
            <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
          )}

          {/* Display success message */}
          {successMessage && (
            <p className="text-sm text-green-500">{successMessage}</p>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="label">
            <span className="label-text font-bold">Category name:</span>
          </div>
          <input
            type="text"
            placeholder="Category name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input input-bordered input-sm form-control max- w-full mb-2"
          />

          <button className="btn btn-sm btn-primary rounded-full shadow-md">
            {loading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <FaPlusCircle />
            )}
            {loading ? " Uploading..." : " Add category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategories;
