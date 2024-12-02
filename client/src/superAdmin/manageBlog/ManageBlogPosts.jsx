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
            fetch(`${baseUrl}/blogPosts`, {
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

  const handleUpdateBlogPost = async (formData) => {
    try {
      console.log("Updating blog post ID:", formData._id);

      // Destructure formData and remove the _id
      const { _id, imageUrl, ...dataWithoutId } = formData;

      // Prepare filtered data for submission (excluding _id)
      const filteredData = {
        title: dataWithoutId.title,
        content: dataWithoutId.content,
        author: dataWithoutId.author,
        category: dataWithoutId.category,
        tag: dataWithoutId.tag,
        status: dataWithoutId.status,
      };

      let requestData;

      // If an image exists, prepare FormData
      if (imageUrl && imageUrl instanceof File) {
        const formDataWithImage = new FormData();

        // Append image file and other fields
        formDataWithImage.append("imageUrl", imageUrl);

        // Handle arrays correctly (and ensure they're not empty)
        for (const key in filteredData) {
          if (Array.isArray(filteredData[key])) {
            filteredData[key].forEach((item) =>
              formDataWithImage.append(`${key}[]`, item)
            );
          } else {
            formDataWithImage.append(key, filteredData[key]);
          }
        }

        requestData = formDataWithImage;
      } else {
        // If no image, send regular data
        requestData = filteredData;
      }

      // Prepare headers
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      // If it's not FormData, set content type as JSON
      if (!(requestData instanceof FormData)) {
        headers["Content-Type"] = "application/json";
      }

      // Make the PATCH request
      const response = await fetch(
        `${baseUrl}/blogPosts/${selectedBlogPost._id}`,
        {
          method: "PATCH",
          headers,
          body:
            requestData instanceof FormData
              ? requestData
              : JSON.stringify(requestData),
        }
      );

      // Parse response
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error updating blog post");
      }

      // Success message
      Swal.fire({
        title: "Success!",
        text: "Blog post updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });

      setShowUpdateModal(false);

      // Update local state for the updated blog post
      setBlogPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === _id ? { ...post, ...filteredData } : post
        )
      );
    } catch (error) {
      console.error("Error updating blog post:", error);

      // Display error alert
      Swal.fire({
        title: "Error!",
        text:
          error.message || "An error occurred while updating the blog post.",
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
        await fetch(`${baseUrl}/blogPosts/${postId}`, {
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
