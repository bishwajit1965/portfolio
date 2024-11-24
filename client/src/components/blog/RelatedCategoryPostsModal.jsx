import "./RelatedCategoryPostModal.css";

import { useEffect, useState } from "react";

import fetchCategoryFilteredPosts from "../../services/fetchCategoryFilteredPosts";

const RelatedCategoryPostsModal = ({ categoryIds, onClose }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await fetchCategoryFilteredPosts(categoryIds);
      setRelatedPosts(posts);
    };

    fetchPosts();
  }, [categoryIds]);

  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={onClose} className="close-btn text-red-600">
          Close
        </button>
        <h2 className="text-red-500">Related Posts</h2>
        {relatedPosts.length > 0 ? (
          <ul>
            {relatedPosts.map((post) => (
              <li key={post._id}>
                <a href={`/post/${post._id}`}>
                  <h3>{post.title}</h3>
                  <p>{post.content.substring(0, 100)}...</p>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No related posts found.</p>
        )}
      </div>
    </div>
  );
};

export default RelatedCategoryPostsModal;
