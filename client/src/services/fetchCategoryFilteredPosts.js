const fetchCategoryFilteredPosts = async (categoryIds) => {
  const baseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

  if (!categoryIds || categoryIds.length === 0) {
    console.warn("No categories provided for filtering.");
    return [];
  }

  const query = categoryIds.join(",");

  try {
    const response = await fetch(
      `${baseUrl}/blogPosts/filter?category=${query}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch category related posts.");
    }

    const data = await response.json();
    console.log("Fetched blog posts:", data);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default fetchCategoryFilteredPosts;
