import { FaEdit, FaEye } from "react-icons/fa";

import { FaTrashArrowUp } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project, handleDelete }) => {
  const imageUrl = `http://localhost:5000/uploads/${project.image}`;
  const { _id, name, type, description } = project;
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`projects/edit/${_id}`);
  };

  const viewProjectDetails = () => {
    navigate(`project-details/${_id}`);
  };

  return (
    <div className="border dark:border-slate-700 rounded-md shadow-md p-4 bg-base-100 dark:bg-slate-900 relative">
      <div className="mb-10">
        <img
          src={imageUrl}
          alt={project.name}
          className="rounded-t-md lg:h-72 lg:w-full mb-4"
        />
        <p>{_id}</p>
        <h2 className="font-bold">{name}</h2>
        <p>{type}</p>
        <p>{description}</p>
      </div>

      <div className="absolute bottom-2 space-x-2 lg:space-x-4">
        <button
          onClick={handleEdit}
          className="btn btn-primary btn-sm text-white"
        >
          Update <FaEdit />
        </button>

        <button
          type="submit"
          className="btn btn-sm btn-success text-white"
          onClick={viewProjectDetails}
        >
          View Details <FaEye />
        </button>

        <button
          type="submit"
          className="btn btn-sm btn-error text-white border-none"
          onClick={() => handleDelete(_id)}
        >
          Delete <FaTrashArrowUp />
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
