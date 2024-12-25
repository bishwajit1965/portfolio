const PageTitle = ({ title, decoratedText, subtitle, dataLength }) => {
  return (
    <div className="lg:space-y-4 text-center lg:my-10 md:my-6 my-2 bg-base-200 lg:py-10 rounded-md py-5 shadow-sm dark:bg-slate-800 dark:text-teal-600">
      <h1 className="lg:text-3xl text-2xl font-bold dark:text-emerald-400 flex justify-center items-center space-x-2">
        <span className="text-amber-700">{title}</span>
        <span className="text-green-700">{decoratedText}</span>
        {dataLength && (
          <span className="dark:text-amber-700 mt-1 text-green-700">
            : {dataLength}
          </span>
        )}
      </h1>

      {subtitle && (
        <p className="text-md font-serif max-w-5xl mx-auto hidden lg:block dark:text-emerald-400">
          {subtitle}
        </p>
      )}

      <div className="w-24 h-1 mx-auto rounded-md bg-orange-800 dark:bg-emerald-400 lg:my-4 my-2 hidden lg:block"></div>
    </div>
  );
};

export default PageTitle;
