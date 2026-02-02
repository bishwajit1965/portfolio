import "./BlogPostCard.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import BookmarkButton from "../bookmarkButton/BookmarkButton";
import { FaArrowCircleRight, FaUserAlt } from "react-icons/fa";
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";
import { FaLayerGroup, FaTags } from "react-icons/fa6";
import Button from "../buttons/Button";

const BlogPostCard = ({ post, getCategoryNames, getTagNames }) => {
  const { user } = useContext(AuthContext);
  const loggedInUserId = user ? user.uid : null;
  console.log(loggedInUserId);
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const [loaded, setLoaded] = useState(false);
  const [autoSummary, setAutoSummary] = useState("");
  const {
    _id,
    author,
    title,
    summary,
    content,
    imageUrl,
    category,
    tag,
    createdAt,
  } = post;

  // Blog post summary
  const generateSummary = (content) => {
    const plainText = content.replace(/<\/?[^>]+(>|$)/g, ""); // Strip HTML tag
    return plainText.length > 150 ? plainText.slice(0, 150) : plainText;
  };

  useEffect(() => {
    if (content) {
      setAutoSummary(generateSummary(content));
    }
  }, [content]);

  return (
    <div className="grid grid-cols-12 gap-4 justify-between items-center border dark:border-slate-800 lg:mb-8 p-2 rounded-md bg-base-100 dark:bg-slate-900">
      <div className="lg:col-span-6 col-span-12">
        <div className="w-full lg:min-h-full">
          {post.imageUrl && post.imageUrl.trim() !== "" && (
            <LazyLoad height={200} offset={100} once>
              <img
                src={`${apiUrl}${imageUrl}`}
                alt={post.title}
                className={`lazy-image ${
                  loaded ? "loaded" : ""
                } w-full lg:min-h-full rounded-md`}
                onLoad={() => setLoaded(true)}
              />
            </LazyLoad>
          )}
        </div>
      </div>
      <div className="lg:col-span-6 col-span-12">
        <div key={_id} className="lg:space-y-2">
          <h2 className="lg:text-xl text-lg font-bold text-base-content/70 dark:text-gray-500">
            {title.slice(0, 60)}...
          </h2>

          <p className="text-base-content/70 dark:text-gray-500 italic text-sm flex items-center flex-wrap gap-2">
            <span className="font-bold">
              <FaUserAlt />
            </span>{" "}
            <span className="font-bold">{author}</span>{" "}
            <span className="font-bold">|| Published on:</span>{" "}
            {new Date(createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          <div className="flex items-center gap-2">
            <span className="text-base-content/70 dark:text-gray-500">
              <FaLayerGroup />
            </span>
            <span className="font-bold text-base-content/70 dark:text-gray-500 italic text-sm">
              {category ? getCategoryNames(category) : "No categories"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-base-content/70 dark:text-gray-500">
              <FaTags />
            </span>
            <span className="font-bold text-base-content/70 dark:text-gray-500 italic text-sm">
              {tag ? getTagNames(tag) : "No tags"}
            </span>
          </div>

          <div className="text-gray-500 flex items-center gap-2">
            <p
              dangerouslySetInnerHTML={{
                __html: content
                  ? content.slice(0, 300) + "..."
                  : "No content to display...",
              }}
            />
          </div>

          <div className="text-base-content dark:text-gray-500">
            <p className="text-base-content dark:text-gray-500">
              <span className="text-base-content/70 font-bold dark:text-gray-500 underline italic">
                Post Summary :
              </span>{" "}
              &nbsp;
              {summary ? summary : autoSummary}
            </p>
          </div>

          <div className="mt-1 flex justify-end space-x-4">
            <BookmarkButton
              postId={_id}
              userId={loaded ? loggedInUserId : null}
              initialBookmarked={false}
            />
            <Link to={`/single-blog-post/${_id}`} className="m-0">
              <Button
                variant="outline"
                label="Read More"
                className="btn btn-sm"
                icon={<FaArrowCircleRight />}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
