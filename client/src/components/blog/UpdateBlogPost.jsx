import { useEffect, useState } from "react";

const UpdateBlogPost = ({ postId }) => {
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    author: "",
    category: [],
    tag: [],
    status: status || "draft",
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    // Fetch current post data
    const fetchPostData = async () => {
      const response = await fetch(`http"//localhost:5000/api/posts/${postId}`);
      const data = await response.json();
      setPostData(data);
    };
    fetchPostData();
  }, [postId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("content", postData.content);
    formData.append("status", postData.status);
    formData.append("category", JSON.stringify(postData.category));
    if (image) formData.append("image", image);

    const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
      method: "PATCH",
      body: formData,
    });
    const result = await response.json();
    alert(result.message);
  };

  return (
    <div>
      UpdateBlogPost
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          required
        />
        <textarea
          value={postData.content}
          onChange={(e) =>
            setPostData({ ...postData, content: e.target.value })
          }
          required
        />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default UpdateBlogPost;
