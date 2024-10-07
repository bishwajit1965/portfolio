import InspirationalQuoteCard from "./InspirationalQuoteCard";
import useFetchCollection from "../../../hooks/useFetchCollection";
import { useMemo } from "react";

const InspirationalQuoteSection = () => {
  const queryParams = useMemo(() => ({ status: "active" }), []);
  const { data, loading, error } = useFetchCollection(
    "inspirational-quote",
    queryParams
  );

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center">{error.message}</div>;

  if (data.length === 0) return null; // Return nothing if no quotes

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1">Inspirational Quotes</h2>

      {data.length > 0
        ? data
            .slice(0, 3)
            .map((quote) => (
              <InspirationalQuoteCard key={quote._id} quote={quote} />
            ))
        : "No data available!"}
    </div>
  );
};

export default InspirationalQuoteSection;
