import React, { useState } from "react";
import { Edit02Icon, Tick02Icon } from "hugeicons-react";
import { useParams } from "react-router-dom";
import AlertDelete from "../util/alertDelete";

export default function TrOfferingDetailReservation(props) {
  const {
    offeringId,
    offeringName,
    quantity,
    price,
    tarifPeriod,
    totalPersons,
    reservationId,
    totalPrice,
    id,
  } = props;
  const [alert, setAlert] = useState(false);
  const handleAlert = () => setAlert(true);
  const [message, setMessage] = useState("");

  return (
    <tr>
      <td>
        <div className="d-flex px-4">
          <div className="my-auto">
            <h6 className="mb-0 text-sm">{offeringName}</h6>
          </div>
        </div>
      </td>
      <td>
        <div className="d-flex px-2">
          <div className="my-auto">
            <h6 className="mb-0 text-sm">{quantity}</h6>
          </div>
        </div>
      </td>
      <td>
        <div className="d-flex px-2">
          <div className="my-auto">
            <h6 className="mb-0 text-sm">{price} Ar</h6>
          </div>
        </div>
      </td>
      <td>
        <div className="d-flex px-2">
          <div className="my-auto">
            <h6 className="mb-0 text-sm">{totalPrice} Ar</h6>
          </div>
        </div>
      </td>
      <td>
        <div className="d-flex px-2">
          <div className="my-auto">
            <h6 className="mb-0 text-sm">
              {tarifPeriod}
            </h6>
          </div>
        </div>
      </td>
      <td>
        <div className="d-flex px-2">
          <div className="my-auto">
            <h6 className="mb-0 text-sm">
              {(price * quantity) / totalPersons} Ar
            </h6>
          </div>
        </div>
      </td>


      <td>
        <span className="text-secondary text-xs font-weight-bold">
          <button
            style={{ backgroundColor: "white", border: "none" }}
            onClick={handleAlert}
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
          <AlertDelete
            alertMessage={`Êtes-vous sûr de vouloir supprimer ca?`}
            show={alert}
            setAlert={setAlert}
            url={`http://localhost:3030/reservations/${reservationId}/offerings/${offeringId}/details/${id}`}
          />
        </span>
      </td>
    </tr>
  );
}
