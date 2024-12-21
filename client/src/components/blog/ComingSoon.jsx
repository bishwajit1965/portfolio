import { useEffect, useState } from "react";

import ComingSoonCard from "./ComingSoonCard";
import Loader from "../loader/Loader";
import PageTitle from "../../pages/pageTitle/PageTitle";

const ComingSoon = () => {
  const baseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const now = new Date().toISOString();

  // Fetch "Coming Soon" posts
  useEffect(() => {
    fetch(`${baseUrl}/coming-soon/blogPosts/coming-soon`)
      .then((response) => response.json())
      .then((data) => {
        const publishedPosts = data.filter(
          (post) => post.status === "draft" && post.willPublishAt > now
        );
        setPosts(publishedPosts);
      })
      .catch((error) =>
        console.error("Error fetching coming soon posts:", error)
      )
      .finally(() => setLoading(false));
  }, [baseUrl, now]);

  return (
    <div className="lg:pt-10">
      {loading && <Loader />}

      <PageTitle
        title="Posts"
        subtitle="Hope you will enjoy the posts very much as those are informative and instructive as well."
        decoratedText={`${"Coming Soon: "}${posts?.length}`}
      />
      <h2 className="text-center text-2xl font-bold dark:text-gray-500">
        Coming Soon Posts
      </h2>

      <div className="grid grid-cols-12" data-cy="coming-soon-posts">
        {posts.length > 0 ? (
          posts.map((post) => <ComingSoonCard key={post._id} post={post} />)
        ) : (
          <p>No upcoming posts at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default ComingSoon;
