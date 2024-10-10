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
import { useNavigate } from "react-router-dom";

export default function TrPlanningProgram(props) {
  const { day, date, itinerary, customerId, reservationId, planningId, price, programId } =
    props;
  const navigate = useNavigate();
  const [alert, setAlert] = useState(false);
  const handleAlert = () => setAlert(true);

  const handleOnClick = (e) => {
    navigate(
      `/customers/${customerId}/reservations/${reservationId}/planning/${planningId}/details`
    );
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
          <p className="text-sm font-weight-bold mb-0">{price}</p>
        </td>
        <td>
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
            // onClick={handleShowMapModal}
          >
            <Edit02Icon color="blue" size={20} />
          </button>
        </td>
        <td className="align-middle text-center">
          <button
            style={{ backgroundColor: "white", border: "none" }}
            onClick={handleAlert}
          >
            <Delete02Icon color="rgb(219, 1, 1)" size={23} />
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
