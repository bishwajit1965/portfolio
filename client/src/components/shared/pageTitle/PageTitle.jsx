const PageTitle = ({ title, subtitle }) => {
  return (
    <div>
      <div className="lg:space-y-4 text-center lg:my-10 md:my-6 my-2">
        <h2 className="lg:text-4xl text-2xl font-bold dark:text-emerald-400">
          {title}
        </h2>
        {subtitle && (
          <p className="text-md font-serif max-w-2xl mx-auto hidden lg:block dark:text-emerald-400">
            {subtitle}
          </p>
        )}
        <div className="w-20 h-1 mx-auto bg-orange-900 dark:bg-emerald-400 lg:my-4 my-2 hidden lg:block"></div>
      </div>
    </div>
  );
};

export default PageTitle;
