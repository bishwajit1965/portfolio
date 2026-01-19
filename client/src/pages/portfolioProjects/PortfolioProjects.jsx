import { FaLayerGroup } from "react-icons/fa6";
import PageTitle from "../pageTitle/PageTitle";

const PortfolioProjects = () => {
  return (
    <div>
      <PageTitle
        title="Portfolio of"
        decoratedText="Projects"
        subtitle="Discover my journey in web development, explore the projects I've crafted, and let's build something amazing together."
        icon={FaLayerGroup}
      />
    </div>
  );
};

export default PortfolioProjects;
