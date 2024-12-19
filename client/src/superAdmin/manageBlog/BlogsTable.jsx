import { FaEdit, FaTrashAlt } from "react-icons/fa";

import Avatar from "/assets/Avatar-Profile-PNG-Photos.png";
import DataTable from "react-data-table-component";
import { useState } from "react";

const BlogsTable = ({ blogPosts = [], onEdit, onDelete }) => {
  const apiUrl = "http://localhost:5000";
  const [filterText, setFilterText] = useState("");

  // Filtered categories calculated directly from props and input
  const filteredBlogPosts = blogPosts.filter(
    (blogPost) =>
      typeof blogPost.title === "string" &&
      blogPost.title.toLowerCase().includes(filterText.toLowerCase())
  );

  const columns = [
    {
      name: "Photo",
      selector: (row) => (
        <img
          src={row.imageUrl ? `${apiUrl}${row.imageUrl}` : Avatar}
          alt={row.title || "Default Avatar"}
          onError={(e) => (e.target.src = Avatar)} // Fallback to Avatar on error
          style={{
            width: "80px",
            height: "40px",
            padding: "4px",
            borderRadius: "5%",
            objectFit: "cover",
          }}
        />
      ),
      sortable: true,
      width: "90px",
    },
    {
      name: "Blog Title",
      selector: (row) => row.title,
      sortable: true,
      width: "130px",
    },
    {
      name: "Summary",
      selector: (row) => row.summary,
      sortable: true,
      width: "130px",
    },
    {
      name: "Author",
      selector: (row) => row.author,
      sortable: true,
      width: "100px",
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      width: "100px",
    },
    {
      name: "Created At",
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
      width: "110px",
    },
    {
      name: "Updated At",
      selector: (row) =>
        row.updatedAt
          ? new Date(row.updatedAt).toLocaleDateString()
          : "Not updated",
      sortable: true,
      width: "110px",
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
    <div>
      <input
        type="text"
        placeholder="Filter blog post..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className="input input-bordered input-sm form-control mb-2"
      />
      <DataTable
        columns={columns}
        data={filteredBlogPosts} // Use filtered data here
        pagination
        dense
        highlightOnHover
        pointerOnHover
      />
    </div>
  );
};

export default BlogsTable;
