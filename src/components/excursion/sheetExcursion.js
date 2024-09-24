import React, { useState } from "react";
import "./excursion.css";
import CardMap from "../geo/cardMap";
import MyMap from "../geo/myMap";
import ShowMap from "../geo/showMap";
import Return from "../util/return";
import AlertDelete from "../util/alertDelete";
import { Delete02Icon, Edit02Icon } from "hugeicons-react";
import FormExcursion from "./formExcursion";
import Modal from "../hotel/modal";

export default function SheetExcursion(props) {
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
    <div className="sheetExcursion">
      <div className="return">
        <Return href="/excursions" />
      </div>
      <div className="excursionDetails">
        <div className="card-image-left">
          <div>
            <img src={image} alt="excursion" />
          </div>
          <div className="card-content">
            <div className="d-flex justify-content-between align-items-center">
              <div className="title">
                <h6 className="card-title">{place_name}</h6>
              </div>
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
            <span className="card-subtitle">{city}</span>
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-ticket"
                viewBox="0 0 16 16"
                style={{ marginTop: "-1%" }}
              >
                <path d="M0 4.5A1.5 1.5 0 0 1 1.5 3h13A1.5 1.5 0 0 1 16 4.5V6a.5.5 0 0 1-.5.5 1.5 1.5 0 0 0 0 3 .5.5 0 0 1 .5.5v1.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 11.5V10a.5.5 0 0 1 .5-.5 1.5 1.5 0 1 0 0-3A.5.5 0 0 1 0 6zM1.5 4a.5.5 0 0 0-.5.5v1.05a2.5 2.5 0 0 1 0 4.9v1.05a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-1.05a2.5 2.5 0 0 1 0-4.9V4.5a.5.5 0 0 0-.5-.5z" />
              </svg>
              <span style={{ color: "#273385" }}> {price} Ar</span>
            </p>
            <p>{description}</p>
          </div>
        </div>
        <div className="card-map-right z-index-2">
          <ShowMap
            initialCoordinates={{
              name: location,
              lat: parseFloat(latitude) || 0,
              lng: parseFloat(longitude) || 0,
            }}
          />
        </div>
      </div>
    </div>
  );
}
