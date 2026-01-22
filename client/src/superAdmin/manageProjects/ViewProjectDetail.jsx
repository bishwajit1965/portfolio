import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { FaArrowCircleDown, FaHome } from "react-icons/fa";
import SuperAdminPageTitle from "../superAdminPageTitle/SuperAdminPageTitle";
import api from "../../services/api";
import Button from "../../components/buttons/Button";
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
const baseURL = `${apiUrl}/uploads/`;

const ViewProjectDetails = () => {
  const { projectId } = useParams();
  console.log("Project Id:", projectId);
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
        const response = await api.get(`projects/${projectId}`);
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
    <div>
      <SuperAdminPageTitle
        title="Project Detail"
        subtitle={
          "Discover my journey in web development, explore the projects I've crafted, and let's build something amazing together."
        }
      />
      <div className="lg:p-2 p-2 rounded-md border dark:border-slate-600 shadow-lg">
        <div className="grid lg:grid-cols-12 grid-cols-1 lg:gap-4 gap-2">
          <div className="lg:col-span-6 col-span-12 bg-base-100   rounded-md">
            <img
              src={imageUrl}
              alt={projectDetails.name}
              className="h-60 w-full object-contain rounded-md"
            />
          </div>
          <div className="lg:col-span-6 col-span-12 lg:p-6 p-2">
            <h2 className="font-bold lg:text-3xl text-lg text-gray-600 dark:text-slate-200 lg:mt-6 mt-2">
              {projectDetails.name}
            </h2>
            <p>{projectDetails.type}</p>
            <p>{projectDetails.description}</p>
          </div>
        </div>

        <div className="bg-base-100 p-2 lg:col-span-6 space-y-2 rounded-md dark:bg-slate-800">
          <div className=" ">
            {projectDetails?.screenshots?.map((category) => (
              <div key={category.id} className=" ">
                <h2 className="text-lg font-bold lg:mt-6 mt-4 mb-2 text-gray-700 dark:text-slate-300 flex items-center gap-2 bg-base-300 lg:p-2 p-1 rounded-t-md">
                  <FaArrowCircleDown /> {category.category}
                </h2>

                <div className="grid lg:grid-cols-12 grid-cols-1 lg:gap-4 gap-2">
                  {category.items.map((item, index) => (
                    <div key={index} className="lg:col-span-3 col-span-12">
                      <figure>
                        <img
                          src={`${baseURL}${item.image}`}
                          alt={item.caption}
                          className="w-full h-40 object-contain rounded-md mb-2 shadow-md border dark:border-slate-600"
                        />
                        {item?.caption && (
                          <figcaption className=" font-semibold">
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

          <div className="lg:pt-4 pt-2">
            <Link to="/super-admin/manage-projects" className="m-0">
              <Button
                label="Go Home"
                variant="outline"
                icon={<FaHome />}
                className=""
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProjectDetails;
