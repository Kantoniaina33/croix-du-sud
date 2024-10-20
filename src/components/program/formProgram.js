import React, { useEffect } from "react";
import { useState } from "react";
import "./program.css";
import CardMapItinerary from "../geo/cardMapItinerary";
import Modal from "../util/modal";

export default function FormProgram(props) {
  const {
    title,
    method,
    departure,
    arrival,
    distance,
    duration,
    description,
    departureLatitude,
    departureLongitude,
    arrivalLatitude,
    arrivalLongitude,
    programId,
    onCancel,
  } = props;
  const [message, setMessage] = useState("");
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    departure: departure || "",
    arrival: arrival || "",
    distance: distance,
    duration: duration,
    description: description || "",
    departureLatitude: departureLatitude,
    departureLongitude: departureLongitude,
    arrivalLatitude: arrivalLatitude,
    arrivalLongitude: arrivalLongitude,
  });

  const handleRouteCalculated = (routeData) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      distance: routeData.distance,
      duration: routeData.duration,
      departureLatitude: routeData.startCoords.lat,
      departureLongitude: routeData.startCoords.lng,
      arrivalLatitude: routeData.endCoords.lat,
      arrivalLongitude: routeData.endCoords.lng,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");
    console.log(formValues);

    try {
      const idUrl = method === "PUT" ? `/${programId}` : "";

      const response = await fetch(`http://localhost:3030/programs${idUrl}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setMessage("Problem");
        } else {
          setMessage("Failed");
        }
        return;
      }
      setIsMapModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleShowMap = () => setIsMapModalOpen(true);
  const handleCloseMap = () => setIsMapModalOpen(false);

  return (
    <div className="card p-4 shadow-lg rounded-3" style={{ width: "50%" }}>
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
        rel="stylesheet"
      />
      <div
        className="card-header d-flex justify-content-between align-items-center"
        style={{ marginBottom: "-1%", height: "50px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flex: 1,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            className="bi bi-buildings"
            viewBox="0 0 16 16"
            color="#273385"
          >
            <path d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022M6 8.694 1 10.36V15h5zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5z" />
            <path d="M2 11h1v1H2zm2 0h1v1H4zm-2 2h1v1H2zm2 0h1v1H4zm4-4h1v1H8zm2 0h1v1h-1zm-2 2h1v1H8zm2 0h1v1h-1zm2-2h1v1h-1zm0 2h1v1h-1zM8 7h1v1H8zm2 0h1v1h-1zm2 0h1v1h-1zM8 5h1v1H8zm2 0h1v1h-1zm2 0h1v1h-1zm0-2h1v1h-1z" />
          </svg>
          <span
            style={{ marginLeft: "2%", fontSize: "20px", color: "#273385" }}
          >
            Programme
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <button
            className="modal-close-button"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            onClick={onCancel}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-x-circle"
              viewBox="0 0 16 16"
              color="#273385"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          </button>
        </div>
      </div>
      <div className="card-body" style={{ marginBottom: "-3%" }}>
        <form id="myForm" autoComplete="off" onSubmit={handleSave}>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="nom" className="form-label fw-bold">
                Départ
              </label>
              <input
                type="text"
                className="form-control"
                value={formValues.departure}
                onChange={handleChange}
                name="departure"
              />
            </div>
            <div className="col">
              <label htmlFor="etoiles" className="form-label fw-bold">
                Arrivée
              </label>
              <input
                type="text"
                className="form-control"
                value={formValues.arrival}
                onChange={handleChange}
                name="arrival"
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">
              Itinéraire{" "}
              {formValues.departureLatitude && formValues.arrivalLatitude && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  class="bi bi-check2"
                  viewBox="0 0 16 16"
                  color="green"
                >
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
                </svg>
              )}
            </label>
            <button
              type="button"
              className="btn btn-secondary w-100"
              onClick={handleShowMap}
            >
              Placer l'itineraire sur la carte{" "}
            </button>
            <Modal isOpen={isMapModalOpen}>
              <CardMapItinerary
                onClose={handleCloseMap}
                onRouteCalculated={handleRouteCalculated}
                initialCoordinates={{
                  departure: {
                    lat: parseFloat(formValues.departureLatitude) || 0,
                    lng: parseFloat(formValues.departureLongitude) || 0,
                    name: formValues.departure,
                  },
                  arrival: {
                    lat: parseFloat(formValues.arrivalLatitude) || 0,
                    lng: parseFloat(formValues.arrivalLongitude) || 0,
                    name: formValues.arrival,
                  },
                }}
              />
            </Modal>
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Description</label>
            <textarea
              type="text"
              name="description"
              rows={4}
              className="form-control"
              value={formValues.description}
              onChange={handleChange}
            />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <button
              type="button"
              className="btn btn-outline-secondary"
              style={{
                borderRadius: "20px",
                marginTop: "1%",
              }}
              onClick={onCancel}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                borderRadius: "20px",
                marginTop: "1%",
              }}
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
