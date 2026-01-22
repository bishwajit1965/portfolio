const SuperAdminFooter = () => {
  const year = new Date().getFullYear();
  return (
    <div className="text-center text-sm bg-base-300 p-2 border-t">
      <p className="text-sm">
        &copy;
        {year} All rights reserved against Web tech Services
      </p>
    </div>
  );
};

export default SuperAdminFooter;
