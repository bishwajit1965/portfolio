import { FaArrowCircleRight, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";

import Loader from "../loader/Loader";
import fetchCategoryFilteredPosts from "../../services/fetchCategoryFilteredPosts";
import Button from "../buttons/Button";

const RelatedCategoryPostsModal = ({ categoryIds, onClose }) => {
  // const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const getImageSrc = (img) => {
    if (!img) return "";
    if (typeof img === "string" && img.startsWith("http")) return img;
    if (img.url) return img.url;
  };

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
      <div className="bg-base-100 dark:bg-slate-800 p-4 rounded shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="lg:text-lg text-sm font-bold">
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
        <div className="grid lg:grid-cols-12 grid-cols-1 lg:gap-4 gap-2 justify-between lg:max-w-7xl max-h-[32rem] lg:overflow-y-auto overflow-y-auto">
          {loading ? (
            <Loader />
          ) : relatedPosts?.length > 0 ? (
            relatedPosts?.map((post) => (
              <div
                key={post._id}
                className="lg:col-span-4 relative col-span-12 shadow-md rounded-md dark:bg-slate-800 dark:text-base-300 border dark:border-slate-700 min-h-46"
              >
                <a href={`/single-blog-post/${post._id}`} className="m-0 p-0">
                  <img
                    src={getImageSrc(post.imageUrl)}
                    alt=""
                    className="h-52 w-full object-fill rounded-t-md mt-[-px]"
                  />
                  <div className="mb-4 px-2">
                    <h3 className="text-xl font-bold my-4">{post.title}</h3>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: post?.content
                          ? post?.content.substring(0, 300) + "..."
                          : "No content to display...",
                      }}
                      className="text-slate-500 dark:text-slate-400 min-h-48"
                    />
                  </div>
                  <div className="flex absolute bottom-2 right-2 items-center pt-4">
                    <Button
                      variant="outline"
                      label="Read More"
                      size="sm"
                      className=""
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
