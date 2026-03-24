import { FaArrowAltCircleRight, FaCalendarAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../../components/buttons/Button";

const BookmarkedPostCard = ({ post }) => {
  const { title, content, author, summary, imageUrl, updatedAt, _id } = post;
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  return (
    <div className="lg:col-span-4 col-span-12 bg-base-100 dark:bg-slate-900 rounded-md shadow-md relative lg:min-h-[32rem]">
      <img
        src={`${apiUrl}${imageUrl}`}
        alt={title}
        className="h-56 rounded-t-md w-full object-cover"
      />

      <div className="p-2 py-4 space-y-2">
        <h1 className="lg:text-xl text-lg font-semibold text-gray-600 dark:text-gray-400">
          {title.slice(0, 30)}
        </h1>{" "}
        <p className="text-sm text-gray-600 dark:text-gray-400 font-bold flex items-center gap-2">
          {" "}
          <FaUser /> By {author}
        </p>
        <p className="text-md text-gray-500 font-bold flex items-center gap-2">
          <FaCalendarAlt /> Last updated on:{" "}
          {new Date(updatedAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <p className="text-sm text-gray-600">
          <span className="text-gray-600 font-bold dark:text-gray-400">
            Summary:
          </span>{" "}
          <span className="text-gray-600 dark:text-gray-400">
            {summary.slice(0, 120)}
          </span>
        </p>
        <p
          dangerouslySetInnerHTML={{
            __html: content
              ? content.slice(0, 120) + "..."
              : "No content to display...",
          }}
          className="text-sm text-slate-600 dark:text-slate-400"
        />
      </div>
      <div className="absolute p-2">
        <Link to={`/single-blog-post/${_id}`} className="m-0">
          <Button
            label="Read More"
            variant="outline"
            size="sm"
            icon={<FaArrowAltCircleRight />}
            className="btn btn-sm"
          />
        </Link>
      </div>
    </div>
  );
};

export default BookmarkedPostCard;
