import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import ProjectVisibilityToggle from "./ProjectVisibilityToggle";
import { useNavigate } from "react-router-dom";
import SkillBadge from "../../components/skillBadge/SkillBadge";
import MiniButton from "../../components/buttons/MiniButton";

const ProjectDisplayCard = ({ project, handleDelete }) => {
  const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const coverImage = project?.image;
  const imageUrl = `${baseURL}/uploads/${coverImage}`;
  const { _id, name, type, description, visibility, techStacks } = project;

  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/super-admin/edit-project-details/${_id}`);
  };

  const viewProjectDetails = () => {
    navigate(`/super-admin/view-project-details/${_id}`);
  };

  return (
    <div className="border dark:border-slate-700 rounded-md shadow-md p-2 bg-base-100 dark:bg-slate-900 relative min-h-72">
      <div className="">
        <img
          src={imageUrl}
          alt={project.name}
          className="rounded-t-md lg:h-60 lg:w-full mb-4"
        />
        <div className="h-60 space-y-2">
          <h2 className="font-bold">{name}</h2>
          <p>{type}</p>
          <p>{description}</p>

          {/* Tech stacks */}
          <div className="flex flex-wrap gap-2 items-center">
            {techStacks?.length > 0 ? (
              techStacks.map((tech, idx) => (
                <SkillBadge key={idx} label={tech} />
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                No tech stacks listed.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-2 space-x-1 lg:space-x-2">
        <MiniButton
          onClick={() => handleEdit()}
          variant="success"
          label="Update"
          icon={<FaEdit />}
        />

        <MiniButton
          type="submit"
          size="sm"
          variant="success"
          label="Detail"
          icon={<FaEye />}
          className=""
          onClick={() => viewProjectDetails()}
        />

        <MiniButton
          onClick={() => handleDelete(_id)}
          type="submit"
          size="sm"
          variant="danger"
          label="Delete"
          icon={<FaTrash />}
        />

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
