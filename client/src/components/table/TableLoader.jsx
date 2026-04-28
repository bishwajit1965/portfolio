const TableLoader = ({ text = "Loading data..." }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-10 space-y-3">
      <span className="loading loading-ring loading-lg admin-dark:text-slate-200"></span>

      <p className="text-sm text-slate-500 admin-dark:text-slate-400">{text}</p>
    </div>
  );
};

export default TableLoader;

// Usage
{
  /* <TableLoader text="Fetching system preferences..." /> */
}
