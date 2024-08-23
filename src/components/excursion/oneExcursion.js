import React from "react";
import {
  Delete02Icon,
  DollarCircleIcon,
  Edit02Icon,
  Location01Icon,
} from "hugeicons-react";
import FormExcursion from "./formExcursion";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import AlertDelete from "../util/alertDelete";
import "./style.css";

export default function OneExcursion(props) {
  const { excursionId, logo, place_name, city, price, description } = props;
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState(false);

  const handleAlert = () => setAlert(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div class="col-xl-3 col-md-6 mb-xl-0 mb-4">
      <div class="card">
        <img src={logo} alt="excursion" class="card-img-top" />
        <div class="card-body">
          <h5 class="card-title">{place_name}</h5>
          <span>
            <Location01Icon size={18} color={"grey"} variant={"stroke"} />
            {city}
          </span>
          <p>
            <DollarCircleIcon size={18} color="grey" variant={"stroke"} />
            {price} Ar
          </p>
          <div class="d-flex align-items-center justify-content-between">
            <button
              style={{
                backgroundColor: "white",
                border: "transparent",
              }}
              onClick={handleShow}
            >
              <Edit02Icon color="#273385" size={23} />
            </button>
            <button
              style={{
                backgroundColor: "white",
                border: "transparent",
              }}
              onClick={handleAlert}
            >
              <Delete02Icon color="rgb(219, 1, 1)" size={23} />
            </button>
            <AlertDelete
              alertMessage={`Êtes-vous sûr de vouloir supprimer ${place_name} ?`}
              show={alert}
              setAlert={setAlert}
              url={`http://localhost:3030/excursions/${excursionId}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
