import { FaEdit, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import MiniButton from "../../components/buttons/MiniButton";

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
    <div style={styles.modalOverlay} className="admin-dark:bg-slate-800">
      <div
        style={styles.modalContent}
        className="bg-base-100 text-slate-700 admin-dark:bg-slate-800 admin-dark:text-slate-300"
      >
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <div className="border-b-2 border-base-300 admin-dark:border-slate-700 mb-4 pb-2">
              <h2 className="lg:text-xl text-lg font-bold flex items-center gap-2">
                <FaEdit />
                Update Notice Status
              </h2>
            </div>
            <label htmlFor="Notice" className="font-bold ">
              Notice status:
            </label>
            <div className="">
              <select
                id="status"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={styles.select}
                className="w-full select select-sm rounded-md text-slate-700 admin-dark:text-slate-300 admin-dark:bg-slate-700 admin-dark:border-slate-600 border my-1"
                required
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2">
            <MiniButton
              type="submit"
              variant="success"
              label="Update"
              icon={<FaEdit />}
              className=""
              // style={styles.buttonPrimary}
            />

            <MiniButton
              type="button"
              variant="warning"
              label="Cancel"
              icon={<FaTimes />}
              className=""
              onClick={onClose}
              // style={styles.buttonSecondary}
            >
              <FaTimes /> Cancel
            </MiniButton>
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
export default UpdateNoticeModal;
