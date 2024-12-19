import { useEffect, useState } from "react";

import LatestPostCard from "./LatestPostCard";
import SectionTitle from "../../sectionTitle/SectionTitle";

const RandomLatestPosts = () => {
  const baseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${baseUrl}/blogPosts/random-latest`)
      .then((response) => response.json())
      .then((data) => setPosts(data.posts))
      .catch((error) => console.error("Error fetching posts:", error));
  }, [baseUrl]);

  return (
    <div className="">
      <div className="bg-base-300 rounded-md">
        <SectionTitle
          title="Latest Random"
          decoratedText="Blog Posts"
          subtitle="Discover my journey in web development, explore the projects I've crafted, and let's build something amazing together."
        />
      </div>
      <div className="grid lg:grid-cols-12 grid-cols-1 gap-4 justify-between">
        {posts
          ? posts.map((latestPosts) => (
              <LatestPostCard key={latestPosts._id} latestPosts={latestPosts} />
            ))
          : "No latest posts found."}
      </div>
    </div>
  );
};

export default RandomLatestPosts;
