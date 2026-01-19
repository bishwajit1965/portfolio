import SuperAdminPageTitle from "../superAdminPageTitle/SuperAdminPageTitle";
import { NavLink } from "react-router-dom";
import Select from "react-select";
import { FaPlusCircle } from "react-icons/fa";
import { useState } from "react";
import apiRequest from "../utils/apiRequest";
import Swal from "sweetalert2";
import { useEffect } from "react";

const AddSkills = () => {
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
    <div className="p-2">
      <SuperAdminPageTitle
        title="Add"
        decoratedText="Skills"
        subtitle="Super admin only!"
      />
      <div className="flex lg:justify-start items-center justify-between lg:mb-2 bg-base-200 p-2 shadow-sm">
        <NavLink to="/super-admin/manage-skills" className="m-0">
          <button className="btn btn-xs btn-primary">
            <FaPlusCircle />
            Manage Skills
          </button>
        </NavLink>
      </div>
      <div className="lg:max-w-xl mx-auto mt-4">
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
      <div className="lg:max-w-xl flex mx-auto border rounded-xl shadow-md hover:shadow-lg p-10 my-8 bg-base-200">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="">
            <h2 className="lg:text-xl text-lg font-extrabold flex items-center gap-2 ">
              <FaPlusCircle />
              Add Skills
            </h2>
          </div>
          <div className="w-full">
            {message && <p className="text-blue-800 font-bold">{message}</p>}
          </div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Skill name:</span>
            </div>
            <input
              type="text"
              name="skillName"
              placeholder="Skill name..."
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              className="input input-sm input-bordered form-control w-full"
            />
          </label>

          <label className="form-control">
            <div className="label">
              <span className="label-text">Skills level:</span>
            </div>
            <input
              type="text"
              name="level"
              placeholder="Level..."
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="input input-sm input-bordered form-control w-full"
            />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Experience:</span>
            </div>
            <input
              type="text"
              name="experience"
              placeholder="Experience..."
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="input input-sm input-bordered form-control w-full"
            />
          </label>

          <label className="form-control">
            <div className="label">
              <span className="label-text">Skill Tools:</span>
            </div>
            <Select
              name="tools"
              options={options}
              isMulti
              value={selectedTools}
              onChange={handleToolChange}
              className="form-control py-1 px-2 rounded-md"
            />
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Categories:</span>
            </div>
            <Select
              name="category"
              options={categoryOptions}
              isMulti
              value={selectedCategories}
              onChange={handleCategoryChange}
              className="form-control py-1 px-2 rounded-md"
            />
          </label>

          <div className="lg:pt-4 px-2">
            <button type="submit" className="btn btn-sm btn-primary">
              {loading ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <FaPlusCircle />
              )}

              {loading ? "Uploading..." : "Add Skill"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSkills;
