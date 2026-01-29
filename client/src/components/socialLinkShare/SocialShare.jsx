import { FaCopy, FaFacebook, FaTwitter } from "react-icons/fa";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa6";
import { useState } from "react";
import MiniButton from "../buttons/MiniButton";

const SocialShare = ({ blogId, title }) => {
  const postUrl = `${window.location.origin}/blog/${blogId}`;
  const encodedUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(title);

  const [shareLinks, setShareLinks] = useState({
    facebook: "",
    twitter: "",
    linkedin: "",
    whatsapp: "",
  });

  const [copyStatus, setCopyStatus] = useState("");

  // Handle generating share links dynamically
  const handleGenerateLink = (platform) => {
    let generatedLink = "";
    switch (platform) {
      case "facebook":
        generatedLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "twitter":
        generatedLink = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case "linkedin":
        generatedLink = `https://www.linkedin.com/shareArticle?url=${encodedUrl}&title=${encodedTitle}`;
        break;
      case "whatsapp":
        generatedLink = `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`;
        break;
      default:
        break;
    }

    // Update the link dynamically
    setShareLinks((prev) => ({ ...prev, [platform]: generatedLink }));
  };

  // Handle "Copy Link" button
  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(postUrl) // Copy URL to clipboard
      .then(() => {
        setCopyStatus("Link copied!"); // Set success message
        setTimeout(() => setCopyStatus(""), 2000); // Reset message after 2 seconds
      })
      .catch(() => {
        setCopyStatus("Failed to copy"); // Handle error case
      });
  };

  return (
    <div className="social-share lg:flex grid gap-2 items-center justify-center space-y-4 lg:space-y-0 lg:space-x-6 px-2">
      {/* Social media sharing buttons */}
      <MiniButton
        label="Share on"
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        variant="base"
        onClick={() => handleGenerateLink("facebook")}
        className="btn btn-sm lg:w-28 w-full"
        icon={<FaFacebook />}
      />
      <MiniButton
        label="Share on"
        variant="base"
        className="btn btn-sm lg:w-28 w-full"
        icon={<FaTwitter />}
        href={shareLinks.twitter}
        onClick={() => handleGenerateLink("twitter")}
        target="_blank"
        rel="noopener noreferrer"
      />
      <MiniButton
        href={shareLinks.linkedin}
        onClick={() => handleGenerateLink("linkedin")}
        target="_blank"
        rel="noopener noreferrer"
        label="Share on"
        variant="base"
        className="btn btn-sm lg:w-28 w-full"
        icon={<FaLinkedin />}
      />
      <MiniButton
        label="Share on"
        href={shareLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        variant="base"
        onClick={() => handleGenerateLink("whatsapp")}
        className="btn btn-sm lg:w-28 w-full"
        icon={<FaWhatsapp />}
      />
      <MiniButton
        label="Copy link"
        rel="noopener noreferrer"
        variant="base"
        onClick={handleCopyLink}
        className="btn btn-sm lg:w-28 w-full"
        icon={<FaCopy />}
      />

      {/* Display the copy status message */}
      {copyStatus && <span className="ml-4">{copyStatus}</span>}
    </div>
  );
};

export default SocialShare;
