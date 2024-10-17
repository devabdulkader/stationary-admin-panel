import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface PaginationProps<T> {
  data: T[];
  itemsPerPage?: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

interface Item {
  id: number;
}

const Pagination = <T extends Item>({
  data,
  itemsPerPage = 8,
  currentPage,
  setCurrentPage,
}: PaginationProps<T>) => {
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const getPaginationItems = () => {
    const pages: JSX.Element[] = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`mx-1 rounded-lg px-3 py-1 ${
              currentPage === i
                ? 'border border-blue-500'
                : 'border border-gray-300'
            }`}
          >
            {i}
          </button>,
        );
      } else if (pages[pages.length - 1]?.props.children !== '...') {
        pages.push(
          <span key={`dots-${i}`} className="mx-1">
            ...
          </span>,
        );
      }
    }

    return pages;
  };

  return (
    <div className="mt-3 flex items-center">
      <button
        className="mx-2 rounded-lg border bg-[#2638C4] px-2 py-2 text-white disabled:opacity-50"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FiChevronLeft />
      </button>
      {getPaginationItems()}
      <button
        className="mx-2 rounded-lg border bg-[#2638C4] px-2 py-2 text-white disabled:opacity-50"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <FiChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
