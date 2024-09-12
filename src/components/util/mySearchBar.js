import React, { useState } from "react";
import "./util.css";

export default function MySearchBar(props) {
  const { placeholder ,search, setSearch, handleClearSearch, handleSearch } = props;
  return (
    <div className="input-group">
      <span className="input-group-text text-body">
        <i className="fas fa-search" aria-hidden="true"></i>
      </span>
      <input
        type="text"
        className="form-control"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleSearch}
      />
      {search && (
        <span
          className="input-group-text text-body"
          onClick={handleClearSearch}
          style={{
            cursor: "pointer",
            borderRadius: "8px 0px 0px 8px",
            marginLeft: "1px",
          }}
        >
          &times;
        </span>
      )}
    </div>
  );
}
