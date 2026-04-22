import Select from "react-select";
import { FaCloudUploadAlt, FaPlusCircle, FaTimesCircle } from "react-icons/fa";
import { useState } from "react";
import apiRequest from "../utils/apiRequest";
import Swal from "sweetalert2";
import { useEffect } from "react";
import SuperAdminPageSubHeader from "../superAdminPageSubHeader/SuperAdminPageSubHeader";
import Button from "../../components/buttons/Button";

const AddSkills = ({ isDark, customStyles, onClose }) => {
  const [skillName, setSkillName] = useState("");
  const [level, setLevel] = useState("");
  const [experience, setExperience] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedTools, setSelectedTools] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  const token = localStorage.getItem("token");

  // For clearing error messages
  useEffect(() => {
    if (errorMessages.length > 0) {
      const timer = setTimeout(() => {
        setErrorMessages([]);
      }, 5000);
      // Clear the times if the component unmounts or the errors change
      return () => clearTimeout(timer);
    }
  }, [errorMessages]);

  useEffect(() => {
    if (message.length > 0) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 5000);
      // Clear timer if component unmounts or the error changes
      return () => clearTimeout(timer);
    }
  }, [message]);

  const options = [
    { value: "Git", label: "Git" },
    { value: "GitHub", label: "GitHub" },
    { value: "Git Tool", label: "Git Tool" },
    { value: "Git Actions", label: "Git Actions" },
    { value: "Web Pack", label: "Web Pack" },
    { value: "Babel", label: "Babel" },
    { value: "Npm", label: "Npm" },
    { value: "ES6+", label: "ES6+" },
    { value: "React", label: "React" },
    { value: "React Router", label: "React Router" },
    { value: "React Query", label: "React Query" },
    { value: "Node.js", label: "Node.js" },
    { value: "Express", label: "Express" },
    { value: "JWT", label: "JWT" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "Mongoose", label: "Mongoose" },
    { value: "Compass", label: "Compass" },
    { value: "Postman", label: "Postman" },
    { value: "Swagger", label: "Swagger" },
    { value: "OAuth", label: "OAuth" },
    { value: "bcrypt", label: "bcrypt" },
    { value: "Tailwind CSS", label: "Tailwind CSS" },
    { value: "Post CSS", label: "Post CSS" },
    { value: "CSS3", label: "CSS3" },
    { value: "Context API", label: "Context API" },
    { value: "Redux Toolkit", label: "Redux Toolkit" },
    { value: "Zustand", label: "Zustand" },
    { value: "Vercel", label: "Vercel" },
    { value: "Render", label: "Render" },
    { value: "Nginx", label: "Nginx" },
  ];

  const categoryOptions = [
    { value: "Web Development", label: "Web Development" },
    { value: "Full Stack", label: "Full Stack" },
    { value: "Others", label: "Others" },
    { value: "DevOps", label: "DevOps" },
    { value: "Deployment", label: "Deployment" },
    { value: "Tools", label: "Tools" },
    { value: "Frontend", label: "Frontend" },
    { value: "Architecture", label: "Architecture" },
    { value: "Architecture", label: "Architecture" },
    { value: "UI/UX", label: "UI/UX" },
    { value: "Security", label: "Security" },
    { value: "Backend", label: "Backend" },
    { value: "Database", label: "Database" },
  ];

  const handleToolChange = (selectedOptions) => {
    setSelectedTools(selectedOptions);
  };

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error messages
    setErrorMessages([]);

    // Client-side validation
    const newErrors = [];

    // Skill validation
    if (!skillName.trim()) {
      newErrors.push("Skill name is required.");
    } else if (skillName.length < 5 || skillName.length > 150) {
      newErrors.push("Skill name must be between 5 to 150 characters.");
    }

    // Level validation
    if (!level.trim()) {
      newErrors.push("Level is required.");
    } else if (level.length < 5 || level.length > 150) {
      newErrors.push("Level name must be between 5 to 150 characters.");
    }
    // Level validation
    if (!experience.trim()) {
      newErrors.push("Experience is required.");
    } else if (experience.length < 5 || experience.length > 150) {
      newErrors.push("Experience name must be between 5 to 150 characters.");
    }

    // Categories validation
    if (selectedTools.length === 0) {
      newErrors.push("At least one tool must be selected.");
    }

    // Categories validation
    if (selectedCategories.length === 0) {
      newErrors.push("At least one category must be selected.");
    }

    if (newErrors.length > 0) {
      setErrorMessages(newErrors);
      return; // ⛔ stop submission
    }
    // Proceed with form submission
    setLoading(true);

    const formData = new FormData();
    formData.append("skillName", skillName);
    formData.append("level", level);
    formData.append("experience", experience);
    formData.append(
      "tools",
      JSON.stringify(selectedTools.map((tool) => tool.value)),
    );
    formData.append(
      "category",
      JSON.stringify(selectedCategories.map((cat) => cat.value)),
    );
    formData.append("createdAt", new Date().toISOString());

    try {
      setLoading(true);
      for (let pair of formData.entries()) {
        console.log("Key:", pair[0], "Value:", pair[1]);
      }
      const data = {
        skillName,
        level,
        experience,
        tools: selectedTools.map((t) => t.value),
        category: selectedCategories.map((c) => c.value),
      };

      const response = await apiRequest("/skills", "POST", data, token, {
        autoMessage: true,
      });

      if (response.success) {
        setMessage("Skills added successfully!");
        Swal.fire({
          icon: "success",
          title: "Great!",
          text: "Skills data added successfully!",
        });

        setSkillName("");
        setLevel("");
        setExperience("");
        setSelectedTools([]);
        setSelectedCategories([]);
      } else {
        setMessage("Failed to add skills!");
      }
    } catch (error) {
      console.error("Error adding skills:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={styles.modalOverlay} className="admin-dark:bg-slate-800">
      <div className="bg-base-100 border rounded-xl border-slate-600 admin-dark:border-slate-600 admin-dark:bg-slate-800 admin-dark:text-slate-300">
        <div className="admin-dark:bg-slate-800 admin-dark:text-slate-300 rounded-xl rounded-t-xl">
          <div className="rounded-t-xl pt-2 z-10 bg-base-200 admin-dark:bg-slate-800">
            <SuperAdminPageSubHeader
              title="Add New"
              decoratedText="Skills Form"
              labelIcon={<FaCloudUploadAlt />}
            />
          </div>

          {/* Validation errors */}
          <div className="lg:max-w-xl mx-auto mt-4 rounded-xl lg:px-6 px-2">
            {errorMessages?.length > 0 && (
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
                        {")"} {typeof error === "string" ? error : error?.msg}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="lg:max-w-xl flex mx-auto shadow-md rounded-xl hover:shadow-lg lg:p-6 p-4 bg-base-100 admin-dark:bg-slate-800 admin-dark:text-slate-300 admin-dark:border-slate-600 text-slate-600 admin-dark:shadow-lg transition-shadow duration-300">
            <form
              onSubmit={handleSubmit}
              className="w-full border lg:p-6 p-2 rounded-xl border-slate-300 admin-dark:border-slate-600"
            >
              <div className="w-full">
                {message && (
                  <p className="text-blue-800 font-bold">{message}</p>
                )}
              </div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text admin-dark:text-slate-300">
                    Skill name:
                  </span>
                </div>
                <input
                  type="text"
                  name="skillName"
                  placeholder="Skill name..."
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                  className="input input-bordered input-sm form-control max- w-full mb-2 admin-dark:bg-slate-700 admin-dark:text-slate-300"
                />
              </label>

              <label className="form-control">
                <div className="label">
                  <span className="label-text admin-dark:text-slate-300">
                    Skills level:
                  </span>
                </div>
                <input
                  type="text"
                  name="level"
                  placeholder="Level..."
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="input input-bordered input-sm form-control max- w-full mb-2 admin-dark:bg-slate-700 admin-dark:text-slate-300"
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text admin-dark:text-slate-300">
                    Experience:
                  </span>
                </div>
                <input
                  type="text"
                  name="experience"
                  placeholder="Experience..."
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="input input-bordered input-sm form-control max- w-full mb-2 admin-dark:bg-slate-700 admin-dark:text-slate-300"
                />
              </label>

              <label className="form-control">
                <div className="label">
                  <span className="label-text admin-dark:text-slate-300">
                    Skill Tools:
                  </span>
                </div>

                <Select
                  name="tools"
                  options={options}
                  isMulti
                  value={selectedTools}
                  onChange={handleToolChange}
                  styles={customStyles(isDark)}
                  className="form-control py-1 px-2 rounded-md"
                />
              </label>
              <label className="form-control">
                <div className="label">
                  <span className="label-text admin-dark:text-slate-300">
                    Categories:
                  </span>
                </div>

                <Select
                  name="category"
                  options={categoryOptions}
                  isMulti
                  value={selectedCategories}
                  onChange={handleCategoryChange}
                  styles={customStyles(isDark)}
                  className="form-control py-1 px-2 rounded-md"
                />
              </label>

              <div className="flex items-center gap-4 mt-4 dark:admin-dark dark:relative">
                <Button
                  type="submit"
                  variant="success"
                  size="sm"
                  label={loading ? "Uploading..." : "Add Skill"}
                  disabled={loading}
                  icon={loading ? <FaCloudUploadAlt /> : <FaPlusCircle />}
                />

                <Button
                  type="button"
                  onClick={onClose}
                  label="Close"
                  variant="danger"
                  size="sm"
                  icon={<FaTimesCircle />}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSkills;
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
    // backgroundColor: "#fff",
    padding: "25px",
    borderRadius: "8px",
    width: "700px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.26)",
  },
  formGroup: {
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "4px",
    marginTop: "4px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: "15px",
    paddingBottom: "10px",
  },
  buttonPrimary: {
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    marginRight: "8px",
    cursor: "pointer",
  },
  buttonSecondary: {
    padding: "8px 16px",
    backgroundColor: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  padding: {
    paddingTop: "20px",
    paddingBottom: "20px",
  },
};

// const customStyles = (isDark) => ({
//   control: (provided) => ({
//     ...provided,
//     backgroundColor: isDark ? "#1e293b" : "#ffffff",
//     borderColor: isDark ? "#334155" : "#d1d5db",
//     color: isDark ? "#e5e7eb" : "#111827",
//   }),
//   menu: (provided) => ({
//     ...provided,
//     backgroundColor: isDark ? "#1e293b" : "#ffffff",
//   }),
//   option: (provided, state) => ({
//     ...provided,
//     backgroundColor: state.isFocused
//       ? isDark
//         ? "#334155"
//         : "#e5e7eb"
//       : isDark
//         ? "#1e293b"
//         : "#ffffff",
//     color: isDark ? "#e5e7eb" : "#111827",
//     cursor: "pointer",
//   }),
// });

// const customStyles = {
//   control: (provided) => ({
//     ...provided,
//     backgroundColor: "#1e293b",
//     borderColor: "#334155",
//     color: "#e5e7eb",
//   }),
//   menu: (provided) => ({
//     ...provided,
//     backgroundColor: "#1e293b",
//     color: "#e5e7eb",
//   }),
//   option: (provided, state) => ({
//     ...provided,
//     backgroundColor: state.isFocused ? "#334155" : "#1e293b",
//     color: "#e5e7eb",
//     cursor: "pointer",
//   }),
//   multiValue: (provided) => ({
//     ...provided,
//     backgroundColor: "#334155",
//   }),
//   multiValueLabel: (provided) => ({
//     ...provided,
//     color: "#e5e7eb",
//   }),
//   multiValueRemove: (provided) => ({
//     ...provided,
//     color: "#e5e7eb",
//     ":hover": {
//       backgroundColor: "#ef4444",
//       color: "white",
//     },
//   }),
//   input: (provided) => ({
//     ...provided,
//     color: "#e5e7eb",
//   }),
//   placeholder: (provided) => ({
//     ...provided,
//     color: "#94a3b8",
//   }),
//   singleValue: (provided) => ({
//     ...provided,
//     color: "#e5e7eb",
//   }),
// };
