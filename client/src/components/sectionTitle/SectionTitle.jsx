// import PropTypes from "prop-types";

const SectionTitle = ({ title, decoratedText, subtitle }) => {
  return (
    <div className="lg:space-y-3 space-y-2 text-center lg:my-10 md:my-6 my-2 lg:py-6 py-2 lg:bg-base-300 rounded-md">
      <h2 className="lg:text-3xl text-2xl font-bold dark:text-emerald-400">
        <span className="text-amber-700">{title}</span>{" "}
        <span className="text-green-700">{decoratedText}</span>
      </h2>
      {subtitle && (
        <p className="text-md font-serif max-w-3xl mx-auto hidden lg:block dark:text-emerald-400">
          {subtitle}
        </p>
      )}
      {subtitle && (
        <div className="w-24 h-1 mx-auto bg-orange-800 rounded-md dark:bg-emerald-400 lg:my-4 my-2 hidden lg:block"></div>
      )}
    </div>
  );
};

// Prop types validation
// SectionTitle.propTypes = {
//   title: PropTypes.string.isRequired,
//   subtitle: PropTypes.string,
// };

// Default prop types
// SectionTitle.defaultProps = {
//   subtitle: "",
// };

export default SectionTitle;
