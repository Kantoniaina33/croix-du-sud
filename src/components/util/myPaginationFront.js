import React from "react";
import { Pagination } from "react-bootstrap";

export default function MyPaginationFront({
  totalPrograms,
  programsPerPage,
  currentPage,
  onPageChange, 
}) {
  const totalPages = Math.ceil(totalPrograms / programsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    onPageChange(pageNumber);
  };

  return (
    <Pagination id="pagination">
      <Pagination.First
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      />
      <Pagination.Prev
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      <Pagination.Item active className="pageActive">
        {currentPage}
      </Pagination.Item>
      <Pagination.Next
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
      <Pagination.Last
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
}
