import SocialLinksCard from "./SocialLinksCard";
import useFetchCollection from "../../../hooks/useFetchCollection";
import { useMemo } from "react";

const SocialLinksSection = () => {
  // Memoize query parameters to avoid unnecessary re-renders
  const queryParams = useMemo(() => ({ status: "active" }), []);
  const { data, loading, error } = useFetchCollection(
    "socialLinks",
    queryParams
  );

  if (loading) <div> loading...</div>;
  if (error) <div>Error: {error.message}</div>;

  if (data.length === 0) return null; // Return nothing if no quotes

  return (
    <>
      <h2 className="text-2xl font-bold mb-1">Social Links</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-1">
        {data.length > 0
          ? data.map((links) => (
              <SocialLinksCard
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

export default SocialLinksSection;
