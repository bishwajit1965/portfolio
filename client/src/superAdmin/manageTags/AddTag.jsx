import { FaHome, FaPlusCircle } from "react-icons/fa";

import { NavLink } from "react-router-dom";
import SuperAdminPageTitle from "../superAdminPageTitle/SuperAdminPageTitle";
import { useState } from "react";

const AddTag = () => {
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
      const response = await fetch("http://localhost:5000/api/tags", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name }),
      });
      console.log("Response:", response);
      if (response.ok) {
        const newTag = await response.json();
        console.log("New Tag:", newTag);

        setName("");
        setSuccessMessage("Tag created successfully.");
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
      console.error("Error in creating tag.", error.message);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <SuperAdminPageTitle
        title="Add"
        decoratedText="Tags"
        subtitle="Super admin only!"
      />

      <div className="flex lg:justify-start items-center justify-between lg:mb-4 bg-base-200 p-2 shadow-sm">
        <NavLink to="/super-admin/manage-tags" className="m-0">
          <button className="btn btn-xs rounded-full text-white btn-success">
            <FaHome />
            Manage Tags
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
            <span className="label-text font-bold">Tag name:</span>
          </div>
          <input
            type="text"
            placeholder="Tag name..."
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
            {loading ? " Uploading..." : " Add Tag"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTag;
