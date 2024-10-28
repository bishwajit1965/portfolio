import { useEffect, useState } from "react";

import BlogPostCard from "./BlogPostCard";
import Pagination from "./Pagination"; // Import the Pagination component
import Select from "react-select";

const BlogPosts = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);

  // Fetch all blog posts and categories
  useEffect(() => {
    let isMounted = true; //Flag to track if the component is mounted
    setLoading(true);

    const fetchData = async () => {
      try {
        const postResponse = await fetch("http://localhost:5000/api/blogPosts");
        if (!postResponse.ok) {
          throw new Error(`HTTP error! Status: ${postResponse.status}`);
        }
        const postData = await postResponse.json();

        const categoryResponse = await fetch(
          "http://localhost:5000/api/categories"
        );
        if (!categoryResponse.ok) {
          throw new Error(`HTTP error! Status: ${categoryResponse.status}`);
        }
        const categoryData = await categoryResponse.json();

        // Conditionally wait until component is loaded and then sets the data
        if (isMounted) {
          setPosts(postData);
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

  // Filter posts by search query and category
  const filteredPosts = posts.filter((post) => {
    const matchSearch = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchCategory =
      !selectedCategory || post.category.includes(selectedCategory.value);
    return matchSearch && matchCategory;
  });

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

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

  return (
    <div className="container mx-auto mt-4">
      {/* Spinner */}
      <div className="text-center">
        {loading && (
          <span className="text-center loading loading-spinner loading-lg  text-success"></span>
        )}
      </div>

      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>

      {/* Search */}
      <div className="flex justify-between items-center mb-4">
        <div className="">
          <h2 className="font-bold">Filter by Title</h2>
          <input
            type="text"
            className="input input-bordered w-72 max-w-xl p-4 input-sm"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div className="">
          <h2 className="font-bold">Filter by Category</h2>
          <Select
            className="w-64"
            placeholder="Filter by category"
            value={selectedCategory}
            onChange={setSelectedCategory}
            options={categories}
            isClearable
          />
        </div>
      </div>

      {/* Blog Posts */}
      <div className="grid grid-cols-1  gap-6">
        {currentPosts.length > 0 ? (
          currentPosts.map((post) => (
            <BlogPostCard
              key={post._id}
              post={post}
              getCategoryNames={getCategoryNames}
            />
          ))
        ) : (
          <p>No blog posts found.</p>
        )}
      </div>

      {/* Pagination */}
      <Pagination
        totalPosts={filteredPosts.length}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default BlogPosts;
