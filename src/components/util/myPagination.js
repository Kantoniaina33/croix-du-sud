import React, { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";

export default function MyPagination() {
  const [items, setItems] = useState([]);
  const [lastKey, setLastKey] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 2;

  const fetchItems = async (reset = false) => {
    try {
      const response = await fetch(
        `http://localhost:3000/hotels/pagination?startAfterKey=${
          reset ? "" : lastKey
        }&limit=${limit}`
      );
      const data = await response.json();

      if (reset) {
        setItems(Object.values(data));
      } else {
        setItems((prevItems) => [...prevItems, ...Object.values(data)]);
      }

      const keys = Object.keys(data);
      setLastKey(keys[keys.length - 1]);

      if (Object.keys(data).length < limit) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des éléments:", error);
    }
  };

  useEffect(() => {
    fetchItems(true);
  }, []);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    fetchItems(pageNumber === 1);
  };

  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>

      <Pagination>
        <Pagination.First
          onClick={() => handlePageChange(1)}
          disabled={page === 1}
        />
        <Pagination.Prev
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        />

        <Pagination.Item active>{page}</Pagination.Item>

        <Pagination.Next
          onClick={() => handlePageChange(page + 1)}
          disabled={!hasMore}
        />
        <Pagination.Last
          onClick={() => handlePageChange(page + 1)}
          disabled={!hasMore}
        />
      </Pagination>
    </div>
  );
}
