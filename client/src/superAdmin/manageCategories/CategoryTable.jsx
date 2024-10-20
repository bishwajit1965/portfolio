import { FaEdit, FaTrashAlt } from "react-icons/fa";

import DataTable from "react-data-table-component";
import { useState } from "react";

const CategoryTable = ({ categories = [], onEdit, onDelete }) => {
  const [filterText, setFilterText] = useState("");

  // Filtered categories calculated directly from props and input
  const filteredCategories = categories.filter(
    (category) =>
      typeof category.name === "string" &&
      category.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const columns = [
    {
      name: "Category Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Updated At",
      selector: (row) =>
        row.updatedAt
          ? new Date(row.updatedAt).toLocaleDateString()
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
      <input
        type="text"
        placeholder="Filter categories..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className="input input-bordered input-sm form-control mb-2"
      />
      <DataTable
        columns={columns}
        data={filteredCategories} // Use filtered data here
        pagination
        highlightOnHover
        pointerOnHover
      />
    </div>
  );
};

export default CategoryTable;
