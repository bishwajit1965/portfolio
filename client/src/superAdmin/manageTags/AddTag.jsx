import {
  FaArrowAltCircleRight,
  FaCloudUploadAlt,
  FaTimes,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SuperAdminPageSubHeader from "../superAdminPageSubHeader/SuperAdminPageSubHeader";
import Button from "../../components/buttons/Button";

const AddTag = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_API_BASE_URL || "http:localhost:5000/api";

  const handleAddTagFormToggle = () => {
    navigate("/super-admin/manage-tags");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const response = await fetch(`${apiURL}/tags`, {
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
      <SuperAdminPageSubHeader
        title="Add New"
        decoratedText="Tags"
        buttonLabel="Manage Tags"
        variant="success"
        icon={<FaArrowAltCircleRight size={20} />}
        labelIcon={<FaCloudUploadAlt />}
        onButtonClick={handleAddTagFormToggle}
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
        <div className="lg:p-8 p-2 border border-slate-300 admin-dark:border-slate-600 rounded-xl lg:mt-10 mt-2 shadow-lg hover:shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-2">
            <input
              type="text"
              placeholder="Tag name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input input-bordered input-sm form-control w-full mb-2 admin-dark:bg-slate-700 admin-dark:border-slate-600 border-slate-300"
            />

            <div className="admin-dark:admin-dark dark:relative flex items-center gap-2 justify-end">
              <Button
                type="submit"
                variant="success"
                size="sm"
                label={loading ? " Uploading..." : " Add Tag"}
                disabled={loading}
                icon={
                  loading ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    <FaCloudUploadAlt />
                  )
                }
              />
              <Button
                type="button"
                variant="warning"
                size="sm"
                icon={<FaTimes />}
                label="Cancel"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTag;
