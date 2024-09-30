import React from "react";
import {
  Delete02Icon,
  DollarCircleIcon,
  Edit02Icon,
  Location01Icon,
} from "hugeicons-react";
import { useState } from "react";
import AlertDelete from "../util/alertDelete";
import Modal from "../util/modal";
import { useNavigate } from "react-router-dom";

export default function TrPlanningProgram(props) {
  const {
    day,
    date,
    itinerary,
    distance,
    hotel,
    guide,
    customerId,
    reservationId,
    planningId,
  } = props;
  const roundedDistance = Math.floor(distance);
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
      <tr onClick={handleOnClick} style={{ cursor: "pointer" }}>
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
          <p className="text-sm font-weight-bold mb-0">{roundedDistance}</p>
        </td>
        <td>
          <p className="text-sm font-weight-bold mb-0">{hotel}</p>
        </td>
        <td>
          <p className="text-sm font-weight-bold mb-0">{guide}</p>
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
