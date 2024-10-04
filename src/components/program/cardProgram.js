import React, { useState } from "react";
import "./program.css";
import { Delete02Icon, Edit02Icon, MapsLocation01Icon } from "hugeicons-react";
import FormProgram from "./formProgram";
import AlertDelete from "../util/alertDelete";
import Modal from "../util/modal";

export default function CardProgram(props) {
  const {
    programId,
    departure,
    arrival,
    distance,
    duration,
    description,
    departureLatitude,
    departureLongitude,
    arrivalLatitude,
    arrivalLongitude,
  } = props;

  const [show, setShow] = useState(false);

  const [alert, setAlert] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const handleAlert = () => setAlert(true);
  const handleShowMap = () => setIsMapModalOpen(true);
  const handleCloseModal = () => setIsMapModalOpen(false);

  const durationHours = Math.floor(distance / 60);
  const roundedDistance = Math.floor(distance);

  return (
    <div className="card-horizontal" id="programs">
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
        rel="stylesheet"
      />
      <div className="card-body">
        <div className="card-header">
          <div>
            <h5 className="card-title">
              <MapsLocation01Icon
                size={25}
                color={"#344767"}
                variant={"stroke"}
              />
              <a href={`/programs/${programId}`}>
                <span
                  style={{
                    textTransform: "uppercase",
                    margin: "3px 0 0 10px",
                    fontSize: "16px",
                  }}
                >
                  {departure} - {arrival}
                </span>
              </a>
            </h5>
          </div>
          <span className="card-price">
            {roundedDistance} Km | {durationHours} h
          </span>{" "}
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
            <FormProgram
              title="MODIFIER UN PROGRAMME"
              method="PUT"
              programId={programId}
              departure={departure}
              arrival={arrival}
              distance={distance}
              duration={duration}
              description={description}
              departureLatitude={departureLatitude}
              departureLongitude={departureLongitude}
              arrivalLatitude={arrivalLatitude}
              arrivalLongitude={arrivalLongitude}
              onCancel={handleCloseModal}
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
            alertMessage={`Êtes-vous sûr de vouloir supprimer le programme ${departure}-${arrival} ?`}
            show={alert}
            setAlert={setAlert}
            url={`http://localhost:3030/programs/${programId}`}
          />
        </div>
      </div>
    </div>
  );
}
