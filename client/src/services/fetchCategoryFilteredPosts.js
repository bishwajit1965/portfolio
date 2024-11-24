const fetchCategoryFilteredPosts = async (categoryIds) => {
  if (!categoryIds || categoryIds.length === 0) {
    console.warn("No categories provided for filtering.");
    return [];
  }

  const query = categoryIds.join(",");
  try {
    const response = await fetch(
      `http://localhost:5000/api/blogPosts/filter?categories=${query}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch related posts");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default fetchCategoryFilteredPosts;
