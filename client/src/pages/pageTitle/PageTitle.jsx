const PageTitle = ({
  title,
  decoratedText,
  subtitle,
  dataLength,
  icon: Icon,
}) => {
  return (
    <div className="lg:space-y-4 space-y-2 text-center lg:mt-10 my-4 lg:py-6 md:py-6 dark:text-teal-600">
      <h1 className="lg:text-3xl text-lg font-extrabold dark:text-emerald-400 inline-flex justify-center items-center space-x-2">
        {Icon && <Icon className="text-amber-600" size={24} />}

        {title && <span className="text-amber-500">{title}</span>}

        {decoratedText && (
          <span className="text-green-700">{decoratedText}</span>
        )}

        {typeof dataLength === "number" && (
          <span className="dark:text-base-100 text-base-100 w-7 h-7 rounded-full dark:bg-green-600 bg-green-500 inline-flex items-center justify-center text-sm">
            {dataLength}
          </span>
        )}
      </h1>

      {subtitle && (
        <p className="text-sm lg:text-md max-w-5xl mx-auto text-gray-600 dark:text-emerald-400">
          {subtitle}
        </p>
      )}

      <div className="w-24 h-1 mx-auto rounded-md bg-orange-800 dark:bg-emerald-400 lg:my-4 my-2"></div>
    </div>
  );
};

export default PageTitle;
