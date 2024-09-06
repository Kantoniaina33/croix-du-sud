import React from "react";
import { Hotel01Icon } from "hugeicons-react";
import { useState } from "react";
import SelectCities from "../util/selectCities";
import Modal from "../hotel/modal";
import CardMap from "../geo/cardMap";

export default function FormExcursion2(props) {
  const {
    title,
    method,
    image,
    place_name,
    description,
    price,
    city,
    excursionId,
    onCancel,
  } = props;

  const [message, setMessage] = useState("");
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const [formValues, setFormValues] = useState({
    place_name: place_name || "",
    description: description || "",
    city: city || "Antananarivo",
    price: price,
    image: image || null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image" && e.target.files.length > 0) {
      setFormValues((prevValues) => ({
        ...prevValues,
        image: e.target.files[0],
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");

    const formData = new FormData();

    if (formValues.image) {
      formData.append("image", formValues.image);
    }

    formData.append("place_name", formValues.place_name);
    formData.append("description", formValues.description);
    formData.append("city", formValues.city);
    formData.append("price", formValues.price);
    try {
      const idUrl = method === "PUT" ? `/${excursionId}` : "";

      const response = await fetch(`http://localhost:3030/excursions${idUrl}`, {
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
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleShowMap = () => setIsMapModalOpen(true);
  const handleCloseMap = () => setIsMapModalOpen(false);

  return (
    <div className="card p-4 shadow-lg rounded-3" style={{ width: "50%" }}>
      <div
        className="card-header d-flex justify-content-between align-items-center"
        style={{ marginBottom: "1%", height: "50px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flex: 1,
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-tree" viewBox="0 0 16 16">
            <path d="M8.416.223a.5.5 0 0 0-.832 0l-3 4.5A.5.5 0 0 0 5 5.5h.098L3.076 8.735A.5.5 0 0 0 3.5 9.5h.191l-1.638 3.276a.5.5 0 0 0 .447.724H7V16h2v-2.5h4.5a.5.5 0 0 0 .447-.724L12.31 9.5h.191a.5.5 0 0 0 .424-.765L10.902 5.5H11a.5.5 0 0 0 .416-.777zM6.437 4.758A.5.5 0 0 0 6 4.5h-.066L8 1.401 10.066 4.5H10a.5.5 0 0 0-.424.765L11.598 8.5H11.5a.5.5 0 0 0-.447.724L12.69 12.5H3.309l1.638-3.276A.5.5 0 0 0 4.5 8.5h-.098l2.022-3.235a.5.5 0 0 0 .013-.507"/>
          </svg>
          <span
            style={{ marginLeft: "2%", fontSize: "25px", color: "#273385" }}
          >
            Nouvelle Excursion
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
        <form id="myForm" autocomplete="off" style={{ marginTop: "-5%" }}>
          <div className="row mb-3">
            <div className="col">
              <label className="form-label fw-bold">Nom du lieu</label>
              <input
                type="text"
                name="place_name"
                className="form-control"
                value={formValues.place_name}
                onChange={handleChange}
              />
            </div>
            <div className="col">
              <label className="form-label fw-bold">Prix</label>
              <input
                type="number"
                name="price"
                className="form-control"
                value={formValues.price}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="nom" className="form-label fw-bold">
                Ville
              </label>
              <SelectCities value={formValues.name} onChange={handleChange} />
            </div>
            <div className="col">
              <label className="form-label fw-bold">Emplacement</label>
              <button
                type="button"
                className="btn btn-secondary w-100"
                onClick={handleShowMap}
              >
                Afficher la carte
              </button>
              <Modal isOpen={isMapModalOpen}>
                <CardMap onClose={handleCloseMap} />
              </Modal>
              <input
                type="hidden"
                value={formValues.latitude}
                onChange={handleChange}
                name="latitude"
              />
              <input
                type="hidden"
                value={formValues.longitude}
                onChange={handleChange}
                name="longitude"
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Descritption</label>
            <textarea
              type="text"
              name="description"
              className="form-control"
              value={formValues.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Logo/image</label>
            <input
              className="form-control"
              name="image"
              type="file"
              id="formFile"
              onChange={handleChange}
            />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <button
              type="button"
              className="btn"
              style={{
                float: "right",
                borderRadius: "20px",
                marginTop: "1%",
                border: "solid 1px rgb(231, 231, 231)",
              }}
              onClick={onCancel}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                float: "right",
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
