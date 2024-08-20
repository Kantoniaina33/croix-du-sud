import React from "react";
import { Pagination } from "react-bootstrap";

export default function MyPagination({ onPageChange, lastVisible }) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);

  React.useEffect(() => {
    if (!lastVisible) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [lastVisible]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    onPageChange(pageNumber); // Passe le numéro de page ici
  };

  return (
    <Pagination>
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
        disabled={!hasMore}
      />
      <Pagination.Last
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!hasMore}
      />
    </Pagination>
  );
}
