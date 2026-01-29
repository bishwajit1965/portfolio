import { FaArrowCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import MiniButton from "../../components/buttons/MiniButton";

const RssPostCard = ({ post }) => {
  const { link, title, description, pubDate } = post;

  return (
    <div className="lg:col-span-4 col-span-12 border dark:border-slate-700 rounded-md p-2 relative shadow-md dark:bg-slate-900">
      <div className="mb-12 text-slate-500 lg:space-y-2 space-y-1">
        <h1 className="text-2xl font-bold text-slate-500">
          {title.slice(0, 60)}
        </h1>
        <p dangerouslySetInnerHTML={{ __html: description.slice(0, 160) }} />
        <p className="text-slate-500 font-bold">
          {" "}
          Published on:
          <em>{new Date(pubDate).toLocaleString()}</em>
        </p>
      </div>
      <Link to={`/single-blog-post/${link}`} className="m-0 absolute bottom-2">
        <MiniButton
          label="Read More"
          className="btn btn-sm"
          icon={<FaArrowCircleRight />}
          variant="base"
        />
      </Link>
    </div>
  );
};

export default RssPostCard;
