import React from "react";
import {
  Delete02Icon,
  DollarCircleIcon,
  Edit02Icon,
  Location01Icon,
} from "hugeicons-react";
import { useState } from "react";
import AlertDelete from "../util/alertDelete";
import "./style.css";

export default function CardExcursion(props) {
  const { excursionId, logo, place_name, city, price, description } = props;
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState(false);
  const [showSheet, setShowSheet] = useState(false);

  const handleAlert = () => setAlert(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowSheet = () => setShowSheet(true);

  return (
    <div className="card-horizontal" id="excursions">
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
        rel="stylesheet"
      />
      <div className="card-image">
        <img src={logo} alt="Image" />
      </div>
      <div className="card-body">
        <div className="card-header">
          <div>
            <h5 className="card-title">{place_name}</h5>
            <span>{city}</span>
          </div>
          <span className="card-price">{price} Ar</span>
        </div>
        <p className="card-description">{description}</p>
        <div className="card-actions">
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
  );
}
