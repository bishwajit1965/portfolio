import "./BlogPostCard.css";

import { FaArrowCircleRight } from "react-icons/fa";
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";
import { useState } from "react";

const BlogPostCard = ({ post, getCategoryNames }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="grid grid-cols-12 gap-6 justify-between border dark:border-slate-800 lg:p-2 p-2 shadow-lg rounded-md">
      <div className="lg:col-span-6 col-span-12">
        {post.imageUrl && post.imageUrl.trim() !== "" && (
          <LazyLoad height={200} offset={100} once>
            <img
              src={`http://localhost:5000${post.imageUrl}`}
              alt={post.title}
              className={`lazy-image ${
                loaded ? "loaded" : ""
              } rounded-md shadow-md w-full h-full`}
              onLoad={() => setLoaded(true)}
            />
          </LazyLoad>
        )}
      </div>
      <div className="lg:col-span-6 col-span-12 bg-sky-1000 rounded-md border border-rounded-md border-slate-200 dark:border-slate-800 shadow-sm">
        <div key={post._id} className="p-2">
          <p>{post._id}</p>
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p className="text-gray-500">by {post.author}</p>
          <p className="text-gray-500">
            Published on: {new Date(post.createdAt).toLocaleDateString()}
          </p>

          <p className="mt-2">{post.content.slice(0, 100)}...</p>
          {/* Display Category Names */}
          <p className="text-sm text-gray-600">
            <span className="font-bold text-base">Categories:</span>{" "}
            {post.category ? getCategoryNames(post.category) : "No categories"}
          </p>
          <div className="mt-4">
            <Link
              to={`/single-blog-post/${post._id}`}
              className="text-blue-500 m-0"
            >
              <button className="btn btn-sm btn-primary shadow-md dark:btn-success">
                Read more <FaArrowCircleRight className="ml-1" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
