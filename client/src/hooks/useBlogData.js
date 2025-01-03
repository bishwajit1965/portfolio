import { useEffect, useState } from "react";

const useBlogData = () => {
  const baseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchData = async () => {
      try {
        const [postRes, catRes, tagRes] = await Promise.all([
          fetch(`${baseUrl}/blogPosts`),
          fetch(`${baseUrl}/categories`),
          fetch(`${baseUrl}/tags`),
        ]);

        if (!postRes.ok || !catRes.ok || !tagRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const postData = await postRes.json();
        // Filter posts according to status="published"
        const publishedPosts = postData.filter(
          (post) => post.status === "published"
        );
        const categoryData = await catRes.json();
        const tagData = await tagRes.json();

        if (isMounted) {
          setPosts(publishedPosts);
          setCategories(
            categoryData.map((cat) => ({ value: cat._id, label: cat.name }))
          );
          setTags(tagData.map((tag) => ({ value: tag._id, label: tag.name })));
        }
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 60000);
    // Set interval to refresh at every minute
    return () => {
      clearInterval(interval);
      isMounted = false;
    };
  }, [baseUrl]);

  return { loading, posts, categories, tags, error };
};

export default useBlogData;
