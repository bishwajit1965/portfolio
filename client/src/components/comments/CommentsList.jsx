import Avatar from "/assets/Avatar-Profile-PNG-Photos.png";

const CommentsList = ({ comments }) => {
  // Ensure comments is always an array
  const commentsArray = Array.isArray(comments) ? comments : [];

  if (commentsArray.length === 0) {
    return <p className="mt-2">No comments yet.</p>;
  }

  return (
    <div>
      <ol>
        {commentsArray.map((comment) => (
          <li key={comment._id}>
            <div className="grid lg:grid-cols-12 justify-between gap-2 items-center my-4">
              <div className="lg:col-span-3 col-span-12">
                <div className="lg:flex flex-1 justify-start gap-1 items-center">
                  <div className="">
                    {comment.photoUrl ? (
                      <img
                        src={comment.photoUrl}
                        alt={comment.author}
                        className="w-14 p-1 border border-slate-400 rounded-full bg-white shadow-sm"
                      />
                    ) : (
                      <img
                        src={Avatar}
                        alt=""
                        className="w-14 p-1 border rounded-full bg-white"
                      />
                    )}
                  </div>
                  <div className="italic text-sm font-bold text-slate-500">
                    Commented By: {comment.author}
                    <p>
                      Commented On:{" "}
                      {new Date(comment.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-9 lg:border-l-4 lg:min-h-fit border-lime-500 lg:ml-1 lg:pl-4 col-span-12 text-zinc-600 text-base">
                {comment.content}
              </div>
            </div>
            {comment.replyTo && (
              <p style={{ marginLeft: "20px", fontStyle: "italic" }}>
                Replying to {comment.replyTo}
              </p>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default CommentsList;
