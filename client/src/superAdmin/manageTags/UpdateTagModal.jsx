import { useEffect, useState } from "react";
import { FaEdit, FaTimes } from "react-icons/fa";
import MiniButton from "../../components/buttons/MiniButton";

const UpdateTagModal = ({ tag, onClose, onUpdate }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (tag) {
      setName(tag.name);
    }
  }, [tag]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      alert("Category name cannot be empty.");
      return;
    }
    const updatedTag = { ...tag, name };
    onUpdate(updatedTag);
  };

  return (
    <div
      style={styles.modalOverlay}
      className="admin-dark:bg-gray-800 admin-dark:text-slate-300"
    >
      <div
        style={styles.modalContent}
        className="admin-dark:bg-gray-800 bg-base-100 admin-dark:text-slate-300 space-y-4 rounded-lg shadow-lg p-6 w-full max-w-md"
      >
        <h2 className="admin-dark:text-slate-300 text-slate-700 font-bold lg:text-xl text-lg border-b-2 border-slate-3 pb-1 admin-dark:border-slate-600 flex items-center gap-2">
          <FaEdit />
          Update Tag
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label
              htmlFor="TagName"
              className="text-slate-600 admin-dark:text-slate-400 font-semibold"
            >
              Tag Name:
            </label>
            <input
              type="text"
              id="TagName"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input input-bordered input-sm form-control max- w-full mb-2 admin-dark:bg-slate-700 text-slate-700 admin-dark:text-slate-300"
            />
          </div>
          <div className="flex items-center justify-end gap-2">
            <MiniButton
              type="submit"
              variant="success"
              label="Update"
              icon={<FaEdit />}
            />

            <MiniButton
              type="button"
              variant="warning"
              label="Cancel"
              icon={<FaTimes />}
              onClick={onClose}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

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
    padding: "24px",
    borderRadius: "8px",
    width: "400px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.26)",
  },
  formGroup: {
    marginBottom: "16px",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginTop: "4px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end",
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
};

export default UpdateTagModal;
