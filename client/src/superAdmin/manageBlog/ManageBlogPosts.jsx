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
  const baseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
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
            fetch(`${baseUrl}/admin/blogPosts/admin`, {
              headers,
            }),
            fetch(`${baseUrl}/categories`, {
              headers,
            }),
            fetch(`${baseUrl}/tags`, { headers }),
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
  }, [baseUrl]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${baseUrl}/categories`, {
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
  }, [baseUrl]);

  // Handlers for edit and delete actions (to be implemented)
  const handleEditBlogPost = (blog) => {
    // Logic for opening modal and editing category
    console.log("Edit button clicked for:", blog);
    setSelectedBlogPost(blog);
    setShowUpdateModal(true);
  };

  const handleUpdateBlogPost = async (formData, hasImage) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      let requestBody;

      if (hasImage) {
        // Form data will include the image, so no need for additional adjustments
        requestBody = formData;
      } else {
        // If no image is provided, explicitly include the existing image in the request
        headers["Content-Type"] = "application/json";

        requestBody = JSON.stringify({
          title: formData.title,
          summary: formData.summary,
          content: formData.content,
          author: formData.author,
          category: formData.category || selectedBlogPost.category,
          tag: formData.tag || selectedBlogPost.tag,
          status: formData.status || selectedBlogPost.status,
          imageUrl: formData.imageUrl || selectedBlogPost.imageUrl, // Explicitly retain the existing image
          updatedAt: new Date().toISOString(),
        });
      }

      const response = await fetch(
        `${baseUrl}/blogPosts/${selectedBlogPost._id}`,
        {
          method: "PATCH",
          headers,
          body: requestBody,
        }
      );

      if (!response.ok) throw new Error("Failed to update blog post.");

      const updatedBlogPost = await response.json();

      if (updatedBlogPost) {
        // Update the local state with the new data
        const fetchBlogPosts = async () => {
          const response = await fetch(`${baseUrl}/blogPosts`);
          const data = await response.json();
          setBlogPosts(data);
        };

        await fetchBlogPosts();
      }

      Swal.fire("Success!", "Blog post updated successfully.", "success");

      setShowUpdateModal(false);
    } catch (error) {
      Swal.fire("Error!", error.message || "Update failed.", "error");
    }
  };

  const handleDeleteBlogPost = async (postId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone. Do you want to delete this blog post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // API call to delete blog post
          const response = await fetch(`${baseUrl}/blogPosts/${postId}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          // Check if the response status is not successful
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              errorData.message || "Failed to delete the blog post."
            );
          }

          // Update the UI by removing the deleted blog post
          setBlogPosts((prevBlogPosts) =>
            prevBlogPosts.filter((blog) => blog._id !== postId)
          );

          // Show success message
          Swal.fire({
            title: "Deleted!",
            text: "The blog post has been deleted successfully.",
            icon: "success",
            confirmButtonText: "OK",
          });
        } catch (error) {
          console.error("Error during deletion:", error);

          // Show error message
          Swal.fire({
            title: "Error!",
            text:
              error.message ||
              "An error occurred while deleting the blog post.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });
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
        <div className="lg:flex lg:items-start items-center justify-between lg:mb-4 bg-base-200 p-2 shadow-sm">
          <NavLink to="/super-admin/add-blog-post" className="m-0">
            <button className="btn btn-xs btn-primary">
              <FaPlusCircle />
              Add Blog Post
            </button>
          </NavLink>

          <h2 className="text-xl font-bold text-center lg:ml-">
            Blog posts List:{" "}
            <span className="text-orange-700">
              {blogPosts.length > 0 ? blogPosts.length : "No post uploaded yet"}
            </span>
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
