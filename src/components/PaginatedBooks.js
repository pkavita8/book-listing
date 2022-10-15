import React, { useMemo } from "react";
import Book from "./Book";

const PaginatedBooks = ({
  data: { list, total },
  currentPage,
  updateCurrentPage,
}) => {
  const dataLimit = 20;

  const goToNextPage = () => {
    updateCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    updateCurrentPage(currentPage - 1);
  };

  const paginatedData = useMemo(() => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return list.slice(startIndex, endIndex);
  }, [currentPage, list]);

  const pages = useMemo(() => {
    return new Array(Math.round(total / dataLimit) < 10 || 10)
      .fill()
      .map((_, index) => index + 1);
  }, [total]);

  return (
    <div>
      <div>
        {paginatedData.map((d, index) => (
          <Book key={index} data={d}  />
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={goToPreviousPage}
          className={`prev ${currentPage === 1 ? "disabled" : ""}`}
        >
          prev
        </button>

        {pages.map((item, index) => (
          <button
            key={index}
            className={`pagination-item ${
              currentPage === item ? "active" : null
            }`}
          >
            <span>{item}</span>
          </button>
        ))}
        <button
          onClick={goToNextPage}
          className={`next ${currentPage === pages.length ? "disabled" : ""}`}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default PaginatedBooks;
