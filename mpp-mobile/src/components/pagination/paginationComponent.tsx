interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleClick = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        className="px-2 py-1 mx-1 bg-gray-200 rounded cursor-pointer"
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}>
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className={`px-2 py-1 mx-1 ${
            page === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
          } rounded`}
          onClick={() => handleClick(page)}>
          {page}
        </button>
      ))}
      <button
        className="px-2 py-1 mx-1 bg-gray-200 rounded cursor-pointer"
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default PaginationComponent;
