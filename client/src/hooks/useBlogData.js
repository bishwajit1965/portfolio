import { useEffect, useState } from "react";

const useBlogData = () => {
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
          fetch("http://localhost:5000/api/blogPosts"),
          fetch("http://localhost:5000/api/categories"),
          fetch("http://localhost:5000/api/tags"),
        ]);

        if (!postRes.ok || !catRes.ok || !tagRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const postData = await postRes.json();
        const categoryData = await catRes.json();
        const tagData = await tagRes.json();

        if (isMounted) {
          setPosts(postData);
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
    return () => {
      isMounted = false;
    };
  }, []);

  return { loading, posts, categories, tags, error };
};

export default useBlogData;
