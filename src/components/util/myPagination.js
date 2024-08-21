import React from "react";
import { Pagination } from "react-bootstrap";

export default function MyPagination({
  onPageChange,
  lastVisible,
  currentPage,
}) {
  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1) return;
    const startAfterDoc = pageNumber === 1 ? null : lastVisible;
    onPageChange(startAfterDoc);
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
      <Pagination.Item active className="pageActive">{currentPage}</Pagination.Item>
      <Pagination.Next
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!lastVisible}
      />
      <Pagination.Last
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!lastVisible}
      />
    </Pagination>
  );
}
