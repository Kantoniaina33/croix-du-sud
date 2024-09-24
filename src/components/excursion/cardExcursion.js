import React from "react";
import {
  Delete02Icon,
  DollarCircleIcon,
  Edit02Icon,
  Location01Icon,
} from "hugeicons-react";
import { useState } from "react";
import AlertDelete from "../util/alertDelete";
import "./excursion.css";
import Modal from "../hotel/modal";
import FormExcursion from "./formExcursion";

export default function CardExcursion(props) {
  const {
    excursionId,
    image,
    place_name,
    city,
    price,
    description,
    location,
    latitude,
    longitude,
  } = props;
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState(false);
  const [showSheet, setShowSheet] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const handleAlert = () => setAlert(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowSheet = () => setShowSheet(true);
  const handleShowMap = () => setIsMapModalOpen(true);
  const handleCloseModal = () => setIsMapModalOpen(false);

  return (
    <div className="card-horizontal" id="excursions">
      <div className="card-image">
        <img src={image} alt="Image" />
      </div>
      <div className="card-body">
        <div className="card-header">
          <div>
            <a href={`/excursions/${excursionId}`}>
              <h5 className="card-title">{place_name}</h5>
            </a>
            <span className="card-subtitle">{city}</span>
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
            onClick={handleShowMap}
          >
            <Edit02Icon color="#273385" size={23} />
          </button>
          <Modal isOpen={isMapModalOpen}>
            <FormExcursion
              title="MODIFIER UN CIRCUIT"
              method="PUT"
              onCancel={handleCloseModal}
              image={image}
              place_name={place_name}
              description={description}
              price={price}
              city={city}
              excursionId={excursionId}
              location={location}
              latitude={latitude}
              longitude={longitude}
            />
          </Modal>
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
