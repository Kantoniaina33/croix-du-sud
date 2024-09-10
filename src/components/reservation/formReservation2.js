import React, { useEffect } from "react";
import { useState } from "react";
import "./reservation.css";
import SelectCircuits from "../util/selectCircuits";
import { useParams } from "react-router-dom";

export default function FormReservation2(props) {
  const {
    title,
    method,
    budget,
    startDate,
    duration,
    customerId,
    circuitId,
    reservationId,
    onCancel,
  } = props;

  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    budget: budget,
    startDate: startDate,
    duration: duration,
    customerId: id,
    circuitId: circuitId,
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
    setIsLoading(true);

    try {
      const idUrl = method === "PUT" ? `/${reservationId}` : "";

      const response = await fetch(
        `http://localhost:3030/reservations${idUrl}`,
        {
          method: method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card p-4 shadow-lg rounded-3" style={{ width: "60%" }}>
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
            width="25"
            height="25"
            fill="currentColor"
            class="bi bi-luggage-fill"
            viewBox="0 0 16 16"
          >
            <path d="M2 1.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V5h.5A1.5 1.5 0 0 1 8 6.5V7H7v-.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5H4v1H2.5v.25a.75.75 0 0 1-1.5 0v-.335A1.5 1.5 0 0 1 0 13.5v-7A1.5 1.5 0 0 1 1.5 5H2zM3 5h2V2H3z" />
            <path d="M2.5 7a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0v-5a.5.5 0 0 1 .5-.5m10 1v-.5A1.5 1.5 0 0 0 11 6h-1a1.5 1.5 0 0 0-1.5 1.5V8H8v8h5V8zM10 7h1a.5.5 0 0 1 .5.5V8h-2v-.5A.5.5 0 0 1 10 7M5 9.5A1.5 1.5 0 0 1 6.5 8H7v8h-.5A1.5 1.5 0 0 1 5 14.5zm9 6.5V8h.5A1.5 1.5 0 0 1 16 9.5v5a1.5 1.5 0 0 1-1.5 1.5z" />
          </svg>
          <span
            style={{ marginLeft: "2%", fontSize: "25px", color: "#273385" }}
          >
            Réservation de voyage
          </span>
        </div>
        {/* <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            class="bi bi-x-circle"
            viewBox="0 0 16 16"
            color="#273385"
            onClick={onCancel}
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>
        </div> */}
      </div>
      <div className="card-body" style={{ marginBottom: "-3%" }}>
        <form id="myForm" autocomplete="off" style={{ marginTop: "-6%" }}>
          <div className="row mb-3">
            <div className="col">
              <label className="form-label fw-bold">Circuit</label>
              <SelectCircuits
                value={formValues.circuitId}
                onChange={handleChange}
                name="circuitId"
              />
            </div>
            <div className="col">
              <label className="form-label fw-bold">Date du voyage</label>
              <input
                type="date"
                className="form-control"
                value={formValues.startDate}
                onChange={handleChange}
                name="startDate"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="nom" className="form-label fw-bold">
                Durée (j)
              </label>
              <input
                type="number"
                className="form-control"
                value={formValues.duration}
                onChange={handleChange}
                name="duration"
              />
            </div>
            <div className="col">
              <label htmlFor="prenom" className="form-label fw-bold">
                Budget
              </label>
              <input
                type="number"
                className="form-control"
                value={formValues.budget}
                onChange={handleChange}
                name="budget"
              />
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            {/* <button
              type="button"
              className="btn"
              style={{
                float: "right",
                borderRadius: "20px",
                marginTop: "1%",
                border: "solid 1px rgb(231, 231, 231)",
              }}
            >
              <a>Retour</a>
            </button> */}
            <p></p>
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                float: "right",
                borderRadius: "20px",
                marginTop: "1%",
              }}
              onClick={handleSave}
            >
              {isLoading ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Enregistrer"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
