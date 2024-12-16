import { FaArrowCircleRight, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";

import CTAButton from "../ctaButton/CTAButton";
import Loader from "../loader/Loader";
import fetchCategoryFilteredPosts from "../../services/fetchCategoryFilteredPosts";

const RelatedCategoryPostsModal = ({ categoryIds, onClose }) => {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  console.log("related posts:", relatedPosts);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true); // Start loading
      try {
        if (categoryIds) {
          const posts = await fetchCategoryFilteredPosts(categoryIds);
          setRelatedPosts(posts);
        }
      } catch (error) {
        console.error("Failed to fetch related posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [categoryIds]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">
            Category Related Blog Posts:{" "}
            {relatedPosts ? relatedPosts.length : ""}
          </h2>

          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 btn btn-sm"
          >
            <FaTimes />
          </button>
        </div>
        <div className="grid lg:grid-cols-12 grid-cols-1 lg:gap-4 gap-2 justify-between lg:max-w-7xl">
          {loading ? (
            <Loader />
          ) : relatedPosts.length > 0 ? (
            relatedPosts.map((post) => (
              <div
                key={post._id}
                className="lg:col-span-3 relative col-span-12 shadow-md rounded-md dark:bg-slate-800 dark:text-base-300"
              >
                <a href={`/single-blog-post/${post._id}`}>
                  <img
                    src={`${apiUrl}${post.imageUrl}`}
                    alt=""
                    className="h-32 w-full rounded-t-md mt-[-25px]"
                  />
                  <div className="mb-4 px-2">
                    <h3 className="text-base font-bold">
                      {post.title.substring(0, 62)}
                    </h3>
                    <p>{post.content.substring(0, 120)}...</p>
                  </div>
                  <div className="flex absolute bottom-1 items-center">
                    <CTAButton
                      label="Read More"
                      className="flex btn btn-sm items-center ml-2"
                      icon={<FaArrowCircleRight />}
                    />
                  </div>
                </a>
              </div>
            ))
          ) : (
            <p>No related posts found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RelatedCategoryPostsModal;
