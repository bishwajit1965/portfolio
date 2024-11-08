const PageTitle = ({ title, decoratedText, subtitle }) => {
  return (
    <div className="lg:space-y-4 text-center lg:my-10 md:my-6 my-2">
      <h2 className="lg:text-3xl text-2xl font-bold dark:text-emerald-400">
        <span className="text-amber-700">{title}</span>{" "}
        <span className="text-green-700">{decoratedText}</span>
      </h2>
      {subtitle && (
        <p className="text-md font-serif max-w-5xl mx-auto hidden lg:block dark:text-emerald-400">
          {subtitle}
        </p>
      )}
      <div className="w-24 h-1 mx-auto bg-orange-800 rounded-md dark:bg-emerald-400 lg:my-4 my-2 hidden lg:block"></div>
    </div>
  );
};

export default PageTitle;
