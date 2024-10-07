import TestimonialCard from "./TestimonialCard";
import useFetchCollection from "../../../hooks/useFetchCollection";
import { useMemo } from "react";

const TestimonialsSection = () => {
  // Memoize query parameters to avoid unnecessary re-renders
  const queryParams = useMemo(() => ({ status: "active" }), []);
  const { data, loading, error } = useFetchCollection(
    "testimonials",
    queryParams
  );
  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center"> {error.message}</div>;

  if (data.length === 0) return null; // Return nothing if no quotes

  return (
    <>
      <h2 className="text-2xl font-bold mb-1">Testimonials</h2>
      <div className="">
        {data
          ? data.map((testimonialData, index) => (
              <TestimonialCard key={index} testimonialData={testimonialData} />
            ))
          : ""}
      </div>
    </>
  );
};

export default TestimonialsSection;
