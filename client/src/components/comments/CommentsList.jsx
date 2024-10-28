const CommentsList = ({ comments }) => {
  // Ensure comments is always an array
  const commentsArray = Array.isArray(comments) ? comments : [];

  if (commentsArray.length === 0) {
    return <p className="mt-2">No comments yet.</p>;
  }

  return (
    <div>
      <ul>
        {commentsArray.map((comment) => (
          <li key={comment._id}>
            <p>
              <strong>{comment.author}</strong>: {comment.text}
            </p>
            {comment.replyTo && (
              <p style={{ marginLeft: "20px", fontStyle: "italic" }}>
                Replying to {comment.replyTo}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentsList;
