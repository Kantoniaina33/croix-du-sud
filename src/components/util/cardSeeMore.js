import React, { useState } from "react";
import "./util.css";

export default function CardSeeMore(props) {
  const { href } = props;

  return (
    <div className="card-horizontal mb-3" id="card_see_more">
      <a href={href} className="card-body">
        <p>
          {" "}
          Voir plus
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            fill="currentColor"
            class="bi bi-chevron-double-right"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708"
            />
            <path
              fill-rule="evenodd"
              d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708"
            />
          </svg>
        </p>
      </a>
    </div>
  );
}
