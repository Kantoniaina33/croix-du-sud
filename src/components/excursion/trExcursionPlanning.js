import React from "react";
import {
  Delete02Icon,
  DollarCircleIcon,
  Edit02Icon,
  Location01Icon,
} from "hugeicons-react";
import { useState } from "react";
import AlertDelete from "../util/alertDelete";

export default function TrExcursionPlanning(props) {
  const { excursionId, image, place_name, price, programId, id } = props;
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState(false);
  const handleAlert = () => setAlert(true);

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
            alertMessage={`Êtes-vous sûr de vouloir retirer cette excursion ?`}
            show={alert}
            setAlert={setAlert}
            url={`http://localhost:3030/programs/${programId}/excursions/${id}`}
          />
        </span>
      </td>
      <td className="align-middle text-center">
        <span className="text-secondary text-xs font-weight-bold"></span>
      </td>
    </tr>
  );
}
