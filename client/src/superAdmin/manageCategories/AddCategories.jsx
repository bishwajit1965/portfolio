import { FaArrowAltCircleRight, FaPlusCircle } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SuperAdminPageSubHeader from "../superAdminPageSubHeader/SuperAdminPageSubHeader";

const AddCategories = ({ onCategoryCreated }) => {
  const apiURL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleRedirectCategoryFormToggle = () => {
    navigate("/super-admin/manage-categories");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const response = await fetch(`${apiURL}/categories`, {
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
      <SuperAdminPageSubHeader
        title="Add New"
        decoratedText="Category"
        variant="success"
        buttonLabel="Manage Categories"
        icon={<FaArrowAltCircleRight />}
        onButtonClick={handleRedirectCategoryFormToggle}
      />

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
            className="input input-bordered input-sm form-control max- w-full mb-2 admin-dark:bg-slate-700 admin-dark:text-slate-300"
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
