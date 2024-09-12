import React from "react";
import { Hotel01Icon } from "hugeicons-react";
import { useState } from "react";
import SelectCities from "../util/selectCities";
import Modal from "../hotel/modal";
import CardMap from "../geo/cardMap";
import { useNavigate } from "react-router-dom";
import CardMapItinerary from "./cardMapItinerary";
import MapItinerary from "./mapItinerary";

export default function Testmap(props) {
  const {
    title,
    method,
    departureLatitude,
    departureLongitude,
    arrivalLatitude,
    arrivalLongitude,
  } = props;
  const [message, setMessage] = useState("");
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({
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

    const formData = new FormData();

    formData.append("latitude", formValues.latitude);
    formData.append("longitude", formValues.longitude);

    try {
      const response = await fetch(`http://localhost:3030/excursions`, {
        method: method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        if (response.status === 401) {
          setMessage("Problème");
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
  const iCo = {
    departure: {
      lat: -18.8792,
      lng: 47.5079,
      name: "Marqueur 1",
    },
    arrival: {
      lat: -20.94092,
      lng: 44.560547,
      name: "Marqueur 2",
    },
  };
  return (
    <div className="card p-4 shadow-lg rounded-3" style={{ width: "50%" }}>
      <form id="myForm" autocomplete="off" style={{ marginTop: "-5%" }}>
        <div className="row mb-3">
          <div className="col">
            <label className="form-label fw-bold">
              Emplacement
              {formValues.latitude && formValues.longitude && (
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
              Placer l'itineraire sur la carte
            </button>
            <Modal isOpen={isMapModalOpen}>
              <CardMapItinerary
              // <MapItinerary
                onOpen={true}
                initialCoordinates={iCo}
                onClose={handleCloseMap}
                onRouteCalculated={handleRouteCalculated}
              />
            </Modal>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <button type="submit" onClick={handleSave}>
            Enregistrer
          </button>
        </div>
      </form>
    </div>
    // <MapItinerary
    //   initialCoordinates={{
    //     departure: {
    //       lat: parseFloat(formValues.departureLatitude) || 0,
    //       lng: parseFloat(formValues.departureLongitude || 0),
    //     },
    //     arrival: {
    //       lat: parseFloat(formValues.arrivalLatitude) || 0,
    //       lng: parseFloat(formValues.arrivalLongitude || 0),
    //     },
    //   }}
    //   onClose={handleCloseMap}
    //   onRouteCalculated={handleRouteCalculated}
    // />
  );
}
