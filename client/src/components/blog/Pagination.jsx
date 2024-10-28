const Pagination = ({
  totalPosts,
  postsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  // const totalPages = Math.ceil(totalPosts / postsPerPage);

  // const handlePageChange = (pageNumber) => {
  //   if (pageNumber > 0 && pageNumber <= totalPages) {
  //     setCurrentPage(pageNumber);
  //   }
  // };

  const pageNumbers = [];

  // Calculate total pages
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Pagination UI
  const renderPageNumbers = () => {
    if (totalPages <= 5) {
      // If less than or equal to 5 pages, show all
      return pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => setCurrentPage(number)}
          className={`px-4 py-2 ${
            currentPage === number ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {number}
        </button>
      ));
    } else {
      const pagesToShow = [];

      // Always show first page
      pagesToShow.push(1);

      if (currentPage > 3) {
        pagesToShow.push("..."); // Add ellipsis if needed
      }

      // Show current page and neighbors
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        pagesToShow.push(i);
      }

      if (currentPage < totalPages - 2) {
        pagesToShow.push("..."); // Add ellipsis if needed
      }

      // Always show last page
      if (totalPages > 1) {
        pagesToShow.push(totalPages);
      }

      return pagesToShow.map((number, index) => (
        <button
          key={index}
          onClick={() => {
            if (typeof number === "number") {
              setCurrentPage(number);
            }
          }}
          className={`px-4 py-2 ${
            currentPage === number ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          disabled={number === "..."} // Disable button for ellipsis
        >
          {number}
        </button>
      ));
    }
  };

  return (
    <div className="flex justify-center mt-4">
      {renderPageNumbers()}
      {/* <nav>
        <ul className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index + 1}>
              <button
                className={`px-4 py-2 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav> */}
    </div>
  );
};

export default Pagination;
