import AchievementsCard from "./AchievementsCard";
import useFetchCollection from "../../../hooks/useFetchCollection";
import { useMemo } from "react";

const AchievementsSection = () => {
  const queryParams = useMemo(() => ({ status: "active" }), []);
  const { data, loading, error } = useFetchCollection(
    "achievements",
    queryParams
  );

  if (loading) return <div className="test-center">Loading...</div>;
  if (error) return <div className="text-center"> {error.message}</div>;

  if (data.length === 0) return null; // Return nothing if no quotes

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">My Achievements</h2>
      {data
        ? data
            .slice(0, 1)
            .map((achievement) => (
              <AchievementsCard
                key={achievement._id}
                achievement={achievement}
              />
            ))
        : "No data found!"}
    </div>
  );
};

export default AchievementsSection;
