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
import { useNavigate } from "react-router-dom";

export default function TrProgramCircuit(props) {
  const {
    day,
    price,
    itinerary,
    programId
  } = props;
  const navigate = useNavigate();
  const [alert, setAlert] = useState(false);
  const handleAlert = () => setAlert(true);

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
          <p className="text-sm font-weight-bold mb-0">{"jeu. 29/12/24"}</p>
        </td>
        <td>
          <p className="text-sm font-weight-bold mb-0">{itinerary}</p>
        </td>
        <td>
          <p className="text-sm font-weight-bold mb-0">{price} Ar</p>
        </td>
        <td className="align-middle text-center">
          <span className="text-xs">
            <a href={`/programs/${programId}`}>
              <span style={{ textDecoration: "underline" }}>Details</span>
              <LinkSquare02Icon size={15} style={{ marginLeft: "2%" }} />
            </a>
          </span>
        </td>
        <td className="align-middle text-center">
          <button
            style={{ backgroundColor: "white", border: "none" }}
            onClick={handleAlert}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-dash-circle"
              viewBox="0 0 16 16"
              color="red"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
            </svg>{" "}
          </button>
          <AlertDelete
            alertMessage={`Êtes-vous sûr de vouloir supprimer le programme du jour ${day} ?`}
            show={alert}
            setAlert={setAlert}
            // url={`http://localhost:3030/Employees/${employeeId}`}
          />
        </td>
      </tr>
    </>
  );
}
