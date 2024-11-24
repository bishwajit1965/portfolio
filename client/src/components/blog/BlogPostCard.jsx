// import "./BlogPostCard.css";

// import BlogCategoriesTags from "./BlogCategoriesTags";
// import BlogImage from "./BlogImage";
// import BlogMeta from "./BlogMeta";
// import BlogSummary from "./BlogSummary";
// import BlogTitle from "./BlogTitle";
// import ReadMoreLink from "./ReadMoreLink";

// const BlogPostCard = ({ post }) => {
//   const { title, summary, date, author, image, url, categories, tags } = post;

//   return (
//     <div className="p-4 bg-white rounded-lg shadow-md">
//       <BlogImage src={`http://localhost:5000${post.imageUrl}`} alt={title} />
//       <BlogTitle title={title} url={url} />
//       <BlogMeta date={date} author={author} />
//       <BlogSummary summary={summary} />
//       <BlogCategoriesTags categories={categories} tags={tags} />
//       <ReadMoreLink url={url} />
//     </div>
//   );
// };

// export default BlogPostCard;

// import BlogCategoriesTags from "./BlogCategoriesTags";
// import BlogImage from "./BlogImage";
// import BlogMeta from "./BlogMeta";
// import BlogSummary from "./BlogSummary";
// import BlogTitle from "./BlogTitle";
// import React from "react";
// import ReadMoreLink from "./ReadMoreLink";

// const BlogPostCard = ({ post }) => (
//   <div className="blog-card p-6 shadow-md rounded-lg mb-6">
//     <BlogImage imageUrl={post.imageUrl} title={post.title} />
//     <div className="blog-content">
//       <BlogTitle title={post.title} postId={post._id} />
//       <BlogMeta createdAt={post.createdAt} />
//       <BlogSummary content={post.content} summary={post.summary} />
//       <BlogCategoriesTags categories={post.categories} tags={post.tags} />
//       <ReadMoreLink postId={post._id} />
//     </div>
//   </div>
// );

// export default BlogPostCard;

import "./BlogPostCard.css";

import { FaArrowCircleRight } from "react-icons/fa";
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";
import { useState } from "react";

const BlogPostCard = ({ post, getCategoryNames, getTagNames }) => {
  const [loaded, setLoaded] = useState(false);
  const { _id, author, title, content, imageUrl, category, tag, createdAt } =
    post;
  return (
    <div className="grid grid-cols-12 gap-4 justify-between items-center border dark:border-slate-800 lg:mb-8 p-2 rounded-md bg-base-100 dark:bg-slate-900">
      <div className="lg:col-span-5 col-span-12">
        <div className="w-full h-full">
          {post.imageUrl && post.imageUrl.trim() !== "" && (
            <LazyLoad height={200} offset={100} once>
              <img
                src={`http://localhost:5000${imageUrl}`}
                alt={post.title}
                className={`lazy-image ${
                  loaded ? "loaded" : ""
                } w-full lg:h-auto rounded-md`}
                onLoad={() => setLoaded(true)}
              />
            </LazyLoad>
          )}
        </div>
      </div>
      <div className="lg:col-span-7 col-span-12 bg-sky-1000">
        <div key={_id}>
          <h2 className="text-xl font-bold">{title.slice(0, 60)}...</h2>

          <p className="text-gray-500 italic text-sm">
            <span className="font-bold">Author:</span>{" "}
            <span className="font-bold">{author}</span>{" "}
            <span className="font-bold">|| Published on:</span>{" "}
            {new Date(createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <div className="mb-1">
            <div className="badge badge-ghost badge-outline italic">
              <span className="font-bold">Categories:&nbsp; </span>
              {category ? getCategoryNames(category) : "No categories"}
            </div>
          </div>

          <div className="">
            <div className="badge badge-ghost badge-outline italic">
              <span className="font-bold">Tags:&nbsp; </span>
              {tag ? getTagNames(tag) : "No tags"}
            </div>
          </div>

          <p className="mt-2">
            {content ? content.slice(0, 295) : "No content to display."}...
          </p>

          <div className="mt-1 flex justify-end">
            <Link to={`/single-blog-post/${_id}`} className="m-0">
              <button className="btn btn-sm btn-primary shadow-md dark:btn-success">
                Read more <FaArrowCircleRight className="ml-1" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
