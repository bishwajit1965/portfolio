import "./DownloadCVButton.css";

import CTAButton from "../ctaButton/CTAButton";
import { FaDownload } from "react-icons/fa";

const DownloadCVButton = () => {
  return (
    <div className="download-container">
      <a
        href="/assets/cv-bishwajit-paul.pdf"
        download="cv-bishwajit-paul.pdf"
        className="download-btn"
      >
        <CTAButton
          type="submit" // Important for form submission
          variant="primary" // Button variant for styling
          icon={<FaDownload />} // Add icon to the button
          className="btn btn-md" // Additional Tailwind CSS classes
        />
      </a>
    </div>
  );
};

export default DownloadCVButton;
