import { useEffect, useState } from "react";
import { FaEdit, FaTimesCircle } from "react-icons/fa";

import Select from "react-select";
import Button from "../../components/buttons/Button";

const UpdateSkillsModal = ({
  skill,
  onClose,
  onUpdate,
  isDark,
  customStyles,
}) => {
  const [selectedTools, setSelectedTools] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [formData, setFormData] = useState({
    _id: "",
    skillName: "",
    level: "",
    experience: "",
    tools: [],
    category: [],
    updatedAt: "",
  });

  const toolsArray = skill?.tools;
  const categoryArray = skill.category;

  const toolOptions = toolsArray.map((tool) => ({
    value: tool,
    label: tool,
  }));

  const categoryOptions = categoryArray.map((category) => ({
    value: category,
    label: category,
  }));

  useEffect(() => {
    if (skill) {
      setFormData({
        _id: skill._id,
        skillName: skill.skillName || "",
        level: skill.level || "",
        experience: skill.experience || "",
        tools: skill.tools || [],
        category: skill.category || [],
        updatedAt: new Date().toISOString(),
      });

      setSelectedTools(skill?.tools?.map((t) => ({ value: t, label: t })));
      setSelectedCategories(
        skill?.category?.map((c) => ({ value: c, label: c })),
      );
    }
  }, [skill]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Extract updated fields
    const updatedSkillsData = {
      _id: skill._id,
      skillName: formData.get("skillName"),
      level: formData.get("level"),
      experience: formData.get("experience"),
      tools: selectedTools.map((t) => t.value),
      category: selectedCategories.map((c) => c.value),
      updatedAt: new Date().toISOString(),
    };

    // Send the updated fields without image
    onUpdate(updatedSkillsData, false);
  };
  return (
    <div style={styles.modalOverlay} className="admin-dark:bg-slate-800">
      <div
        style={styles.modalContent}
        className="admin-dark:bg-slate-800 admin-dark:text-slate-300 max-w-lg"
      >
        <div className="lg:max-w-lg flex mx-auto border rounded-xl shadow-md hover:shadow-lg lg:p-6 p-2 bg-base-100 admin-dark:bg-slate-800 admin-dark:text-slate-300 admin-dark:border-slate-600 text-slate-600 admin-dark:shadow-lg admin-dark:hover:shadow-xl transition-shadow duration-300">
          <form
            onSubmit={handleSubmit}
            method="POST"
            className="w-full admin-dark:bg-slate-800 admin-dark:text-slate-300"
          >
            {/* Form Header */}
            <div className="border-b-2 pb-2 mb-4 border-slate-200 admin-dark:border-slate-600">
              <h2 className="lg:text-xl font-extrabold flex items-center gap-2">
                <FaEdit /> Update Skills
              </h2>
            </div>

            {/* Skill name */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text admin-dark:text-slate-300">
                  Skill name:
                </span>
              </div>
              <input
                type="text"
                id="skillName"
                name="skillName"
                value={formData.skillName}
                onChange={handleInputChange}
                required
                className="input input-bordered input-sm form-control max- w-full mb-2 admin-dark:bg-slate-700 admin-dark:text-slate-300"
              />
            </label>

            {/* Level */}
            <label className="form-control">
              <div className="label">
                <span className="label-text admin-dark:text-slate-300">
                  Skills level:
                </span>
              </div>
              <input
                type="text"
                id="level"
                name="level"
                value={formData.level}
                onChange={handleInputChange}
                className="input input-bordered input-sm form-control max- w-full mb-2 admin-dark:bg-slate-700 admin-dark:text-slate-300"
                required
              />
            </label>

            {/* Experience */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text admin-dark:text-slate-300">
                  Experience:
                </span>
              </div>
              <input
                type="text"
                id="experience"
                cols="56"
                rows="4"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="input input-bordered input-sm form-control max- w-full mb-2 admin-dark:bg-slate-700 admin-dark:text-slate-300"
                required
              />
            </label>

            {/* Tools Multi-Select */}
            <label className="form-control">
              <div className="label">
                <span className="label-text admin-dark:text-slate-300">
                  Skill Tools:
                </span>
              </div>
              <Select
                id="tools"
                name="tools"
                isMulti
                options={toolOptions}
                value={selectedTools}
                onChange={setSelectedTools}
                className="form-control py-1 rounded-md admin-dark dark:relative"
                styles={customStyles(isDark)}
              />
            </label>

            <label className="form-control">
              <div className="label">
                <span className="label-text admin-dark:text-slate-300">
                  Categories:
                </span>
              </div>
              <Select
                id="category"
                name="category"
                isMulti
                options={categoryOptions}
                value={selectedCategories}
                onChange={setSelectedCategories}
                styles={customStyles(isDark)}
                className="form-control py-1 rounded-md"
              />
            </label>

            <div className="dark:admin-dark dark:relative z-10 flex items-center justify-end gap-2 mt-4">
              <Button
                type="submit"
                label="Save Changes"
                variant="success"
                size="sm"
                icon={<FaEdit />}
              />

              <Button
                type="button"
                onClick={onClose}
                label="Cancel"
                variant="warning"
                size="sm"
                icon={<FaTimesCircle />}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateSkillsModal;

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
