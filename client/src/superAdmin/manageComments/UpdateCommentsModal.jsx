import { useEffect, useState } from "react";
import { FaEdit, FaTimes } from "react-icons/fa";
import MiniButton from "../../components/buttons/MiniButton";

const UpdateCommentsModal = ({ comment, onClose, onUpdate }) => {
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (comment) {
      setStatus(comment.status);
    }
  }, [comment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status.trim() === "") {
      alert("Category name cannot be empty.");
      return;
    }
    const updatedCommentStatus = { ...comment, status };
    onUpdate(updatedCommentStatus);
  };

  return (
    <div style={styles.modalOverlay}>
      <div
        style={styles.modalContent}
        className="admin-dark:bg-slate-800 admin-dark:text-slate-300 bg-base-100 space-y-4"
      >
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup} className="space-y-2">
            <h2 className="text-lg font-bold flex items-center gap-2 admin-dark:text-slate-300 text-slate-700 border-b-2 pb-1 admin-dark:border-slate-600 border-slate-300">
              <FaEdit /> Update Comment Status
            </h2>

            <div className="">
              <label
                htmlFor="TagName"
                className="font-medium admin-dark:text-slate-300 text-slate-700"
              >
                Comment status:
              </label>
              <div className="">
                <select
                  id="status"
                  name="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  style={styles.select}
                  className="w-full select-sm py-1 border select-bordered rounded-md form-control bg-base-100 text-slate-700 admin-dark:bg-slate-600 admin-dark:text-slate-300"
                  required
                >
                  <option value="approved">Approved</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 justify-end">
            <MiniButton
              type="submit"
              variant="success"
              label="Update Comment Status"
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
export default UpdateCommentsModal;
