const PageTitle = ({
  title,
  decoratedText,
  subtitle,
  dataLength,
  icon: Icon,
}) => {
  return (
    <div className="lg:space-y-4 text-center lg:py-6 md:py-6 py-2 mb-4 bg-base-200 rounded-md shadow-sm dark:bg-slate-800 dark:text-teal-600">
      <h1 className="lg:text-3xl text-lg font-bold dark:text-emerald-400 flex justify-center items-center space-x-2">
        {Icon && <Icon className="text-amber-600" size={24} />}

        {title && <span className="text-amber-700">{title}</span>}

        {decoratedText && (
          <span className="text-green-700">{decoratedText}</span>
        )}

        {dataLength && (
          <span>
            <span className="dark:text-base-100 text-base-100 mt-1 w-8 h-8 rounded-full dark:bg-green-600 bg-green-500 flex items-center justify-center text-[18px]">
              {dataLength}
            </span>
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
