import DataTable from "react-data-table-component";
import TableLoader from "./TableLoader";
import EmptyState from "./EmptyState";

const CrudTable = ({
  columns,
  data,
  loading,
  totalRows,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  if (loading) {
    return <TableLoader />;
  }

  if (!data?.length) {
    return <EmptyState />;
  }

  return (
    <DataTable
      columns={columns}
      data={data}
      pagination
      paginationServer
      paginationTotalRows={totalRows}
      onChangePage={onPageChange}
      onChangeRowsPerPage={onRowsPerPageChange}
      paginationPerPage={rowsPerPage}
      highlightOnHover
      dense
      pointerOnHover
      responsive
      striped
    />
  );
};

export default CrudTable;
