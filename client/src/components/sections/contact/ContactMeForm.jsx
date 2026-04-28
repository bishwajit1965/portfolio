import api from "../../../services/api";
import { useState } from "react";
import Button from "../../buttons/Button";
import { FaEnvelopesBulk } from "react-icons/fa6";
import Swal from "sweetalert2";
import SocialMediaLinks from "../../shared/socialMedia/SocialMediaLinks";
import { motion } from "framer-motion";

import "react-quill/dist/quill.snow.css";
import TextEditor from "../../../superAdmin/textEditor/TextEditor";
import { FaCheckCircle } from "react-icons/fa";
const ContactMeForm = () => {
  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i = 1) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.3, type: "spring", stiffness: 50 },
    }),
  };
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
    <div className="lg:max-w-7xl mx-auto bg-base-200 rounded-md shadow-sm dark:bg-slate-800">
      <div className="lg:max-w-5xl mx-auto rounded-lg shadow-md">
        <div className="lg:p-6 p-2">
          {error && (
            <p className="text-red-500 p-1 border border-red-800 rounded-md text-sm">
              {error}
            </p>
          )}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          <div className="space-y-2">
            <motion.h1
              className="lg:text-3xl text-lg font-bold flex items-center gap-2 text-slate-600 dark:text-slate-300"
              custom={0}
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
              <FaEnvelopesBulk size={25} />
              Contact <span className="text-amber-600"> Me 24/7 </span>
            </motion.h1>
            <motion.h2
              className="lg:text-xl text-lg font-bold"
              custom={1}
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
              Let’s Work Together
            </motion.h2>

            <motion.p
              className="text-slate-500 flex items-center gap-2"
              custom={2}
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
              <FaCheckCircle className="text-sm text-emerald-500" /> I build
              scalable web applications for businesses and startups.
            </motion.p>

            <motion.p
              className="text-sm text-emerald-500 font-medium flex items-center gap-2"
              custom={3}
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
              <FaCheckCircle className="text-emerald-500" /> Available for
              freelance projects
            </motion.p>

            <motion.p
              className="text-sm text-slate-500 flex items-center gap-2"
              custom={4}
              initial="hidden"
              animate="visible"
              variants={textVariants}
            >
              <FaCheckCircle className="text-emerald-500" /> Response time:
              within 24 hours - open to opportunities.
            </motion.p>
          </div>
          <div className="h-[1px] bg-slate-300 dark:bg-slate-600 my-3"></div>
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-400">
                Name:
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                id=""
                placeholder="Name..."
                className="p-2 block w-full border border-slate-300 rounded-md dark:bg-slate-800 text-slate-700 dark:text-slate-400 dark:border-slate-700"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
            <div className="">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-400">
                Email:
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                id=""
                placeholder="Email..."
                className="p-2 block w-full border border-gray-300 rounded-md dark:bg-slate-800 dark:border-slate-700"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-400">
                Message:
              </label>
              <TextEditor
                name="message"
                value={formData.message}
                onChange={(value) =>
                  setFormData({ ...formData, message: value })
                }
              />
              {/* <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Message..."
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md dark:bg-slate-800 dark:border-slate-700"
              ></textarea> */}
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message}</p>
              )}
            </div>
            <div className="lg:flex grids items-center justify-between">
              <Button
                type="submit"
                icon={<FaEnvelopesBulk />}
                variant="outline"
                label={loading ? "Uploading..." : "Send Message"}
                disabled={loading}
                size="md"
              />

              {/* Social Media Links */}
              <div className="">
                <SocialMediaLinks />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactMeForm;
