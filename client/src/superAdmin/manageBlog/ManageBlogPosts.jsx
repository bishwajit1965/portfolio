import { useEffect, useState } from "react";

import BlogsTable from "./BlogsTable";
import { FaPlusCircle } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import { NavLink } from "react-router-dom";
import SuperAdminPageTitle from "../superAdminPageTitle/SuperAdminPageTitle";
import Swal from "sweetalert2";
import UpdateBlogModal from "./UpdateBlogModal";

const ManageBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedBlogPost, setSelectedBlogPost] = useState(null);

  // Fetch blog posts on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setErrorMessage("user is not authenticated.");
          return;
        }
        const headers = { Authorization: `Bearer ${token}` };

        const [blogPostsResponse, categoriesResponse, tagsResponse] =
          await Promise.all([
            fetch("http://localhost:5000/api/blogPosts", {
              headers,
            }),
            fetch("http://localhost:5000/api/categories", {
              headers,
            }),
            fetch("http://localhost:5000/api/tags", { headers }),
          ]);

        // Blog posts fetched
        if (blogPostsResponse.ok) {
          const blogPostsData = await blogPostsResponse.json();
          setBlogPosts(blogPostsData); // Save the fetched categories
        } else {
          const errorResponse = await blogPostsResponse.json();
          setErrorMessage(
            errorResponse.message || "Failed to fetch blog posts"
          );
        }

        // Categories fetched
        if (categoriesResponse.ok) {
          const categoryData = await categoriesResponse.json();
          const formattedCategories = categoryData.map((category) => ({
            value: category._id,
            label: category.name,
          }));
          setCategories(formattedCategories);
        } else {
          const errorResponse = await categoriesResponse.json();
          setErrorMessage(
            errorResponse.message || "Failed to fetch categories."
          );
        }

        // Tags fetched
        if (tagsResponse.ok) {
          const tagsData = await tagsResponse.json();
          const formattedTags = tagsData.map((tag) => ({
            value: tag._id,
            label: tag.name,
          }));
          setTags(formattedTags);
        } else {
          const errorResponse = await tagsResponse.json();
          setErrorMessage(errorResponse.message || "Failed to fetch tags.");
        }
      } catch (error) {
        setErrorMessage("Something went wrong. Please try again.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/categories", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          // Assuming data comes as an array of objects like [{ id: 1, name: 'Category1' }]
          const formattedCategories = data.map((category) => ({
            value: category._id,
            label: category.name,
          }));
          setCategories(formattedCategories);
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Handlers for edit and delete actions (to be implemented)
  const handleEditBlogPost = (blog) => {
    // Logic for opening modal and editing category
    console.log("Edit button clicked for:", blog);
    setSelectedBlogPost(blog);
    setShowUpdateModal(true);
  };

  const handleUpdateBlogPost = async (updatedBlogPost) => {
    try {
      console.log("Updating blog post ID:", updatedBlogPost._id); // Debugging
      // Remove the _id field from the updatedBlogPost object
      const { _id, ...dataWithoutId } = updatedBlogPost;

      const response = await fetch(
        `http://localhost:5000/api/blogPosts/${updatedBlogPost._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(dataWithoutId),
        }
      );
      const data = await response.json(); // Parse the JSON
      console.log("Blog post response", data);

      if (!response.ok) {
        throw new Error("Error updating blog post");
      }

      if (response.ok) {
        // Show a success message with Swal
        Swal.fire({
          title: "Success!",
          text: "Blog post updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });

        setShowUpdateModal(false); // Close modal

        // Force fetch all blog posts again to update the UI
        const fetchBlogPostsResponse = await fetch(
          "http://localhost:5000/api/blogPosts",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (fetchBlogPostsResponse.ok) {
          const updatedBlogPosts = await fetchBlogPostsResponse.json();
          setBlogPosts(updatedBlogPosts);
        }
      } else {
        const errorResponse = await response.json();
        Swal.fire({
          title: "Error!",
          text: `Error: ${errorResponse.message}`,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error updating blog post:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while updating the blog post.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleDeleteBlogPost = async (postId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (confirmed) {
      try {
        await fetch(`http://localhost:5000/api/blogPosts/${postId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBlogPosts((prevBlogPosts) =>
          prevBlogPosts.filter((blog) => blog._id !== postId)
        );
        alert("Blog post deleted successfully!");
      } catch (error) {
        console.error("Encountered an error!", error);
      }
    }
  };

  if (loading) return <LoadingSpinner color="blue-800" />;
  if (errorMessage)
    return <div className="text-center text-red-500">{errorMessage}</div>;
  return (
    <>
      <Helmet>
        <title>Web-tech-services || Manage Blogs</title>
      </Helmet>

      <div>
        <SuperAdminPageTitle
          title="Manage"
          decoratedText="Blog Posts"
          subtitle="Super admin can only manage all blog posts"
        />

        <div className="flex lg:justify-start items-center justify-between lg:mb-4 bg-base-200 p-2 shadow-sm">
          <NavLink to="/super-admin/add-blog-post" className="m-0">
            <button className="btn btn-xs btn-primary">
              <FaPlusCircle />
              Add Blog Post
            </button>
          </NavLink>
          <h2 className="text-xl font-bold text-center lg:ml-72">
            Blog posts List:{" "}
            {blogPosts.length > 0 ? blogPosts.length : "No post uploaded yet"}
          </h2>
        </div>

        <div className="p-2">
          {/* Pass blog post to BlogPostTable */}
          <BlogsTable
            blogPosts={blogPosts}
            categories={categories}
            tags={tags}
            onEdit={handleEditBlogPost}
            onDelete={handleDeleteBlogPost}
          />

          {showUpdateModal && selectedBlogPost && (
            <UpdateBlogModal
              blog={selectedBlogPost}
              categories={categories}
              tags={tags}
              onClose={() => setShowUpdateModal(false)}
              onUpdate={handleUpdateBlogPost}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ManageBlogPosts;
