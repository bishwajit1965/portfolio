import FeaturedProjectCard from "./FeaturedProjectCard";
import useFetchCollection from "../../../hooks/useFetchCollection";
import { useMemo } from "react";

const FeaturedProjectsSection = () => {
  const queryParams = useMemo(() => ({ status: "active" }), []);
  const { data, loading, error } = useFetchCollection(
    "featured-projects",
    queryParams
  );

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center">{error.message}</div>;
  if (data.length === 0) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1">Featured Projects</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 justify-between">
        {data.length > 0
          ? data
              .slice(0, 4)
              .map((project) => (
                <FeaturedProjectCard
                  key={project._id}
                  project={project}
                  data={data}
                />
              ))
          : ""}
      </div>
    </div>
  );
};

export default FeaturedProjectsSection;
