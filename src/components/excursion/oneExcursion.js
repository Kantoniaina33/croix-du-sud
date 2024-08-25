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
import { Modal } from "react-bootstrap";
import ExcursionSheet from "./excursionSheet";

export default function OneExcursion(props) {
  const { excursionId, logo, place_name, city, price, description } = props;
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState(false);
  const [showSheet, setShowSheet] = useState(false);

  const handleAlert = () => setAlert(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowSheet = () => setShowSheet(true);

  return (
    <>
      <div onClick={handleShowSheet} className="col-xl-3 col-md-6 mb-xl-0 mb-4">
        <div className="card" id="cardExcursion">
          <img src={logo} alt="excursion" className="card-img-top" />
          <div className="card-body">
            <h5 className="card-title">{place_name}</h5>
            <div className="d-flex align-items-center">
              <div>
                <Location01Icon size={18} color={"black"} variant={"stroke"} />
              </div>
              <div style={{ margin: "4px 0 0 2px", color: "black" }}>
                {city}
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div>
                <DollarCircleIcon
                  size={18}
                  color={"black"}
                  variant={"stroke"}
                />
              </div>
              <div style={{ margin: "4px 0 0 2px", color: "black" }}>
                {price} Ar
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between mt-2">
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
      <Modal show={showSheet} onHide={handleClose}>
        <ExcursionSheet excursionId={excursionId}></ExcursionSheet>
      </Modal>
    </>
  );
}
