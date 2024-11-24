import { FaCopy, FaFacebook, FaTwitter } from "react-icons/fa";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa6";

import { useState } from "react";

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
    <div className="social-share lg:flex items-center space-y-2 lg:space-y-0 mb-4">
      {/* Social media sharing buttons */}
      <a
        href={shareLinks.facebook}
        onClick={() => handleGenerateLink("facebook")}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-sm btn-outline shadow-md"
      >
        Share on <FaFacebook />
      </a>
      <a
        href={shareLinks.twitter}
        onClick={() => handleGenerateLink("twitter")}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-sm btn-outline shadow-md"
      >
        Share on <FaTwitter />
      </a>
      <a
        href={shareLinks.linkedin}
        onClick={() => handleGenerateLink("linkedin")}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-sm btn-outline shadow-md"
      >
        Share on <FaLinkedin />
      </a>
      <a
        href={shareLinks.whatsapp}
        onClick={() => handleGenerateLink("whatsapp")}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-sm btn-outline shadow-md"
      >
        Share on <FaWhatsapp />
      </a>

      {/* Copy link button */}
      <button
        className="btn btn-sm btn-outline shadow-md bg-base-200"
        onClick={handleCopyLink}
      >
        <FaCopy /> Copy Link
      </button>

      {/* Display the copy status message */}
      {copyStatus && <span className="ml-4">{copyStatus}</span>}
    </div>
  );
};

export default SocialShare;
