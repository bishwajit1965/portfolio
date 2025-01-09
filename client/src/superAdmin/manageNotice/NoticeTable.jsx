import { FaEdit, FaTrashAlt } from "react-icons/fa";

import DataTable from "react-data-table-component";

const NoticeTable = ({ notices = [], onEdit, onDelete }) => {
  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      width: "130px",
    },
    {
      name: "Content",
      selector: (row) => row.content,
      sortable: true,
      width: "130px",
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      width: "130px",
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
        data={notices} // Use filtered data here
        pagination
        dense
        highlightOnHover
        pointerOnHover
      />
    </div>
  );
};

export default NoticeTable;
