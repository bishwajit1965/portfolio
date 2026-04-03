import { Link } from "react-router-dom";

const LatestPostCard = ({ latestPosts }) => {
  // const apiUrl = import.meta.env.VITE_API_URL;
  const { _id, title, imageUrl } = latestPosts;
  const getImageSrc = (img) => {
    if (!img) return "";
    if (typeof img === "string" && img.startsWith("http")) return img;
    if (img.url) return img.url;
  };
  return (
    <div className="lg:col-span-3 col-span-12">
      <div className="tooltip tooltip-top" data-tip={title}>
        <Link to={`/single-blog-post/${_id}`} className="m-0">
          <img
            src={getImageSrc(imageUrl)}
            alt={title}
            className="w-full h-auto rounded-md object-fill shadow-md"
          />
        </Link>
      </div>
    </div>
  );
};

export default LatestPostCard;
