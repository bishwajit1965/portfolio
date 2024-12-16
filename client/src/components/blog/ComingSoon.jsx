import { useEffect, useState } from "react";

import ComingSoonCard from "./ComingSoonCard";

const ComingSoon = () => {
  const baseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

  const [posts, setPosts] = useState([]);

  // Fetch "Coming Soon" posts
  useEffect(() => {
    fetch(`${baseUrl}/coming-soon/blogPosts/coming-soon`)
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) =>
        console.error("Error fetching coming soon posts:", error)
      );
  }, [baseUrl]);

  return (
    <div className="lg:my-10">
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>Coming Soon {posts?.length}</h1>
        {posts.length > 0 ? (
          posts
            .slice(0, 2)
            .map((post) => <ComingSoonCard key={post._id} post={post} />)
        ) : (
          <p>No upcoming posts at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default ComingSoon;
