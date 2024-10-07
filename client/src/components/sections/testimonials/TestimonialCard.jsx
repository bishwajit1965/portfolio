import { FaCheckCircle } from "react-icons/fa";

const TestimonialCard = ({ testimonialData }) => {
  const { name, email, testimonial, rating } = testimonialData;
  return (
    <div className="border border-slate-400 dark:border-slate-700 shadow-sm mb-2 rounded-md p-2">
      <p>
        <span className="flex items-center space-x-2">
          <FaCheckCircle className="mr-2 text-blue-700 dark:text-amber-400" />{" "}
          {name} (Email:
          {email}) says:
        </span>
        <span className="text-sm">{testimonial}</span>{" "}
        <span className="bg-blue-600 dark:bg-amber-600 border-blue-900 text-xs py-1 text-white rounded-md px-2">
          Rating: {rating}
        </span>
      </p>
    </div>
  );
};

export default TestimonialCard;
