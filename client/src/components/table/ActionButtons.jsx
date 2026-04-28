import { FaCloudUploadAlt, FaEdit, FaTrashAlt } from "react-icons/fa";
import MiniButton from "../buttons/MiniButton";

const ActionButtons = ({
  onCreate,
  onEdit,
  onDelete,
  showCreate = true,
  showEdit = true,
  showDelete = true,
}) => {
  return (
    <div className="lg:flex items-center grid gap-2">
      {showCreate && (
        <MiniButton
          icon={<FaCloudUploadAlt />}
          variant="default"
          onClick={onCreate}
          label="Create"
        />
      )}
      {showEdit && (
        <MiniButton
          icon={<FaEdit />}
          variant="default"
          onClick={onEdit}
          label="Edit"
        />
      )}

      {showDelete && (
        <MiniButton
          icon={<FaTrashAlt />}
          variant="danger"
          onClick={onDelete}
          label="Delete"
        />
      )}
    </div>
  );
};

export default ActionButtons;
