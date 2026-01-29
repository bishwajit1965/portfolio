import { FaComment, FaEye, FaLink } from "react-icons/fa6";
import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useEffect, useState } from "react";

import CommentsForm from "../comments/CommentsForm";
import CommentsList from "../comments/CommentsList";
import { FaHome } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import LikeButton from "./LikeButton";
import Loader from "../loader/Loader";
import PageTitle from "../../pages/pageTitle/PageTitle";
import RelatedCategoryPostsModal from "./RelatedCategoryPostsModal";
import SectionTitle from "../sectionTitle/SectionTitle";
import SocialShare from "../socialLinkShare/SocialShare";
import api from "../../services/commentsApi";
import useAuth from "../../hooks/useAuth";
import Button from "../buttons/Button";

const SingleBlogPost = () => {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const baseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
  const { postId } = useParams();
  const { post } = useLoaderData();
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [responseSuccessMessage, setResponseSuccessMessage] = useState("");
  const [responseErrorMessage, setResponseErrorMessage] = useState("");
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategoryIds, setCurrentCategoryIds] = useState([]);

  const handleOpenModal = () => {
    console.log("Opening related post modal"); // Debug log
    setCurrentCategoryIds(post.category || []); // Ensure category is set
    setIsModalOpen(true); // Set the modal to open
  };

  const handleCloseModal = () => {
    console.log("Closing related post modal");
    setIsModalOpen(false);
  };

  // Fetch categories when the component mounts
  useEffect(() => {
    let isMounted = true; //Flag to track if the component is mounted
    setLoading(true);

    const fetchData = async () => {
      try {
        const categoryResponse = await fetch(`${baseUrl}/categories`);
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
            })),
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
  }, [baseUrl]);

  // Fetch tags when the component mounts
  useEffect(() => {
    let isMounted = true; //Flag to track if the component is mounted
    setLoading(true);

    const fetchData = async () => {
      try {
        const tagResponse = await fetch(`${baseUrl}/tags`);
        if (!tagResponse.ok) {
          throw new Error(`HTTP error! Status: ${tagResponse.status}`);
        }
        const tagData = await tagResponse.json();

        // Conditionally wait until component is loaded and then sets the data
        if (isMounted) {
          setTags(
            tagData.map((tag) => ({
              value: tag._id,
              label: tag.name,
            })),
          );
        }
      } catch (error) {
        console.error("Error fetching posts and tags:", error);
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
  }, [baseUrl]);

  // Fetch existing comments when component mounts
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await api.get(`/comments/${postId}`);
        setComments(response?.data?.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [postId]);

  console.log("Comments fetched in single blog post", comments);
  console.log("Post Id", postId);

  // Like related code
  useEffect(() => {
    const storedToken = localStorage.getItem("jwt");
    if (!storedToken) {
      navigate("/login", { state: { from: location } });
    } else {
      setToken(storedToken);
    }
  }, [navigate, location]);

  if (!token) {
    return <p className="text-center">Returning to login page...</p>;
  }

  // Manage add comment button to redirect if not logged in
  const handleCommentButtonClick = () => {
    if (!isLoggedIn) {
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      navigate("/login");
    } else {
      setShowCommentForm(!showCommentForm);
    }
  };

  const handleAddComment = async (newComment) => {
    newComment.postId = postId; // Add postId to comment data

    try {
      const response = await api.post("/comments", newComment); // No need to specify headers again
      const addedComment = response.data;
      if (addedComment) {
        // Re-fetch comments to ensure UI is updated
        const updatedComments = await api.get(`/comments/${postId}`);
        setComments(updatedComments?.data?.data);
        setResponseSuccessMessage(addedComment?.message);
        setShowCommentForm(false);
        setTimeout(() => {
          setResponseSuccessMessage("");
        }, 3000);
      }
    } catch (error) {
      console.error("Failed to add comment:", error);
      setResponseErrorMessage(error.message + "Token expired .Please login");
      setTimeout(() => {
        setResponseErrorMessage("");
      }, 3000);
      throw error; // Allow caller to handle error
    }
  };

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

  // Helper function to map tag IDs to tag names
  const getTagNames = (tagIds) => {
    if (!Array.isArray(tagIds) || tagIds.length === 0) return "No categories";

    if (!tags.length) return "";

    return tagIds
      .map((id) => {
        const tag = tags.find((cat) => cat.value === id);
        return tag ? tag.label : "";
      })
      .join(", ");
  };

  return (
    <div className="lg:max-w-7xl mx-auto lg:p-0 p-2">
      <Helmet>
        <title>Web-tech-services || Single Blog</title>
      </Helmet>
      {/*Loader Spinner */}
      {loading && <Loader />}
      <PageTitle
        title="Blog Post"
        decoratedText="Details"
        subtitle=" Blog posts data displayed here."
      />
      <div className="grid lg:grid-cols-12 justify-between gap-4 mb-8">
        <div className="lg:col-span-12 col-span-12">
          {post.imageUrl && post.imageUrl.trim() !== "" && (
            <img
              src={`${apiUrl}${post.imageUrl}`}
              alt={post.title}
              className="rounded-md shadow-md w-full object-cover h-72 lg:h-[480px] object-center"
            />
          )}
        </div>
        <div className="lg:col-span-12 col-span-12 lg:p-4 p-2 lg:space-y-2 space-y-1 border-slate-200 lg:border rounded-md shadow-sm dark:border-slate-700">
          <h2 className="text-3xl font-bold capitalize text-slate-500 dark:text-slate-400 lg:mb-6 mb-4">
            {post?.title}
          </h2>
          <p className="italic text-slate-500 dark:text-slate-400 font-bold">
            Author: {post.author}
          </p>

          <p className="italic text-slate-500 dark:text-slate-400 font-bold">
            Published on:{" "}
            {new Date(post?.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          {/* Display Categories */}
          <div className="mr-2 lg:flex grid items-center">
            <span className="font-bold text-slate-500 dark:text-slate-400">
              Categories:&nbsp;
            </span>
            <span className="font-bold lg:flex grid items-center text-slate-500 dark:text-slate-400">
              {post?.category
                ? getCategoryNames(post?.category)
                : "No categories"}
            </span>
          </div>

          {/* Display Tags */}
          <div className=" lg:flex grid items-center">
            <span className="font-bold text-slate-500 dark:text-slate-400">
              Tags:&nbsp;
            </span>{" "}
            <span className="font-bold lg:flex grid items-center text-slate-500 dark:text-slate-400">
              {post.tag ? getTagNames(post.tag) : "No tags"}
            </span>
          </div>
          <p
            dangerouslySetInnerHTML={{
              __html: post?.content
                ? post?.content
                : "No content to display...",
            }}
            className="text-slate-500 dark:text-slate-400"
          ></p>
          <div className="lg:flex grid items-center lg:space-x-4 space-x-0 gap-2 lg:py-8 py-4">
            <Link to="/blog-posts" className="p-0 m-0">
              <Button
                type="submit"
                label="Go Blogs Page"
                className="btn btn-sm lg:w-44 w-full"
                icon={<FaHome />}
                variant="outline"
              />
            </Link>

            <Button
              type="submit"
              label="View Related Posts"
              icon={<FaEye />}
              variant="outline"
              onClick={handleOpenModal}
              className="btn btn-sm lg:w-48 w-full"
            />
            <div className="">
              <LikeButton postId={postId} token={token} />
            </div>
          </div>

          {/* Button to toggle related post modal */}
          <div className="">
            {isModalOpen && (
              <RelatedCategoryPostsModal
                categoryIds={currentCategoryIds}
                onClose={handleCloseModal}
              />
            )}
          </div>
        </div>
      </div>

      {/* Add comment section */}
      <SectionTitle
        title="Readers'"
        subtitle="If you are not logged in, you will be redirected to login page. After login, you will be taken to the blog post you were in. Now click the span Add Comment button, a comment box will open and you will be able to add comment now."
        decoratedText="Comments"
        dataLength={comments ? comments.length : 0}
        icon={FaComment}
      />

      <div className="p-2">
        <div className="my-2">
          <CommentsList
            comments={comments}
            onReply={(replyToId) => console.log("Reply to:", replyToId)}
          />
        </div>
        <div className="">
          <div className="mt-6 lg:flex grid items-center lg:space-x-4 lg:space-y-0 space-y-4 lg:pt-4">
            <Button
              onClick={handleCommentButtonClick}
              label={showCommentForm ? "Cancel" : "Add Comment"}
              className="btn btn-sm lg:w-40 w-full"
              icon={<FaComment />}
              variant="outline"
            />
            <Link to="/blog-posts" className="m-0 p-0">
              <Button
                type="button"
                icon={<FaHome />}
                variant="outline"
                label="Blogs Page"
                className="btn btn-sm lg:w-36 w-full"
              />
            </Link>
          </div>

          <div className="lg:mt-5 mt-2 w-full bg-base-200 rounded-md shadow-md">
            {/* Display message */}
            <div className="lg:max-w-3xl mx-auto lg:px-6">
              {responseSuccessMessage && (
                <div className="lg:mb-4 mb-2 text-blue-800 font-bold lg:text-xl animate-pulse">
                  {responseSuccessMessage}
                </div>
              )}{" "}
              {responseErrorMessage && (
                <div className="lg:mb-4 mb-2 text-red-800 font-bold lg:text-xl animate-pulse">
                  {responseErrorMessage}
                </div>
              )}
            </div>
            <div className="lg:mb-8">
              {showCommentForm && (
                <CommentsForm
                  postId={postId}
                  onSubmitComment={handleAddComment}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Social link share */}
      <div className="">
        <div className="">
          <h3 className="lg:text-xl font-bold flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <FaLink className="dark:text-slate-400 text-slate-600" />
            Share on Social Media
          </h3>
        </div>
        <div className="lg:flex grid dark:bg-slate-800 bg-base-200 lg:py-10 py-4 rounded-md shadow">
          <SocialShare blogId={postId} title={post.title} />
        </div>
      </div>
    </div>
  );
};

export default SingleBlogPost;
