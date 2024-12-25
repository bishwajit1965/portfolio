import CTAButton from "../../components/ctaButton/CTAButton";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const BookmarkedPostCard = ({ post }) => {
  const { title, content, author, summary, imageUrl, updatedAt, _id } = post;
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  return (
    <div className="lg:col-span-4 col-span-12 bg-base-100 dark:bg-slate-900 rounded-md shadow-md">
      <img
        src={`${apiUrl}${imageUrl}`}
        alt={title}
        className="h-56 rounded-t-md w-full object-cover"
      />

      <div className="p-2">
        <h1 className="text-lg font-semibold mb-2">{title.slice(0, 30)}</h1>
        <p className="text-sm text-gray-700 mb-1">By {author}</p>
        <p className="text-md text-gray-500 font-bold mb-2">
          Last updated on:{" "}
          {new Date(updatedAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <p className="text-sm text-gray-600 mb-4">{content.slice(0, 120)}...</p>
        <p className="text-sm text-gray-600 mb-4">{summary.slice(0, 120)}</p>
      </div>

      <div className="p-2">
        <Link to={`/single-blog-post/${_id}`}>
          <CTAButton
            label="Read More"
            icon={<FaArrowAltCircleRight />}
            className="btn btn-sm"
          />
        </Link>
      </div>
    </div>
  );
};

export default BookmarkedPostCard;
