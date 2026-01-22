import {
  FaArrowCircleDown,
  FaEye,
  FaGithub,
  FaHome,
  FaReadme,
  FaSourcetree,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import api from "../../services/api";
import PageTitle from "../../pages/pageTitle/PageTitle";
import MiniButton from "../buttons/MiniButton";

const ProjectDetails = () => {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const baseURL = `${apiUrl}/uploads/`;
  const { projectId } = useParams();
  console.log(projectId);
  const [projectDetails, setProjectDetails] = useState({
    name: "",
    type: "",
    description: "",
  });
  console.log("Project details:", projectDetails);
  const imageUrl = `${baseURL}${projectDetails.image}`;

  console.log("Project Screenshots", projectDetails.screenshots);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await api.get(`/projects/${projectId}`);
        if (response) {
          setProjectDetails(response.data);
        } else {
          alert("No data is available.");
        }
      } catch (error) {
        console.error("Failed to fetch project", error);
      }
    };
    fetchProjectDetails();
  }, [projectId]);

  return (
    <div className="">
      <PageTitle
        title="Project"
        decoratedText="Details"
        subtitle={
          "Discover my journey in web development, explore the projects I've crafted, and let's build something amazing together."
        }
        icon={FaReadme}
      />

      <div className="lg:py-4 rounded-md shadow-lg">
        <div className="">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 bg-base-100 dark:bg-gray-800 dark:text-gray-400 rounded-md shadow-md lg:p-4 p-2">
            <div className="lg:col-span-6 col-span-12">
              <figure>
                <img
                  src={imageUrl}
                  alt={projectDetails?.name}
                  className="rounded-md h-auto w-full"
                />
                <figureCaption className="text-center text-gray-800 dark:text-gray-400 font-bold">
                  Main Project Image
                </figureCaption>
              </figure>
            </div>
            <div className="lg:col-span-6 col-span-12 p-2">
              <h2 className="font-bold lg:text-3xl text-gray-600 dark:text-slate-400">
                <span className="text-stone-600 dark:text-stone-500 pr-2 font-bold">
                  Name:
                </span>
                {projectDetails.name}
              </h2>
              <p>
                {" "}
                <span className="text-stone-600 dark:text-stone-500 pr-2 font-bold">
                  Type:
                </span>
                {projectDetails.type}
              </p>
              <p>
                {" "}
                <span className="text-stone-600 dark:text-stone-500 pr-2 font-bold">
                  Description:
                </span>
                {projectDetails.description}
              </p>
            </div>
          </div>

          <div className="bg-base-100 lg:p-4 p-2 lg:col-span-6 space-y-2 rounded-md dark:bg-slate-900">
            <div className="lg:space-y-4 space-y-2 mb-12">
              <div className="lg:space-y-4 space-y-2">
                <div className="">
                  <h2 className="lg:text-3xl text-lg font-bold flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <FaSourcetree /> Project Screenshots
                  </h2>
                </div>
                <div className="">
                  {projectDetails?.screenshots?.map((category) => (
                    <div key={category.id} className=" ">
                      <h2 className="text-lg font-bold mt-4 mb-2 text-gray-700 dark:text-gray-400 flex items-center gap-2">
                        <FaArrowCircleDown /> {category.category}
                      </h2>

                      <div className="grid lg:grid-cols-12 grid-cols-1 lg:gap-4 gap-2">
                        {category.items.map((item, index) => (
                          <div
                            key={index}
                            className="lg:col-span-3 col-span-12"
                          >
                            <figure>
                              <img
                                src={`${baseURL}${item.image}`}
                                alt={item.caption}
                                className="w-full h-40 object-contain rounded-md mb-2 shadow-md bg-gray-1000 dark:border-stone-700 border"
                              />
                              {item?.caption && (
                                <figcaption className="font- dark:text-gray-400">
                                  {item?.caption}
                                </figcaption>
                              )}
                            </figure>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:flex lg:space-x-6 grid space-y-2 lg:space-y-0">
              <Link to="/" className="m-0">
                <MiniButton
                  label="Go Home"
                  variant="outline"
                  icon={<FaHome />}
                />
              </Link>
              <Link to="#" className="m-0">
                <MiniButton
                  label="Live Demo"
                  variant="outline"
                  icon={<FaEye />}
                />
              </Link>
              <Link to="#" className="m-0">
                <MiniButton
                  label="GitHub Source Code"
                  variant="outline"
                  icon={<FaGithub />}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
