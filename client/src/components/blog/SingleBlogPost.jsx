import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import CommentsSection from "../comments/CommentsSection";
import { FaComment } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import SectionTitle from "../sectionTitle/SectionTitle";
import useAuth from "../../hooks/useAuth";

const SingleBlogPost = () => {
  const { postId } = useParams();
  const { post } = useLoaderData();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Defined state to track if the comment form is shown
  const [showCommentForm, setShowCommentForm] = useState(false);
  // Check if the user is logged in
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // Fetch categories when the component mounts
  useEffect(() => {
    let isMounted = true; //Flag to track if the component is mounted
    setLoading(true);

    const fetchData = async () => {
      try {
        const categoryResponse = await fetch(
          "http://localhost:5000/api/categories"
        );
        if (!categoryResponse.ok) {
          throw new Error(`HTTP error! Status: ${categoryResponse.status}`);
        }
        const categoryData = await categoryResponse.json();

        // Conditionally wait until component is loaded and then sets the data
        if (isMounted) {
          setCategories(
            categoryData.map((category) => ({
              value: category._id,
              label: category.name,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching posts and categories:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false; //Clean up function to set the flag to false on unmount
    };
  }, []);

  // Helper function to map category IDs to category names
  const getCategoryNames = (categoryIds) => {
    if (!Array.isArray(categoryIds) || categoryIds.length === 0)
      return "No categories";

    if (!categories.length) return "";

    return categoryIds
      .map((id) => {
        const category = categories.find((cat) => cat.value === id);
        return category ? category.label : "Unknown";
      })
      .join(", ");
  };

  // Manage add comment button to redirect if not logged in
  const handleCommentButtonClick = () => {
    if (!isLoggedIn) {
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      navigate("/login");
    } else {
      setShowCommentForm(true);
    }
  };

  return (
    <>
      {/* Spinner */}
      <div className="text-center">
        {loading && (
          <span className="text-center loading loading-spinner loading-lg  text-success"></span>
        )}
      </div>
      <div className="grid lg:grid-cols-12 justify-between gap-4 mb-6">
        <div className="lg:col-span-6 col-span-12">
          {post.imageUrl && post.imageUrl.trim() !== "" && (
            <img
              src={`http://localhost:5000${post.imageUrl}`}
              alt={post.title}
              className="rounded-md shadow-md"
            />
          )}
        </div>
        <div className="lg:col-span-6 col-span-12 p-2 border-slate-300 border  rounded-md shadow-sm dark:border-slate-700">
          <p>SingleBlogPost {postId}</p>
          <h2 className="text-2xl font-bold text-slate-800 capitalize dark:text-base-200">
            {post.title}
          </h2>
          <p>Author: {post.author}</p>
          <p>Published on: {new Date(post.createdAt).toLocaleDateString()}</p>
          <p>{post.content}</p>

          {/* Display Categories */}
          <p className="text-sm text-gray-600 dark:text-base-200">
            <span className="font-bold text-base dark:text-base-200">
              Categories:
            </span>{" "}
            {post.category ? getCategoryNames(post.category) : "No categories"}
          </p>
          <div className="lg:mt-4 mt-2">
            <Link to="/blog-posts" className="m-0">
              <button className="btn btn-sm btn-primary dark:btn-success dark:text-base-200">
                <FaHome />
                Blogs Page
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* Add comment section */}
      <div className="bg-slate-200 h-[1px] mb-6 dark:bg-slate-700"></div>
      <div className="text-center">
        <SectionTitle
          title="Comments"
          subtitle="If you are not logged in, you will be redirected to login page. After login, you will be taken to the blog post you were in. Now click the span Add Comment button, a comment box will open and you will be able to add comment now."
          decoratedText="Section"
        />
      </div>
      <div>
        <div className="px-4 mt-4">
          <button
            className="btn btn-sm btn-primary dark:btn-success"
            onClick={handleCommentButtonClick}
          >
            <FaComment /> Add Comment
          </button>
        </div>
        <div className="w-full">
          {showCommentForm && <CommentsSection postId={postId} />}
        </div>
      </div>
    </>
  );
};

export default SingleBlogPost;
