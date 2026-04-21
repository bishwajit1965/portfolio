import { FaEdit, FaTrashAlt } from "react-icons/fa";
import DataTable from "react-data-table-component";

const TagTable = ({ tags = [], onEdit, onDelete, filterText }) => {
  // Filtered categories calculated directly from props and input
  const filteredTags = tags.filter(
    (tag) =>
      typeof tag.name === "string" &&
      tag.name.toLowerCase().includes(filterText.toLowerCase()),
  );

  const columns = [
    {
      name: "Tag Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) =>
        new Date(row.createdAt).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      sortable: true,
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
    },
    {
      name: "Actions",
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
    <div>
      <DataTable
        columns={columns}
        data={filteredTags} // Use filtered data here
        pagination
        dense
        highlightOnHover
        pointerOnHover
      />
    </div>
  );
};

export default TagTable;
