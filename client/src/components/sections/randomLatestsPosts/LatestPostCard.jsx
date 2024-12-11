import { Link } from "react-router-dom";

const LatestPostCard = ({ latestPosts }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { _id, title, imageUrl } = latestPosts;

  return (
    <div className="lg:col-span-3 col-span-12">
      <div className="tooltip tooltip-top" data-tip={title}>
        <Link to={`/single-blog-post/${_id}`} className="m-0">
          <img
            src={`${apiUrl}${imageUrl}`}
            alt=""
            className="w-full lg:h-52 rounded-md shadow-md"
          />
        </Link>
      </div>
    </div>
  );
};

export default LatestPostCard;
