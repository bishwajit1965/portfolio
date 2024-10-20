import { FaEdit, FaEye } from "react-icons/fa";

import { FaTrashArrowUp } from "react-icons/fa6";
import ProjectVisibilityToggle from "./ProjectVisibilityToggle";
import { useNavigate } from "react-router-dom";

const ProjectDisplayCard = ({ project, handleDelete }) => {
  const imageUrl = `http://localhost:5000/uploads/${project.image}`;

  const { _id, name, type, description, visibility } = project;

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/super-admin/edit-project-details/${_id}`);
  };

  const viewProjectDetails = () => {
    navigate(`/super-admin/view-project-details/${_id}`);
  };

  return (
    <div className="border dark:border-slate-700 rounded-md shadow-md p-2 bg-base-100 dark:bg-slate-900 relative">
      <div className="">
        <img
          src={imageUrl}
          alt={project.name}
          className="rounded-t-md lg:h-60 lg:w-full mb-4"
        />
        <div className="h-56">
          <p>{_id}</p>
          <h2 className="font-bold">{name}</h2>
          <p>{type}</p>
          <p>{description}</p>
        </div>
      </div>

      <div className="absolute bottom-2 space-x-1 lg:space-x-2">
        <button
          onClick={() => handleEdit()}
          className="btn btn-xs btn-primary text-white"
        >
          Update <FaEdit />
        </button>

        <button
          type="submit"
          className="btn btn-xs btn-success text-white"
          onClick={() => viewProjectDetails()}
        >
          Details <FaEye />
        </button>

        <button
          type="submit"
          className="btn btn-xs btn-error text-white border-none"
          onClick={() => handleDelete(_id)}
        >
          Delete <FaTrashArrowUp />
        </button>

        {/* Project visibility functionality */}
        <div className="mt-1">
          <ProjectVisibilityToggle
            projectId={_id}
            initialVisibility={visibility}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectDisplayCard;
