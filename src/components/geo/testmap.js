import React from "react";
import { Hotel01Icon } from "hugeicons-react";
import { useState } from "react";
import SelectCities from "../util/selectCities";
import Modal from "../hotel/modal";
import CardMap from "../geo/cardMap";
import { useNavigate } from "react-router-dom";

export default function Testmap(props) {
  const { title, method, latitude, longitude } = props;
const [message, setMessage] = useState("");
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    latitude: latitude,
    longitude: longitude,
  });

  const handleSetCoordinates = (data) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      latitude: data.lat,
      longitude: data.lng,
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
              Afficher la carte
            </button>
            <Modal isOpen={isMapModalOpen}>
              <CardMap
                initialCoordinates={{
                  lat: formValues.latitude || 0,
                  lng: formValues.longitude || 0,
                }}
                onClose={handleCloseMap}
                onSetCoordinates={handleSetCoordinates}
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
  );
}
