import React, { useState } from "react";

export default function ListTransferToAdd(props) {
  const { transfer, price, setTransfersId, transferId } = props;
  const [isSelected, setIsSelected] = useState(false);

  const handleAddTransfer = (e) => {
    e.preventDefault();
    setIsSelected(true);

    setTransfersId((prevTransfersId) => {
      if (transferId && !prevTransfersId.includes(transferId)) {
        return [...prevTransfersId, transferId];
      }
      return prevTransfersId;
    });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setIsSelected(false);

    setTransfersId((prevTransfersId) => {
      return prevTransfersId.filter((id) => id !== transferId);
    });
  };

  return (
    <tr>
      <td>
        <div
          className="d-flex px-0 py-1"
          style={{
            textTransform: "uppercase",
          }}
        >
          <div
            className="d-flex flex-column justify-content-center"
            style={{ marginLeft: "3%" }}
          >
            <h6 className="mb-0 text-sm">{transfer}</h6>
          </div>
        </div>
      </td>
      <td>
        <h6 className="mb-0 text-sm">{price} Ar</h6>
      </td>
      <td className="align-middle text-center">
        <span className="text-secondary text-xs font-weight-bold">
          {isSelected ? (
            <button
              style={{ backgroundColor: "white", border: "none" }}
              onClick={handleCancel}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                fill="currentColor"
                className="bi bi-check-circle-fill"
                viewBox="0 0 16 16"
                color="green"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
              </svg>
            </button>
          ) : (
            <button
              style={{ backgroundColor: "white", border: "none" }}
              onClick={handleAddTransfer}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                fill="currentColor"
                className="bi bi-plus-circle"
                viewBox="0 0 16 16"
                color="green"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
            </button>
          )}
        </span>
      </td>
    </tr>
  );
}
