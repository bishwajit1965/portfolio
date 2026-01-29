import { useEffect, useState } from "react";

import ComingSoonCard from "./ComingSoonCard";
import { Helmet } from "react-helmet-async";
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
          (post) => post.status === "draft" && post.willPublishAt > now,
        );
        setPosts(publishedPosts);
      })
      .catch((error) =>
        console.error("Error fetching coming soon posts:", error),
      )
      .finally(() => setLoading(false));
  }, [baseUrl, now]);

  return (
    <div className="lg:max-w-7xl mx-auto lg:p-0 p-2 mb-10">
      <Helmet>
        <title>Web-tech-services || Coming Soon</title>
      </Helmet>
      {loading && <Loader />}

      <PageTitle
        title="Posts"
        subtitle="Hope you will enjoy the posts very much as those are informative and instructive as well."
        decoratedText={`${"Coming Soon: "}${posts?.length}`}
      />

      <div className="" data-cy="coming-soon-posts">
        {posts.length === 0 ? (
          <p className="text-center font-bold text-red-600">
            No upcoming posts at this moment.
          </p>
        ) : (
          posts.map((post) => <ComingSoonCard key={post._id} post={post} />)
        )}
      </div>
    </div>
  );
};

export default ComingSoon;
