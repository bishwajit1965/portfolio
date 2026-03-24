import { useMemo } from "react";
import useFetchCollection from "../../hooks/useFetchCollection";
import { FaCheckCircle } from "react-icons/fa";
import SectionTitle from "../sectionTitle/SectionTitle";

const SkillsSkeleton = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="h-20 rounded-lg bg-gray-200 animate-pulse" />
    ))}
  </div>
);

const SkillsPreview = () => {
  const queryParams = useMemo(() => ({ status: "active" }), []);
  const { data, loading, error } = useFetchCollection("skills", queryParams);

  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  if (!data || data.length === 0) return null; // Nothing to show

  return (
    <section className="max-w-7xl mx-auto">
      <SectionTitle
        title="My"
        decoratedText="Skills"
        subtitle="A quick look at the tools and technologies I work with."
        icon={FaCheckCircle}
      />

      {loading ? (
        <SkillsSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-8">
          {data.slice(0, 6).map((skill) => (
            <div
              key={skill._id}
              className="border dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 shadow hover:shadow-lg transition"
            >
              {/* Skill name + level */}
              <h3 className="flex items-center gap-2 font-semibold text-lg text-gray-800 dark:text-gray-400">
                <FaCheckCircle size={16} /> {skill.skillName}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {skill.level}
              </p>

              {/* Key tools */}
              {skill.tools?.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {skill.tools.slice(0, 4).map((tool) => (
                    <span
                      key={tool}
                      className="text-xs px-2 py-1 border dark:border-gray-700 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default SkillsPreview;
