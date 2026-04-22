import DataTable from "react-data-table-component";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const SkillsTable = ({ skills = [], onEdit, onDelete, filterText }) => {
  // Filter skills based on skillName and category
  const filteredSkills = skills.filter(
    (skill) =>
      (typeof skill.skillName === "string" &&
        skill.skillName.toLowerCase().includes(filterText.toLowerCase())) ||
      (typeof skill.category === "string" &&
        skill.category.toLowerCase().includes(filterText.toLowerCase())),
  );

  const columns = [
    {
      name: "Skill Name",
      selector: (row) => row.skillName,
      sortable: true,
      width: "190px",
    },
    {
      name: "Level",
      selector: (row) => row.level,
      sortable: true,
      width: "100px",
    },
    {
      name: "Experience",
      selector: (row) => row.experience,
      sortable: true,
      width: "230px",
    },
    {
      name: "Tools",
      selector: (row) => row.tools,
      sortable: true,
      width: "120px",
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
      width: "90px",
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
      width: "180px",
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
      width: "180px",
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
        data={filteredSkills} // Use filtered data here
        pagination
        dense
        highlightOnHover
        pointerOnHover
      />
    </div>
  );
};

export default SkillsTable;
