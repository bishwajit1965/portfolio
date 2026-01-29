import { useEffect, useState } from "react";

import BookmarkedPostCard from "./BookmarkedPostCard";
import { Helmet } from "react-helmet-async";
import Loader from "../../components/loader/Loader";
import PageTitle from "../pageTitle/PageTitle";

const BookmarksPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);

  const baseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${baseUrl}/blog/bookmarks`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setBookmarks(data);
        } else {
          const errorData = await response.json();
          alert(errorData.message || "Failed to fetch bookmarks.");
        }
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
        alert("Failed to fetch bookmarks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [baseUrl]);

  return (
    <div className="lg:max-w-7xl mx-auto lg:p-0 p-2 mb-10">
      <Helmet>
        <title>Web-tech-services || Bookmarked</title>
      </Helmet>
      {loading && <Loader />}
      <PageTitle
        title="Bookmarked"
        decoratedText="Blog Posts"
        dataLength={bookmarks ? bookmarks.length : 0}
        subtitle="Discover my journey in web development, explore the projects I've crafted, and let's build something amazing together."
      />

      {bookmarks.length > 0 ? (
        <div className="grid lg:grid-cols-12 grid-cols-1 gap-4 justify-between">
          {bookmarks.map((post) => (
            <BookmarkedPostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-10">
          No bookmarks available.
        </div>
      )}
    </div>
  );
};

export default BookmarksPage;
