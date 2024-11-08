const SectionTitleSmall = ({ title, decoratedText, subtitle }) => {
  return (
    <div>
      <div className="lg:mb-2 mb-2 text-center">
        <h2 className="lg:text-xl uppercase font-bold dark:text-emerald-400">
          <span className="text-amber-700">{title}</span>{" "}
          <span className="text-green-700">{decoratedText}</span>
        </h2>
        {subtitle && (
          <p className="text-md font-serif max-w-2xl mx-auto hidden lg:block dark:text-emerald-400">
            {subtitle}
          </p>
        )}
        {subtitle && (
          <div className="w-24 h-1 mx-auto bg-orange-800 rounded-md dark:bg-emerald-400 lg:my-4 my-2 hidden lg:block"></div>
        )}
      </div>
    </div>
  );
};

export default SectionTitleSmall;
