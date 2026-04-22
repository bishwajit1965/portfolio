import { FaEdit, FaTrashAlt } from "react-icons/fa";

import DataTable from "react-data-table-component";

const CategoryTable = ({ categories = [], onEdit, onDelete, filterText }) => {
  // Filtered categories calculated directly from props and input
  const filteredCategories = categories.filter(
    (category) =>
      typeof category.name === "string" &&
      category.name.toLowerCase().includes(filterText.toLowerCase()),
  );

  const columns = [
    {
      name: "Category Name",
      selector: (row) => row.name,
      sortable: true,
      width: "320px",
    },
    {
      name: "Created At",
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
      width: "380px",
    },
    {
      name: "Updated At",
      selector: (row) =>
        row.updatedAt
          ? new Date(row.updatedAt).toLocaleDateString()
          : "Not updated",
      sortable: true,
      width: "380px",
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
      width: "180px",
    },
  ];

  return (
    <div>
      <DataTable
        columns={columns}
        data={filteredCategories} // Use filtered data here
        pagination
        dense
        highlightOnHover
        pointerOnHover
      />
    </div>
  );
};

export default CategoryTable;
