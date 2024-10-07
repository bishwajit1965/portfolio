import CTAButton from "../../ctaButton/CTAButton";
import { FaEnvelope } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import api from "../../../services/api";
import { useState } from "react";

const ContactMeForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = "Name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!formData.message) {
      newErrors.message = "Message is required";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const response = await api.post("/contacts", formData);
        if (response.status === 201) {
          setSuccessMessage("Message has been sent successfully!");
          setFormData({ name: "", email: "", message: "" });
          setErrors({});
          setTimeout(() => {
            setSuccessMessage("");
          }, 2000);
        }
      } catch (error) {
        console.error("Failed to send message!", error);
        if (error.response && error.response.status === 400) {
          // Display specific backend validation error
          const backendErrors = error.response.data;
          setError(backendErrors);
          if (backendErrors.errors) {
            setErrors(backendErrors.errors);
          } else if (backendErrors.message) {
            setError(backendErrors.message);
          } else {
            setError("An unexpected error occurred. Please try again.");
          }
          setTimeout(() => {
            setError(""); // Clear backend error after timeout
          }, 2000);
        }
        setSuccessMessage("");
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(validationErrors);
      setSuccessMessage("");
      setTimeout(() => {
        setErrors({});
      }, 2000);
    }
  };

  return (
    <>
      <Helmet>
        <title>Web-tech-services || Contact Me</title>
      </Helmet>

      <div className="lg:max-w-5xl mx-auto p-4 bg- rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 border-b border-slate-300 dark:border-b-slate-700 flex items-center animate-pulse pb-2 dark:text-slate-600">
          <FaEnvelope className="mr-2" /> Contact Me
        </h2>
        {/* Display backend error */}
        {error && (
          <p className="text-red-500 p-1 border border-red-800 rounded-md text-sm">
            {error}
          </p>
        )}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              id=""
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md dark:bg-slate-800 dark:border-slate-700"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              id=""
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md dark:bg-slate-800 dark:border-slate-700"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Message:
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md dark:bg-slate-800 dark:border-slate-700"
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message}</p>
            )}
          </div>
          <div className="flex">
            <CTAButton
              type="submit" // Important for form submission
              label={loading ? "Uploading..." : "Send Message"}
              variant="primary" // Button variant for styling
              disabled={loading} // Disable the button when loading
              icon={<FaEnvelope />} // Add icon to the button
              className="" // Additional Tailwind CSS classes
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactMeForm;
