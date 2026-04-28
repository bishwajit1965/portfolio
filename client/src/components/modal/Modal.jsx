import { FaTimes } from "react-icons/fa";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  width = "700px",
  showClose = true,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        style={{ width }}
        onClick={(e) => e.stopPropagation()}
        className="
          bg-base-100
          text-slate-700
          admin-dark:bg-slate-800
          admin-dark:text-slate-400
          rounded-lg
          shadow-xl
          max-h-[80vh]
          overflow-y-auto
          p-6
          relative
        "
      >
        {(title || showClose) && (
          <div className="flex justify-between items-center mb-4 border-b pb-3">
            {title && <h2 className="text-lg font-bold">{title}</h2>}

            {showClose && (
              <button onClick={onClose} className="text-xl hover:opacity-80">
                <FaTimes />
              </button>
            )}
          </div>
        )}

        {children}
      </div>
    </div>
  );
};

export default Modal;
