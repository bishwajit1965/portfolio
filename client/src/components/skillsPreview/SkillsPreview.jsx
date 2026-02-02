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
    <section className="max-w-7xl mx-auto lg:px-4 px-2">
      <SectionTitle
        title="My"
        decoratedText="Skills"
        subtitle="A quick look at the tools and technologies I work with."
        icon={FaCheckCircle}
      />

      {loading ? (
        <SkillsSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {data.slice(0, 6).map((skill) => (
            <div
              key={skill._id}
              className="border dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 shadow hover:shadow-lg transition"
            >
              {/* Skill name + level */}
              <h3 className="flex items-center gap-2 font-semibold text-lg text-gray-800 dark:text-gray-200">
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
                      className="text-xs px-2 py-1 border rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
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

// import { useMemo } from "react";
// import useFetchCollection from "../../hooks/useFetchCollection";
// import {
//   FaCheck,
//   FaCheckCircle,
//   FaCodepen,
//   FaCog,
//   FaList,
// } from "react-icons/fa";
// import SectionTitle from "../sectionTitle/SectionTitle";

// const SkillsSkeleton = () => (
//   <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
//     {[...Array(8)].map((_, i) => (
//       <div key={i} className="h-16 rounded-lg bg-gray-200 animate-pulse" />
//     ))}
//   </div>
// );

// const SkillsPreview = () => {
//   const queryParams = useMemo(() => ({ status: "active" }), []);
//   const { data, loading, error } = useFetchCollection("skills", queryParams);

//   if (error) return <div>Error: {error.message}</div>;

//   if (!data || data.length === 0) return null; // Return nothing if no quotes

//   return (
//     <section className="max-w-7xl mx-auto text-base-content">
//       <SectionTitle
//         title="Here are"
//         decoratedText="My Skills"
//         subtitle="Discover my journey in web development, explore the projects I've crafted, and let's build something amazing together."
//         icon={FaCodepen}
//       />

//       {loading ? (
//         <SkillsSkeleton />
//       ) : (
//         <div className="grid lg:grid-cols-12 md:grid-cols-4 gap-4 mt-4">
//           {data.slice(0, 8).map((skill) => (
//             <div
//               key={skill._id}
//               className="lg:col-span-3 md:col-span-4 col-span-12 border dark:border-base-content rounded-lg text-center shadow-md hover:shadow-lg bg-base-100 dark:text-gray-500 space-y-4 dark:bg-gray-800"
//             >
//               <div className="bg-base-200 dark:bg-gray-900 lg:px-4 px-2 py-2">
//                 <h2 className="lg:text-[15px] text-[15px] font-bold dark:text-gray-400 flex items-center gap-2 capitalize">
//                   <FaCheckCircle size={16} /> {skill.skillName}
//                 </h2>
//               </div>
//               <div className="px-4 space-y-2">
//                 <h3 className="font-bold">{skill.level}</h3>
//                 <p className="text-sm">{skill.experience}</p>
//               </div>
//               <div className="px-4 space-y-4 pb-4">
//                 <div className="">
//                   <h2 className="font-bold flex items-center gap-2 text-base-content/70 dark:text-gray-400">
//                     <FaCog size={14} /> Proficient in Tools
//                   </h2>
//                   <div className="flex flex-wrap gap-2 p-2">
//                     {skill?.tools?.map((t) => (
//                       <div key={t} className="space-y-2">
//                         <span className="border dark:border-base-content p-1 dark:bg-base dark:text-gray-500 rounded-md shadow-sm flex items-center gap-1 text-[14px]">
//                           <FaCheck size={10} className="test-base-200" /> {t}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="dark:text-gray-500">
//                   <h2 className="font-bold flex items-center gap-2 text-base-content/70 dark:text-gray-400">
//                     <FaList size={14} /> Specializes in Category
//                   </h2>
//                   <div className="flex flex-wrap gap-2 p-2">
//                     {skill?.category?.map((c) => (
//                       <div key={c} className="space-y-2">
//                         <span className="border dark:border-base-content px-2 py-1 dark:bg-base dark:text-gray-500 rounded-md shadow-sm flex items-center gap-1 text-sm">
//                           <FaCheck size={10} className="test-base-200" /> {c}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// };

// export default SkillsPreview;
