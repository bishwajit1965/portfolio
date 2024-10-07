import { FaTimes } from "react-icons/fa";

const Modal = ({ project, onClose }) => {
  const { title, description, liveDemo, sourceCode, photoUrl, technologies } =
    project;

  return (
    <div className="fixed inset-0 bg-black bg:opacity-50 flex justify-center items-center z-50">
      <div className="pt-2 pb-4 pr-4 pl-4 bg-white rounded-lg shadow-lg max-w-lg w-full dark:border border-slate-700 dark:bg-slate-900">
        <div className="flex justify-end items-center mb-2 border-b border-slate-400 dark:border-slate-700 pb-3 rounded-md">
          <button
            className="text-red-500 btn btn-sm btn-circle dark:text-red-400 hover:text-red-700 font-bold text-lg dark:bg-slate-800 dark:border-slate-700"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 justify-between">
          <div className="">
            <img src={photoUrl} alt="" className="w-full h-36 rounded-md" />
          </div>
          <div className="dark:text-base-200">
            <p>
              Technologies used:
              {technologies.length > 0
                ? technologies.map((technology, index) => (
                    <span key={technology._id} className="mr-1 font-bold">
                      {" "}
                      {technology}
                      {index < technologies.length - 1 && ","}
                    </span>
                  ))
                : "No technology info available"}
            </p>
            <ul>
              <li>
                Live Demo:{" "}
                <a
                  href={liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View
                </a>
              </li>
              <li>
                Source Code:{" "}
                <a
                  href={sourceCode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/*More detailed data about the project can be added here */}
        <div className="mt-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="mb-4">{description}</p>
        </div>

        <button
          className="mt-4 flex items-center dark:border-none bg-blue-500 text-white btn btn-sm rounded hover:bg-blue-600"
          onClick={onClose}
        >
          <FaTimes /> Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
