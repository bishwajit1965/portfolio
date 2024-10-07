import * as Icons from "react-icons/fa";

import { FaCheckCircle } from "react-icons/fa";

// Import all icons from FontAwesome (Fa)

const SocialLinksCard = ({ platForm, url, iconName }) => {
  const IconComponent = Icons[iconName]; // Dynamically get the icon component
  if (!IconComponent) {
    return <p>Icon not found</p>; // If the icon name doesn't exist
  }
  return (
    <div className="border border-slate-400 dark:border-slate-700 shadow-sm rounded-lg p-2">
      <p className="font-bold flex items-center justify-items-start">
        <FaCheckCircle className="mr-2 text-blue-700 dark:text-amber-400" />
        {platForm}
        <a href={url} target="_blank" rel="noopener noreferrer">
          <IconComponent
            className="text-blue-700 dark:text-amber-400"
            size={18}
            // style={{
            //   margin: "0 5px",
            //   color: "blue",
            // }}
          />
        </a>
      </p>
    </div>
  );
};

export default SocialLinksCard;
