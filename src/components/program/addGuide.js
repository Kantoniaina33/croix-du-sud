import React, { useState } from "react";
import "./program.css";

export default function AddGuide() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  const handleValidate = () => {
    alert(`Vous avez sélectionné ${count} guides.`);
  };

  return (
    <div className="addGuide">
      <h6 className="text-uppercase mb-0 text-sm">Guides</h6>
      <span className="count">
        <button
          id="buttonMinus"
          onClick={handleDecrement}
          disabled={count === 0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            class="bi bi-dash-square"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
          </svg>
        </button>
        <span>{count}</span>
        <button id="buttonPlus" onClick={handleIncrement}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            class="bi bi-plus-square"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
        </button>
      </span>
      {/* <button
        onClick={handleValidate}
        className="btn btn-outline-primary btn-sm mb-0 me-3"
      >
        Valider
      </button> */}
    </div>
  );
}
