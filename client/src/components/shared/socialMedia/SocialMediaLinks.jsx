import SocialMediaLinkCard from "./SocialMediaLinkCard";
import useFetchCollection from "../../../hooks/useFetchCollection";
import { useMemo } from "react";

const SocialMediaLinks = () => {
  // Memoize query parameters to avoid unnecessary re-renders
  const queryParams = useMemo(() => ({ status: "active" }), []);
  const { data, loading, error } = useFetchCollection(
    "socialLinks",
    queryParams
  );
  console.log("Footer links", data);
  if (loading) <div> loading...</div>;
  if (error) <div>Error: {error.message}</div>;
  if (data.length === 0) return null; // Return nothing if no quotes

  return (
    <>
      <div className="flex space-x-4">
        {data.length > 0
          ? data.map((links) => (
              <SocialMediaLinkCard
                key={links._id}
                platForm={links.platform}
                url={links.url}
                iconName={links.icon}
              />
            ))
          : ""}
      </div>
    </>
  );
};

export default SocialMediaLinks;
