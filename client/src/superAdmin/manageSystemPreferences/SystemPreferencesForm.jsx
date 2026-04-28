import { Helmet } from "react-helmet-async";
import SuperAdminPageSubHeader from "../superAdminPageSubHeader/SuperAdminPageSubHeader";
import {
  FaCloudUploadAlt,
  FaDatabase,
  FaEdit,
  FaRegTimesCircle,
  FaSpinner,
  FaTimesCircle,
} from "react-icons/fa";

import Button from "../../components/buttons/Button";
import apiRequest from "../utils/apiRequest";
import Swal from "sweetalert2";
import { useEffect, useState, useRef } from "react";

const SystemPreferencesForm = ({
  onCancel,
  selectedSystemPreference,
  mode,
  refetch,
}) => {
  const [appName, setAppName] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [errorMessages, setErrorMessages] = useState([]);
  const fileInputRef = useRef(null);
  const token = localStorage.getItem("token");

  const handleCancelUploadSystemPreferences = () => {
    onCancel();
  };

  // Resets form after submit
  const resetForm = () => {
    setAppName("");
    setImage(null);
    fileInputRef.current.value = null;
  };

  const isEdit = mode === "edit";
  useEffect(() => {
    if (isEdit && selectedSystemPreference) {
      setAppName(selectedSystemPreference.appName || "");
      setImage(null); // optional reset
    } else {
      setAppName("");
      setImage(null);
    }
  }, [mode, isEdit, selectedSystemPreference]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    } else {
      setErrorMessages(["Please upload a valid image file."]);
    }
  };

  // For clearing error messages
  useEffect(() => {
    if (errorMessages.length > 0) {
      const timer = setTimeout(() => {
        setErrorMessages([]);
      }, 3000);
      // Clear the times if the component unmounts or the errors change
      return () => clearTimeout(timer);
    }
  }, [errorMessages]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    /**==========================
     *  Form Validation
     *==========================*/
    // Clear previous error messages
    setErrorMessages([]);

    // Client-side validation
    const newErrors = [];

    // App Name validation
    if (!appName.trim()) {
      newErrors.push("App name is required.");
    } else if (appName.length < 5 || appName.length > 150) {
      newErrors.push("App name must be between 2 to 150 characters.");
    }

    // Image validation
    // if (!image) {
    //   newErrors.push("Image is required.");
    // }

    // If there are validation errors, set them and stop form submission
    if (newErrors.length > 0) {
      setErrorMessages(newErrors);
      return; // Stop form submission
    }

    setLoading(true);

    // Create FormData object for multipart/form-data
    const formData = new FormData();
    formData.append("appName", appName);
    if (image) formData.append("imageUrl", image); // Append image file

    // Dynamic API Setting
    const endpoint =
      mode === "edit"
        ? `/system-settings/${selectedSystemPreference._id}`
        : "/system-settings";

    const method = mode === "edit" ? "PATCH" : "POST";

    try {
      // Upload System preferences
      const response = await apiRequest(endpoint, method, formData, token, {
        autoMessage: true,
      });

      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      // Assuming the response will always be JSON in a successful case
      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Great!",
          text:
            mode === "edit"
              ? "System preferences updated!"
              : "System preferences added!",
        });
        resetForm();
        setAppName("");
        setImage(null);
        fileInputRef.current.value = null; // Clear file input
        await refetch();
        handleCancelUploadSystemPreferences();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: response.error,
        });
      }
    } catch (error) {
      setErrorMessages([
        error?.response?.data?.message || "Something went wrong.",
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.modalOverlay} className="admin-dark:bg-slate-800">
      <Helmet>
        <title>Web-tech-services || Add System Preferences</title>
      </Helmet>
      <div
        style={styles.modalContent}
        className="bg-base-100 text-slate-700 admin-dark:bg-slate-800 admin-dark:text-slate-400 text-sm mb-1 max-h-[80vh] overflow-y-auto"
      >
        <SuperAdminPageSubHeader
          title={mode === "edit" ? "Update" : "Add"}
          decoratedText="System Preferences"
          buttonLabel={mode === "edit" ? "Cancel Edit" : "Cancel Upload"}
          variant="warning"
          icon={<FaRegTimesCircle />}
          labelIcon={<FaDatabase />}
          onButtonClick={handleCancelUploadSystemPreferences}
        />

        <form
          action=""
          onSubmit={handleSubmit}
          className="w-full space-y-4"
          encType="multipart/form-data"
        >
          <div className="form-control">
            <label
              htmlFor="appName"
              className="admin-dark:text-slate-400 text-sm mb-1"
            >
              App Name:
            </label>
            <input
              type="text"
              name="appName"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              id="appName"
              placeholder="App name..."
              className="input input-sm input-bordered w-full admin-dark:text-slate-300 admin-dark:bg-slate-800/90 admin-dark:border-slate-700"
            />
          </div>
          <div className="lg:col-span-6 col-span-12">
            <div className="form-control">
              <label
                htmlFor="imageUrl"
                className="admin-dark:text-slate-400 text-sm mb-1"
              >
                Upload File:
              </label>
              <input
                type="file"
                name="imageUrl"
                accept="image/*"
                onChange={handleImageChange} // Use the new handler
                ref={fileInputRef}
                className="file-input file-input-sm file-input-bordered w-full admin-dark:text-slate-300 admin-dark:bg-slate-800/90 admin-dark:border-slate-700"
              />
            </div>
          </div>

          <div className="lg:max-w- mx-auto shadow-md">
            {errorMessages.length > 0 && (
              <div className="alert alert-error text-white text-sm">
                <div className="">
                  <div className="mb-2 border-b w-full">
                    <h2 className="text-md font-bold text-base-100 animate-bounce">
                      Error(s) Encountered : Please follow the instructions.
                    </h2>
                  </div>
                  <ul>
                    {errorMessages.map((error, index) => (
                      <li key={index}>
                        {index + 1}
                        {")"} {typeof error === "string" ? error : error.msg}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="submit"
              size="sm"
              variant="primary"
              disabled={loading}
              icon={
                loading ? (
                  <FaSpinner className="animate-spin" />
                ) : mode === "edit" ? (
                  <FaEdit />
                ) : (
                  <FaCloudUploadAlt />
                )
              }
              label={
                loading
                  ? "Uploading..."
                  : mode === "edit"
                    ? "Edit System Preferences"
                    : "Upload System Preferences"
              }
            />

            <Button
              onClick={handleCancelUploadSystemPreferences}
              type="button"
              variant="warning"
              size="sm"
              label={mode === "edit" ? "Cancel Edit" : "Cancel Upload"}
              icon={<FaTimesCircle />}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SystemPreferencesForm;

// Simple inline styles for demonstration; consider using CSS or styled-components
const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    padding: "24px",
    borderRadius: "8px",
    width: "700px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.26)",
  },
};
