import { FaEye, FaGithubSquare, FaHome, FaReadme } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import CTAButton from "../ctaButton/CTAButton";
import SectionTitle from "../sectionTitle/SectionTitle";
import api from "../../services/api";
import PageTitle from "../../pages/pageTitle/PageTitle";

const ProjectDetails = () => {
  const { projectId } = useParams();
  console.log(projectId);
  const [projectDetails, setProjectDetails] = useState({
    name: "",
    type: "",
    description: "",
  });
  console.log("Project details:", projectDetails);
  const imageUrl = `http://localhost:5000/uploads/${projectDetails.image}`;

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

      <div className="lg:py-14 p-2 rounded-md border dark:border-slate-600 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="bg-base-100 lg:col-span-6 p-2 rounded-md">
            <img
              src={imageUrl}
              alt={projectDetails.name}
              className="rounded-md h-auto w-full"
            />
          </div>
          <div className="bg-base-100 lg:p-4 p-2 lg:col-span-6 space-y-2 rounded-md dark:bg-slate-900 border dark:border-slate-700 relative">
            <div className="">
              <h2 className="font-bold lg:text-3xl text-gray-600 dark:text-slate-200">
                {projectDetails.name}
              </h2>
              <p>{projectDetails.type}</p>
              <p>{projectDetails.description}</p>
            </div>
            <div className="flex absolute bottom-1 left-0">
              <Link to="/">
                <CTAButton
                  label="Go Home"
                  variant="primary"
                  icon={<FaHome />}
                  className="my-2 btn btn-sm"
                />
              </Link>
              <Link to="#">
                <CTAButton
                  label="Live Demo"
                  variant="primary"
                  icon={<FaEye />}
                  className="my-2 btn btn-sm"
                />
              </Link>
              <Link to="#">
                <CTAButton
                  label="GitHub Source Code"
                  variant="primary"
                  icon={<FaGithubSquare />}
                  className="my-2 btn btn-sm"
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
