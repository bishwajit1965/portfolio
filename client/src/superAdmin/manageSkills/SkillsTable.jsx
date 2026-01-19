import DataTable from "react-data-table-component";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const SkillsTable = ({ skills = [], onEdit, onDelete }) => {
  const columns = [
    {
      name: "Skill Name",
      selector: (row) => row.skillName,
      sortable: true,
      width: "110px",
    },
    {
      name: "Level",
      selector: (row) => row.level,
      sortable: true,
      width: "110px",
    },
    {
      name: "Experience",
      selector: (row) => row.experience,
      sortable: true,
      width: "110px",
    },
    {
      name: "Tools",
      selector: (row) => row.tools,
      sortable: true,
      width: "110px",
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
      width: "110px",
    },
    {
      name: "Created At",
      // selector: (row) => new Date(row.createdAt).toLocaleDateString(),
      selector: (row) =>
        row.createdAt
          ? new Date(row.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              month: "long",
              year: "numeric",
            })
          : "-",
      sortable: true,
      width: "120px",
    },
    {
      name: "Updated At",
      selector: (row) =>
        row.updatedAt
          ? new Date(row.updatedAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          : "Not updated",
      sortable: true,
      width: "120px",
    },
    {
      name: "Actions",
      width: "100px",
      cell: (row) => (
        <>
          <button
            className="btn btn-xs btn-primary mr-2"
            onClick={() => onEdit(row)}
          >
            <FaEdit /> Edit
          </button>
          <button
            className="btn btn-xs btn-secondary"
            onClick={() => onDelete(row._id)}
          >
            <FaTrashAlt /> Delete
          </button>
        </>
      ),
    },
  ];
  return (
    <div className="mt-4">
      <DataTable
        columns={columns}
        data={skills} // Use filtered data here
        pagination
        dense
        highlightOnHover
        pointerOnHover
      />
    </div>
  );
};

export default SkillsTable;
