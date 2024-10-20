import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const imageUrl = `http://localhost:5000/uploads/${project.image}`;
  const { _id, name, type, description } = project;
  const navigate = useNavigate();

  const viewProjectDetails = () => {
    navigate(`project-details/${_id}`);
  };

  return (
    <div className="border dark:border-slate-700 rounded-md shadow-md p-2 bg-base-100 dark:bg-slate-900 relative">
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
          type="submit"
          className="btn btn-sm btn-success text-white"
          onClick={viewProjectDetails}
        >
          View Details <FaEye />
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
