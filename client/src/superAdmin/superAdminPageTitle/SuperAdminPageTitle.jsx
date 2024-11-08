const SuperAdminPageTitle = ({ title, decoratedText, subtitle }) => {
  return (
    <div className="text-center border-b border-slate-300 shadow-sm bg-base-300 pb-2">
      <h2 className="lg:text-2xl text-1xl font-bold dark:text-emerald-400">
        {title} <span className="text-orange-700">{decoratedText}</span>
      </h2>
      {subtitle && (
        <p className="lg:pb-1 text-md font-serif max-w-3xl mx-auto hidden lg:block dark:text-emerald-400">
          {subtitle}
        </p>
      )}
      <div className="w-20 h-1 shadow-md mx-auto bg-orange-900 dark:bg-emerald-400 hidden lg:block"></div>
    </div>
  );
};

export default SuperAdminPageTitle;
