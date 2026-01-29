import api from "../../../services/api";
import { useState } from "react";
import Button from "../../buttons/Button";
import { FaEnvelopesBulk } from "react-icons/fa6";
import Swal from "sweetalert2";
import SocialMediaLinks from "../../shared/socialMedia/SocialMediaLinks";

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
          Swal.fire(
            "Success!",
            "Your message has been sent successfully!",
            "success",
          );
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
    <div className="lg:max-w-7xl mx-auto bg-base-200 lg:py- rounded-md shadow-sm dark:bg-slate-800">
      <div className="lg:max-w-5xl mx-auto p-4 rounded-lg shadow-md">
        <div className="lg:p-8 p-2">
          {error && (
            <p className="text-red-500 p-1 border border-red-800 rounded-md text-sm">
              {error}
            </p>
          )}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          <h2 className="lg:text-3xl text-lg font-bold flex items-center gap-2 mb-4 text-slate-600 dark:text-slate-300">
            <FaEnvelopesBulk size={25} />
            Contact <span className="text-amber-600"> Me 24/7 </span>
          </h2>
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
                placeholder="Name..."
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
                placeholder="Email..."
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
                placeholder="Message..."
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md dark:bg-slate-800 dark:border-slate-700"
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message}</p>
              )}
            </div>
            <div className="lg:flex grid items-center justify-between lg:pt-4 pt-2">
              {/* <CTAButton
                type="submit" // Important for form submission
                label={loading ? "Uploading..." : "Send Message"}
                variant="primary" // Button variant for styling
                disabled={loading} // Disable the button when loading
                icon={<FaEnvelope />} // Add icon to the button
                className="btn lg:btn-md btn-sm lg:w-44 w-full lg:text-lg text-sm" // Additional Tailwind CSS classes
              /> */}

              <Button
                type="submit"
                icon={<FaEnvelopesBulk size={20} />}
                variant="outline"
                label={loading ? "Uploading..." : "Send Message"}
                disabled={loading}
                size="md"
                className=""
              >
                Send Mail
              </Button>

              {/* Social Media Links */}
              <div className="">
                <div className="grid grid-flow-col sm:w-full">
                  <SocialMediaLinks />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactMeForm;
