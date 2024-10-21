import React from "react";
import { BedDoubleIcon } from "hugeicons-react";
import { useState } from "react";
import SelectOfferingOptions from "../util/selectOfferingOptions";

export default function FormOfferingDetail(props) {
  const {
    title,
    method,
    offering_optionId,
    name,
    unit_price,
    capacity,
    total,
    id,
    onCancel,
    offeringId,
    offering_typeId,
    providerId,
  } = props;
  const [message, setMessage] = useState("");

  const [formValues, setFormValues] = useState({
    offering_optionId: offering_optionId || "",
    name: name || "",
    unit_price: unit_price,
    capacity: capacity || 1,
    total: total || 1,
  });

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
    const idUrl = method === "PUT" ? `/${id}` : "";

    try {
      const response = await fetch(
        `http://localhost:3030/providers/${providerId}/types/${offering_typeId}/offerings/${offeringId}/details${idUrl}`,
        {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          setMessage("Problem");
        } else {
          setMessage("Failed");
        }
        return;
      }
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="card p-4 shadow-lg rounded-3" style={{ width: "50%" }}>
      <div
        className="card-header d-flex justify-content-between align-items-center"
        style={{ marginBottom: "2%", height: "50px" }}
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
            Informations sur les prestations
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
              class="bi bi-x-circle"
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
        <form
          onSubmit={handleSave}
          id="myForm"
          autocomplete="off"
          style={{ marginTop: "-6%" }}
        >
          <div className="row mb-3">
            <div className="col">
              <label className="form-label fw-bold">
                Produit/Service proposé
              </label>
              <input
                type="text"
                className="form-control"
                value={formValues.name}
                onChange={handleChange}
                name="name"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="nom" className="form-label fw-bold">
                Description
              </label>
              <textarea
                className="form-control"
                name="description"
                value={formValues.description}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label className="form-label fw-bold">Type</label>
              <SelectOfferingOptions
                value={formValues.offering_optionId}
                onChange={handleChange}
                name="offering_optionId"
                typeId={offering_typeId}
              />
            </div>
            <div className="col">
              <label htmlFor="nom" className="form-label fw-bold">
                Capacite
              </label>
              <input
                type="number"
                className="form-control"
                value={formValues.capacity}
                onChange={handleChange}
                name="capacity"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="prenom" className="form-label fw-bold">
                Tarif (par jour)
              </label>
              <input
                type="number"
                className="form-control"
                value={formValues.unit_price}
                onChange={handleChange}
                name="unit_price"
              />
            </div>
            <div className="col">
              <label htmlFor="nom" className="form-label fw-bold">
                Total
              </label>
              <input
                type="number"
                className="form-control"
                value={formValues.total}
                onChange={handleChange}
                name="total"
              />
            </div>
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
