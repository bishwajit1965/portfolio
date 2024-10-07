import HobbyCard from "./HobbyCard";
import useFetchCollection from "../../../hooks/useFetchCollection";
import { useMemo } from "react";

const HobbySection = () => {
  const queryParams = useMemo(() => ({ status: "active" }), []);
  const { data, loading, error } = useFetchCollection("hobby", queryParams);
  console.log("Hobbies:", data);
  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center">{error.message}</div>;
  if (data.length === 0) return null;
  return (
    <>
      <h2 className="text-2xl font-bold mb-2 dark:text-green-400">
        My hobbies
      </h2>
      <div className="border border-slate-300 dark:border-slate-700 space-y-2 rounded-md p-3 shadow-md">
        {data.length > 0
          ? data
              .slice(0, 5)
              .map((hobby) => <HobbyCard key={hobby._id} hobby={hobby} />)
          : ""}
      </div>
    </>
  );
};

export default HobbySection;
