// Import all icons from FontAwesome (Fa)

import * as Icons from "react-icons/fa";

const SocialMediaLinkCard = ({ url, iconName }) => {
  const IconComponent = Icons[iconName]; // Dynamically get the icon component

  if (!IconComponent) {
    return <p>Icon not found!</p>; // If the icon name doesn't exist
  }

  return (
    <div className="mt-">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <IconComponent size={24} />
      </a>
    </div>
  );
};

export default SocialMediaLinkCard;
