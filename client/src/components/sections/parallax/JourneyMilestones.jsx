import JourneyMilestonesCard from "./JourneyMilestonesCard";
import SectionTitle from "../../sectionTitle/SectionTitle";
import useFetchCollection from "../../../hooks/useFetchCollection";
import { useMemo } from "react";

const JourneyMilestones = () => {
  // Memoize query parameters to avoid unnecessary re-renders
  const queryParams = useMemo(() => ({ status: "active" }), []);

  // Use the custom hook to fetch data from the "journey-milestones" collection
  const { data, loading, error } = useFetchCollection(
    "journey-milestones",
    queryParams
  );
  console.log("Fetched milestone data:", data);

  // Loading state
  if (loading) return <div>Loading...</div>;

  // Error state
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <SectionTitle
        title="Milestones in My Development Journey"
        subtitle="Discover my journey in web development, explore the projects I've crafted, and let's build something amazing together."
      />

      <div
        className="relative bg-fixed bg-center bg-cover bg-no-repeat rounded-md"
        style={{
          backgroundImage: "url('/assets/pexels-markusspiske-1972464.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50 rounded-md"></div>

        <div className="relative z-10 flex items-center justify-center h-full w-full">
          <div className="text-center text-white lg:space-y-6 space-y-4 p-4">
            {data.length > 0
              ? data.map((milestone) => (
                  <JourneyMilestonesCard
                    key={milestone._id}
                    milestone={milestone}
                  />
                ))
              : "No journey milestone data found!"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JourneyMilestones;
