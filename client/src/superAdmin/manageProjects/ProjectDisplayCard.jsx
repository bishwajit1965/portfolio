import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import ProjectVisibilityToggle from "./ProjectVisibilityToggle";
import { useNavigate } from "react-router-dom";
import SkillBadge from "../../components/skillBadge/SkillBadge";
import MiniButton from "../../components/buttons/MiniButton";

const ProjectDisplayCard = ({ project, handleDelete }) => {
  const { _id, name, type, description, visibility, techStacks, image } =
    project;
  const getImageSrc = (img) => {
    if (!img) return "";
    if (typeof img === "string" && img.startsWith("http")) return img;
    if (img.url) return img.url;
  };
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/super-admin/edit-project-details/${_id}`);
  };

  const viewProjectDetails = () => {
    navigate(`/super-admin/view-project-details/${_id}`);
  };

  return (
    <div className="border dark:border-slate-700 rounded-md shadow-md bg-base-100 dark:bg-slate-900 relative min-h-96">
      <div className="">
        <img
          src={getImageSrc(image)}
          alt={project.name}
          className="rounded-t-md lg:h-auto lg:w-full object-fill"
        />
        <div className="min-h-[21rem] space-y-2 p-2">
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

      <div className="absolute bottom-1.5 space-y-2 space-x-1 lg:space-x-2 p-2">
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
