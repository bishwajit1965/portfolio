import { FaEdit, FaTrashAlt } from "react-icons/fa";

import Avatar from "/assets/Avatar-Profile-PNG-Photos.png";
import DataTable from "react-data-table-component";
import { useState } from "react";

const CommentsTable = ({ comments = [], onEdit, onDelete }) => {
  const [filterText, setFilterText] = useState("");

  // Filtered categories calculated directly from props and input
  const filteredComments = comments.filter(
    (comment) =>
      typeof comment.author === "string" &&
      comment.author.toLowerCase().includes(filterText.toLowerCase())
  );

  const columns = [
    {
      name: "Photo",
      selector: (row) => (
        <img
          src={row.photoUrl ? row.photoUrl : Avatar}
          alt=""
          className="w-7 rounded-full"
        />
      ),

      sortable: true,
    },
    {
      name: "Commenter",
      selector: (row) => row.author,
      sortable: true,
    },
    {
      name: "Commenter Email",
      selector: (row) => row.authorEmail,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
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
      <input
        type="text"
        placeholder="Filter comment..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className="input input-bordered input-sm form-control mb-2"
      />
      <DataTable
        columns={columns}
        data={filteredComments} // Use filtered data here
        pagination
        highlightOnHover
        pointerOnHover
      />
    </div>
  );
};

export default CommentsTable;
