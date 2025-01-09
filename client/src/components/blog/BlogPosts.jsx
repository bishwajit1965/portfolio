import { getCategoryNames, getTagNames } from "../../helpers/blogHelpers";
import { useMemo, useState } from "react";

import BlogPostCard from "./BlogPostCard";
import BlogsCarousel from "../sections/blogsCarousel/BlogsCarousel";
import { Helmet } from "react-helmet-async";
import Loader from "../loader/Loader";
import PageTitle from "../../pages/pageTitle/PageTitle";
import Pagination from "./Pagination";
import ScrollTopButton from "../scrollTopButton/ScrollTopButton";
import SectionTitleSmall from "../sectionTitle/SectionTitleSmall";
import Select from "react-select";
import useBlogData from "../../hooks/useBlogData";
import usePagination from "../../hooks/usePagination";

const BlogPosts = () => {
  const { loading, posts, categories, tags, error } = useBlogData();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const postsPerPage = 9;

  // Memoize filtered posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchTitle = post.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchCategory =
        !selectedCategory || post.category.includes(selectedCategory.value);

      const matchTags =
        Array.isArray(selectedTags) && selectedTags.length > 0
          ? selectedTags.some((tag) => post.tag && post.tag.includes(tag.value)) // Check that `post.tag` exists
          : true; // Show all if no tags are selected

      return matchTitle && matchCategory && matchTags;
    });
  }, [posts, searchQuery, selectedCategory, selectedTags]);

  const {
    currentItems: currentPosts,
    currentPage,
    setCurrentPage,
  } = usePagination(filteredPosts, postsPerPage);

  return (
    <div className="lg:pt-10">
      <Helmet>
        <title>Web-tech-services || Blogs</title>
      </Helmet>
      {loading && <Loader />}
      <PageTitle
        title="Blog"
        decoratedText={`Posts : ${posts.length}`}
        subtitle="Explore my blog posts. Hello! I am Bishwajit Paul, a Passionate Web Developer.I specialize in creating dynamic and responsive websites that provide excellent user experiences. With a strong foundation in HTML, CSS, and JavaScript, and expertise in modern frameworks like React, Node.js, and Express, I build scalable and efficient web applications. My focus is on writing clean, maintainable code and delivering projects that exceed client expectations.I love solving complex problems and continuously improving my skills to stay updated with the latest industry trends. Whether it's front-end development, back-end APIs, or full-stack solutions, I am committed to building web experiences that are both visually appealing and highly functional.I like this introduction. What do you think about it?"
      />

      {/* Search and Filters */}
      <div className="lg:flex justify-between items-center p-2 bg-base-200 border lg:border-slate-200 lg:p-2 rounded-md shadow-sm lg:pt-2 pt-8 lg:space-y-px space-y-2 dark:bg-slate-800 dark:border-none">
        {/* Search by title */}
        <input
          type="text"
          className="input input-bordered lg:w-72 w-full input-sm lg:h-10"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* Search  by tags */}
        <Select
          isMulti
          options={tags}
          value={selectedTags}
          onChange={setSelectedTags}
          placeholder="Filter by tags"
          className="search-tags lg:w-auto w-full"
        />
        <Select
          placeholder="Filter by category"
          value={selectedCategory}
          onChange={setSelectedCategory}
          options={categories}
          isClearable
          className="lg:w-64 w-full"
        />
      </div>

      {/* Blog Posts */}
      <div className="grid grid-cols-12 gap-6 lg:pt-10">
        <div className="lg:col-span-9 col-span-12">
          {loading ? (
            <span className="loading-spinner loading-lg text-success mt-10"></span>
          ) : error ? (
            <p>Error loading posts: {error}</p>
          ) : currentPosts.length > 0 ? (
            currentPosts.map((post) => (
              <BlogPostCard
                key={post._id}
                post={post}
                getCategoryNames={() =>
                  getCategoryNames(post.category, categories)
                }
                getTagNames={() => getTagNames(post.tag, tags)}
              />
            ))
          ) : (
            <p>No blog posts found.</p>
          )}
        </div>

        {/* Sidebar Content */}
        <div className="lg:col-span-3 col-span-12 px-2">
          <div className="bg-base-200 rounded-sm shadow-sm">
            <SectionTitleSmall title="Follow" decoratedText="Us" />
          </div>
          <div className="lg:mb-6">Follow us links here</div>
          <div className="">
            <div className="bg-base-200 rounded-sm shadow-sm">
              <SectionTitleSmall title="Popular" decoratedText="posts" />
            </div>
            <div className="lg:mb-6">Popular posts here</div>
          </div>
          <div className="">
            <div className="bg-base-200 rounded-sm shadow-sm">
              <SectionTitleSmall title="Recent" decoratedText="posts" />
            </div>
            <div className="lg:mb-6">
              {/* Recent posts here */}
              <BlogsCarousel />
            </div>
          </div>
          <div className="">
            <div className="bg-base-200 rounded-sm shadow-sm">
              <SectionTitleSmall title="Users'" decoratedText="comments" />
            </div>
            <div className="lg:mb-6">Users comments here</div>
          </div>
          <div className="">
            <div className="bg-base-200 rounded-sm shadow-sm">
              <SectionTitleSmall title="Related" decoratedText="tags" />
            </div>
            <div className="lg:mb-6">Tags here</div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <Pagination
        totalPosts={filteredPosts.length}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* Scroll to top button */}
      <ScrollTopButton />
    </div>
  );
};

export default BlogPosts;
