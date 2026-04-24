const SuperAdminFooter = () => {
  const year = new Date().getFullYear();
  return (
    <div className="text-center text-sm bg-base-300 text-slate-700 p-2 border-t border-base-300 admin-dark:bg-gray-800 admin-dark:text-slate-300 admin-dark:border-slate-700">
      <p className="text-sm">
        &copy;
        {year} All rights reserved against Web tech Services.
      </p>
    </div>
  );
};

export default SuperAdminFooter;
