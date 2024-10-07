import SkillCard from "./SkillCard";
import useFetchCollection from "../../../hooks/useFetchCollection";
import { useMemo } from "react";

const SkillsSection = () => {
  // Memoize query parameters to avoid unnecessary re-renders
  const queryParams = useMemo(() => ({ status: "active" }), []);

  // Use the custom hook to fetch data from the "projects" collection
  const { data, loading, error } = useFetchCollection("skills", queryParams);
  console.log("Fetched skills data:", data);

  // Loading state
  if (loading) return <div>Loading...</div>;

  // Error state
  if (error) return <div>Error: {error.message}</div>;

  if (data.length === 0) return null; // Return nothing if no quotes

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1">My Skill</h2>
      {data
        ? data
            .slice(14, 15)
            .map((skill) => <SkillCard key={skill._id} skill={skill} />)
        : ""}
    </div>
  );
};

export default SkillsSection;
