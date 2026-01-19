import { useEffect, useState } from "react";

import { Helmet } from "react-helmet-async";
import Loader from "../../components/loader/Loader";
import PageTitle from "../pageTitle/PageTitle";
import RssPostCard from "./RssPostCard";

const RssPage = () => {
  const [rssPosts, setRssPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log("Rss posts", rssPosts);
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/api/rss") // Replace with your RSS route
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch RSS feed.");
        }
        return response.text();
      })
      .then((data) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        const items = Array.from(xmlDoc.querySelectorAll("item")).map(
          (item) => ({
            title: item.querySelector("title").textContent,
            link: item.querySelector("link").textContent,
            description: item.querySelector("description").textContent,
            pubDate: item.querySelector("pubDate").textContent,
          }),
        );
        setRssPosts(items); // Assuming your backend sends an array of posts
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching RSS feed:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="">
      <Helmet>
        <title>Web-tech-services || Rss posts</title>
      </Helmet>
      {loading && <Loader />}
      <PageTitle
        title="Rss Blog"
        decoratedText="Posts"
        dataLength={rssPosts.length}
        subtitle="All RSS Blog posts are displayed here."
      />

      <div className="grid lg:grid-cols-12 grid-cols-1 gap-4 justify-between">
        {rssPosts?.length > 0
          ? rssPosts.map((post, index) => (
              <RssPostCard key={index} post={post} />
            ))
          : "No rss post to display."}
      </div>
    </div>
  );
};

export default RssPage;
