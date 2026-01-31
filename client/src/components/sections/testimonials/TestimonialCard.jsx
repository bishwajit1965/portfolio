import { FaQuoteLeft, FaUser } from "react-icons/fa";

const TestimonialCard = ({ testimonialData }) => {
  const {
    name,
    designation,
    company,
    testimonial,
    rating,
    photo,
    location,
    projectName,
  } = testimonialData;

  return (
    <div className="relative border border-base-300 dark:border-slate-700 bg-base-100 dark:bg-slate-900 shadow-md rounded-xl p-6 space-y-4 max-w-md mx-auto hover:shadow-xl transition-all duration-300">
      {/* Quote icon */}
      <span className="absolute top-4 right-4 text-4xl text-blue-200 dark:text-slate-700">
        <FaQuoteLeft size={20} />
      </span>

      {/* Avatar + Name */}
      <div className="flex items-center gap-4">
        <img
          src={photo}
          alt={name}
          className="w-20 h-20 rounded-full object-cover ring-2 ring-blue-500 dark:ring-amber-400 shadow-md"
        />

        <div>
          <h3 className="text-lg font-bold text-base-content dark:text-amber-400 flex items-center gap-2">
            <FaUser className="text-blue-600 dark:text-amber-400" />
            {name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
            {designation} @ {company}
          </p>
        </div>
      </div>

      {/* Testimonial */}
      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 italic">
        “ {testimonial} ”
      </p>

      {/* Project */}
      <p className="text-xs text-gray-500 dark:text-amber-400">
        Project: <span className="font-medium">{projectName}</span>
      </p>

      {/* Footer */}
      <div className="flex justify-between items-center pt-3 border-t border-base-200 dark:border-slate-700">
        <span className="text-xs text-gray-500">{location}</span>

        <span className="flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-amber-400">
          ⭐ {rating}/5
        </span>
      </div>
    </div>
  );
};

export default TestimonialCard;
