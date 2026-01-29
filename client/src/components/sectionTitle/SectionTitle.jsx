const SectionTitle = ({
  title,
  decoratedText,
  subtitle,
  icon: Icon,
  dataLength,
}) => {
  return (
    <div className="lg:py-6 py-2 mb-2 lg:mt-10 mt-4 lg:space-y-4 space-y-2 text-center">
      <h2 className="lg:text-3xl text-[18px] lg:font-extrabold font-bold dark:text-emerald-400 flex items-center justify-center gap-1">
        {Icon && <Icon className="text-amber-600 mr-1" size={24} />}
        {title && <span className="text-amber-600">{title}</span>}
        {decoratedText && (
          <span className="text-green-700">{decoratedText}</span>
        )}
        {dataLength && (
          <span className="text-base-100 w-6 lg:w-8 h-6 lg:h-8 rounded-full bg-amber-600 flex items-center justify-center lg:text-[20px] text-sm  dark:bg-emerald-500 ml-2 shadow-sm">
            {dataLength}
          </span>
        )}
      </h2>

      {subtitle && (
        <p className="text-md font-serif max-w-2xl mx-auto hidden lg:block dark:text-emerald-400">
          {subtitle}
        </p>
      )}

      {subtitle && (
        <div className="w-24 h-1 mx-auto bg-orange-800 rounded-md dark:bg-emerald-400 lg:my-4 my-2 hidden lg:block" />
      )}
    </div>
  );
};

export default SectionTitle;

// // import PropTypes from "prop-types";

// const SectionTitle = ({ title, decoratedText, subtitle }) => {
//   return (
//     <div className="lg:py-8 py-4 mb-2 lg:space-y-4 space-y-2 text-center dark:bg-slate-800 bg-base-200 rounded-md shadow-sm border dark:border-base-content">
//       <h2 className="lg:text-3xl text-lg font-extrabold dark:text-emerald-400 space-x-2">
//         <span className="text-amber-700">{title}</span>
//         <span className="text-green-700">{decoratedText}</span>
//       </h2>

//       {subtitle && (
//         <p className="text-md font-serif max-w-3xl mx-auto hidden lg:block dark:text-emerald-400">
//           {subtitle}
//         </p>
//       )}
//       {subtitle && (
//         <div className="w-24 h-1 mx-auto bg-orange-800 rounded-md dark:bg-emerald-400 lg:my-4 my-2 hidden lg:block"></div>
//       )}
//     </div>
//   );
// };

// // Prop types validation
// // SectionTitle.propTypes = {
// //   title: PropTypes.string.isRequired,
// //   subtitle: PropTypes.string,
// // };

// // Default prop types
// // SectionTitle.defaultProps = {
// //   subtitle: "",
// // };

// export default SectionTitle;
