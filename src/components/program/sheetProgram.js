import React, { useState } from "react";
import "./program.css";
import CardMap from "../geo/cardMap";
import MyMap from "../geo/myMap";
import ShowMap from "../geo/showMap";
import Return from "../util/return";
import AlertDelete from "../util/alertDelete";
import {
  Delete02Icon,
  Edit02Icon,
  MapsLocation01Icon,
  RoadIcon,
} from "hugeicons-react";
import FormProgram from "./formProgram";
import Modal from "../util/modal";
import ShowMapItinerary from "../geo/showMapItinerary";

export default function SheetProgram(props) {
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
    isReservation,
    price,
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

  const durationHours = Math.floor(distance / 60);
  const roundedDistance = Math.floor(distance);

  return (
    <div className="sheetProgram">
      <div className="return">
        <Return href="/programs" />
      </div>
      <div className="programDetails">
        <div className="card-image-left">
          <div className="card-content">
            <div className="d-flex justify-content-between align-items-center">
              <div className="title">
                <h6 className="card-title">
                  <MapsLocation01Icon
                    size={25}
                    color={"#344767"}
                    variant={"stroke"}
                  />
                  <span
                    style={{
                      textTransform: "uppercase",
                      margin: "3px 0 0 10px",
                      fontSize: "16px",
                    }}
                  >
                    {departure} - {arrival}
                  </span>
                </h6>
              </div>
              {!isReservation && (
                <div className="card-actions">
                  <button
                    style={{
                      backgroundColor: "white",
                      border: "transparent",
                    }}
                    onClick={handleShowMap}
                  >
                    <Edit02Icon
                      color="#273385"
                      size={23}
                      style={{ marginTop: "-10%" }}
                    />
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
                </div>
              )}
            </div>
            <div className="info">
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  fill="currentColor"
                  class="bi bi-car-front"
                  viewBox="0 0 16 16"
                  style={{ margin: "-1% 1% 0 0" }}
                >
                  <path d="M4 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0m10 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM4.862 4.276 3.906 6.19a.51.51 0 0 0 .497.731c.91-.073 2.35-.17 3.597-.17s2.688.097 3.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 10.691 4H5.309a.5.5 0 0 0-.447.276" />
                  <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM4.82 3a1.5 1.5 0 0 0-1.379.91l-.792 1.847a1.8 1.8 0 0 1-.853.904.8.8 0 0 0-.43.564L1.03 8.904a1.5 1.5 0 0 0-.03.294v.413c0 .796.62 1.448 1.408 1.484 1.555.07 3.786.155 5.592.155s4.037-.084 5.592-.155A1.48 1.48 0 0 0 15 9.611v-.413q0-.148-.03-.294l-.335-1.68a.8.8 0 0 0-.43-.563 1.8 1.8 0 0 1-.853-.904l-.792-1.848A1.5 1.5 0 0 0 11.18 3z" />
                </svg>
                <span>{roundedDistance} Km</span>
              </p>
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-clock"
                  viewBox="0 0 16 16"
                  style={{ margin: "-1% 1% 0 0" }}
                >
                  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                </svg>
                {price} Ar
              </p>
            </div>
            <p className="description">{description}</p>
          </div>
        </div>
        <div className="card-map-right z-index-2">
          <ShowMapItinerary
            initialCoordinates={{
              departure: {
                lat: parseFloat(departureLatitude) || 0,
                lng: parseFloat(departureLongitude) || 0,
                name: departure,
              },
              arrival: {
                lat: parseFloat(arrivalLatitude) || 0,
                lng: parseFloat(arrivalLongitude) || 0,
                name: arrival,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
