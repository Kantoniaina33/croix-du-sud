import React, { useEffect } from "react";
import { useState } from "react";
import "./style.css";
import { CircleIcon } from "hugeicons-react";
import SelectRoles from "../util/selectRoles";
import { useNavigate } from "react-router-dom";
import FormRoleEmployee from "./formRoleEmployee";
import Modal from "../hotel/modal";

export default function FormEmployee2(props) {
  const {
    title,
    method,
    firstName,
    name,
    birthDate,
    genre,
    email,
    phone,
    employeeId,
    onCancel,
    onClose,
  } = props;

  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const [formValues, setFormValues] = useState({
    firstName: firstName || "",
    name: name,
    birthDate: birthDate || "",
    genre: genre || "Homme",
    email: email,
    phone: phone,
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
    console.log(formValues);
    const idUrl = method === "PUT" ? `/${employeeId}` : "";
    try {
      const response = await fetch(`http://localhost:3030/employees${idUrl}`, {
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
      const data = await response.json();
      const employee = data.employee;
      onClose(employee);

      setIsMapModalOpen(false);
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
            width="25"
            height="25"
            fill="currentColor"
            class="bi bi-person-fill"
            viewBox="0 0 16 16"
          >
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
          </svg>
          <span
            style={{ marginLeft: "2%", fontSize: "25px", color: "#273385" }}
          >
            Employe
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
        <form id="myForm" autocomplete="off" style={{ marginTop: "-6%" }}>
          <div className="row mb-3">
            <div className="col">
              <label className="form-label fw-bold">Nom</label>
              <input
                type="text"
                className="form-control"
                value={formValues.firstName}
                onChange={handleChange}
                name="firstName"
              />
            </div>
            <div className="col">
              <label className="form-label fw-bold">Prenom</label>
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
                Genre
              </label>
              <select
                className="form-select"
                value={formValues.genre}
                onChange={handleChange}
                name="genre"
              >
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
              </select>
            </div>
            <div className="col">
              <label htmlFor="prenom" className="form-label fw-bold">
                Date de naissance
              </label>
              <input
                type="date"
                className="form-control"
                value={formValues.birthDate}
                onChange={handleChange}
                name="birthDate"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label className="form-label fw-bold">Email</label>
              <input
                type="email"
                className="form-control"
                value={formValues.email}
                onChange={handleChange}
                name="email"
              />
            </div>
            <div className="col">
              <label className="form-label fw-bold">Telephone</label>
              <input
                type="number"
                className="form-control"
                value={formValues.phone}
                onChange={handleChange}
                name="phone"
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
              onClick={handleSave}
            >
              Suivant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
