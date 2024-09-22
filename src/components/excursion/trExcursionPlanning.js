import React from "react";
import {
  Delete02Icon,
  DollarCircleIcon,
  Edit02Icon,
  Location01Icon,
} from "hugeicons-react";
import { useState } from "react";

export default function TrExcursionPlanning(props) {
  const { excursionId, image, place_name, price, reservationId, planningId } =
    props;
  const [message, setMessage] = useState("");

  const handleDelete = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(
        `http://localhost:3030/reservations/${reservationId}/program_plannings/${planningId}/excursions/${excursionId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          setMessage("Problem");
        } else {
          setMessage("Failed");
        }
        return;
      }

      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <tr>
      <td>
        <div className="d-flex px-3 py-1">
          <div>
            <img
              src={image}
              alt="logo"
              style={{ width: "60px", height: "60px", objectFit: "cover" }}
            />
          </div>
          <div
            className="d-flex flex-column justify-content-center"
            style={{ marginLeft: "3%" }}
          >
            <h6 className="mb-0 text-sm">{place_name}</h6>
          </div>
        </div>
      </td>
      <td>
        <h6 className="mb-0 text-sm">{price} Ar</h6>
      </td>
      <td>
        <h6 className="mb-0 text-sm">{price} Ar</h6>
      </td>
      <td>
        <span className="text-secondary text-xs font-weight-bold">
          <button
            style={{ backgroundColor: "white", border: "none" }}
            onClick={handleDelete}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              fill="currentColor"
              class="bi bi-dash-circle"
              viewBox="0 0 16 16"
              color="red"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
            </svg>{" "}
          </button>
        </span>
      </td>
      <td className="align-middle text-center">
        <span className="text-secondary text-xs font-weight-bold"></span>
      </td>
    </tr>
  );
}
