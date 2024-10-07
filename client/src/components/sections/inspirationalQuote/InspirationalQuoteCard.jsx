import {
  FaCheckCircle,
  FaFacebook,
  FaGithub,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const InspirationalQuoteCard = ({ quote }) => {
  const { popularQuote, author } = quote;
  return (
    <div className="border border-slate-400 dark:border-slate-700 rounded-md p-2 shadow-sm mb-2">
      <p className="flex items-baseline">
        <span className="mr-2">
          <FaCheckCircle className="text-blue-700 dark:text-amber-400" />
        </span>
        {popularQuote} -- {author}
      </p>
    </div>
  );
};

export default InspirationalQuoteCard;

<FaGithub />;

<FaTwitter />;

<FaFacebook />;

<FaLinkedinIn />;
