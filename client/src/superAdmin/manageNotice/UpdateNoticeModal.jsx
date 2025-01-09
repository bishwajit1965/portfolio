import { FaEdit, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";

const UpdateNoticeModal = ({ notice, onClose, onUpdate }) => {
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (notice) {
      setStatus(notice.status);
    }
  }, [notice]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status.trim() === "") {
      alert("Notice status cannot be empty.");
      return;
    }
    const updatedNoticeStatus = { ...notice, status };
    onUpdate(updatedNoticeStatus);
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="Notice" className="font-bold">
              Notice status:
            </label>
            <div className="">
              <select
                id="status"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={styles.select}
                className="w-full border my-4 p-2"
                required
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>
          <div style={styles.buttonGroup}>
            <button
              type="submit"
              className="btn btn-sm"
              style={styles.buttonPrimary}
            >
              <FaEdit /> Update
            </button>
            <button
              type="button"
              className="btn btn-sm"
              onClick={onClose}
              style={styles.buttonSecondary}
            >
              <FaTimes /> Cancel
            </button>
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
    backgroundColor: "#fff",
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
export default UpdateNoticeModal;
