import React from "react";
import {
  Delete02Icon,
  DollarCircleIcon,
  Edit02Icon,
  LinkSquare02Icon,
  Location01Icon,
} from "hugeicons-react";
import { useState } from "react";
import AlertDelete from "../util/alertDelete";
import Modal from "../util/modal";
import { Link, useNavigate } from "react-router-dom";
import "./program.css";

export default function TrPlanningProgram(props) {
  const {
    day,
    date,
    itinerary,
    customerId,
    reservationId,
    planningId,
    price,
    programId,
    showButton,
    id,
    included,
    totalPersons
  } = props;
  const navigate = useNavigate();
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");

  const handleAlert = () => setAlert(true);

  const handleInclude = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(
        `http://localhost:3030/reservations/${reservationId}/program_plannings/${id}`,
        {
          method: "PUT",
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
  const handleExclude = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(
        `http://localhost:3030/reservations/${reservationId}/program_plannings/${id}`,
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
    <>
      <tr style={{ cursor: "pointer" }}>
        <td>
          <div className="d-flex px-2 py-1">
            <div
              className="d-flex flex-column justify-content-center"
              style={{ marginLeft: "10%" }}
            >
              <h6 className="mb-0 text-sm">{day}</h6>
            </div>
          </div>
        </td>
        <td>
          <p className="text-sm font-weight-bold mb-0">{date}</p>
        </td>
        <td>
          <p className="text-sm font-weight-bold mb-0">{itinerary}</p>
        </td>
        <td>
          <p className="text-sm font-weight-bold mb-0">{price} Ar</p>
        </td>
        <td>
          <span className="text-xs">
            <Link
              to={`/reservations/${reservationId}/programs/${programId}`}
              state={{ totalPersons }}
              style={{ textDecoration: "underline" }}
            >
              Details
              <LinkSquare02Icon size={15} style={{ marginLeft: "3%" }} />
            </Link>
          </span>
        </td>
        {showButton && (
          <td className="align-middle text-center">
            <span className="text-secondary text-xs font-weight-bold">
              {included == true ? (
                <button
                  style={{
                    backgroundColor: "white",
                    border: "transparent",
                  }}
                  onClick={handleExclude}
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
                  </svg>
                </button>
              ) : (
                <button
                  style={{
                    backgroundColor: "white",
                    border: "transparent",
                  }}
                  onClick={handleInclude}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="23"
                    fill="currentColor"
                    class="bi bi-plus-circle"
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
        )}
      </tr>
    </>
  );
}
