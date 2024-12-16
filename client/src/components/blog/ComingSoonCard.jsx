import CountdownTimer from "./CountDownTimer";

const ComingSoonCard = ({ post }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return (
    <div>
      <div key={post._id} style={{ marginBottom: "40px" }}>
        <h2>{post.title}</h2>
        <img
          src={`${apiUrl}${post.imageUrl}` || "https://via.placeholder.com/400"}
          alt={post.title}
          style={{
            width: "100%",
            maxWidth: "400px",
            borderRadius: "10px",
          }}
        />
        <p>{post.content || "Stay tuned for this exciting update!"}</p>
        <p>{post.status}</p>
        <p>{post.willPublishAt}</p>
        <CountdownTimer releaseDate={post.willPublishAt} />
      </div>
    </div>
  );
};

export default ComingSoonCard;
