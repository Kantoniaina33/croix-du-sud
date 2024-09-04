import React, { useState } from "react";
import "./style.css";
import { Delete02Icon, Edit02Icon, MapsLocation01Icon } from "hugeicons-react";
import FormProgram from "./formProgram";
import AlertDelete from "../util/alertDelete";
import Modal from "../hotel/modal";

export default function CardProgram(props) {
  const { programId, departure, arrival, distance, duration, description } =
    props;

  const [show, setShow] = useState(false);

  const [alert, setAlert] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const handleAlert = () => setAlert(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowMap = () => setIsMapModalOpen(true);


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
              <span style={{ margin: "3px 0 0 10px" }}>
                {departure} - {arrival}
              </span>
            </h5>
          </div>
          <span className="card-price">
            {distance} Km | {duration} h
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
