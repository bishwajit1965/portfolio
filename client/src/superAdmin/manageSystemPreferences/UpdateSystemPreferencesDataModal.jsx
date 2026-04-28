const UpdateSystemPreferencesDataModal = ({
  selectedSystemPreference,
  onClose,
}) => {
  const { appName, imageUrl } = selectedSystemPreference || {};

  return (
    <div style={styles.modalOverlay} className="admin-dark:bg-slate-800">
      <div
        style={styles.modalContent}
        className="bg-base-100 text-slate-700 admin-dark:bg-slate-800 admin-dark:text-slate-400 max-h-[80vh] overflow-y-auto"
      >
        UpdateSystemPreferencesDataModal{appName}
        <img src={imageUrl} alt={appName} />
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default UpdateSystemPreferencesDataModal;

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
    padding: "20px",
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
