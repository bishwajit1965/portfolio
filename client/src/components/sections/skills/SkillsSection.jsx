import Loader from "../../loader/Loader";
import SkillCard from "./SkillCard";
import useFetchCollection from "../../../hooks/useFetchCollection";
import { useMemo } from "react";
import SectionTitle from "../../sectionTitle/SectionTitle";
import { FaCode } from "react-icons/fa";

const SkillsSection = () => {
  const queryParams = useMemo(() => ({ status: "active" }), []);
  const { data, loading, error } = useFetchCollection("skills", queryParams);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;
  if (!data || data.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-16">
      <SectionTitle
        title="My"
        decoratedText="Skills"
        subtitle="These are the technologies and tools I have mastered and actively use in projects."
        icon={FaCode}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 mt-6 lg:mt-8">
        {data.map((skill) => (
          <SkillCard key={skill._id} skill={skill} />
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
