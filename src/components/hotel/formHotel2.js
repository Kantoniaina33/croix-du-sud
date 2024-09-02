import React, { useEffect } from "react";
import { Hotel01Icon } from "hugeicons-react";
import { useState } from "react";
import "./style.css";
import SelectCities from "../util/selectCities";
import MyMap from "../geo/myMap";

export default function FormHotel2(props) {
  const {
    title,
    method,
    image,
    name,
    address,
    city,
    phone,
    email,
    star,
    latitude,
    longitude,
    hotelId,
  } = props;
  const [message, setMessage] = useState("");
  const [showMap, setShowMap] = useState("none");

  const [formValues, setFormValues] = useState({
    name: name || "",
    address: address || "",
    city: city || "Antananarivo",
    phone: phone || "",
    email: email || "",
    star: star || 0,
    latitude: latitude,
    longitude: longitude,
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

    formData.append("name", formValues.name);
    formData.append("address", formValues.address);
    formData.append("city", formValues.city);
    formData.append("phone", formValues.phone);
    formData.append("email", formValues.email);
    formData.append("star", formValues.star);
    formData.append("latitude", formValues.latitude);
    formData.append("longitude", formValues.longitude);

    // formData.forEach((value, key) => {
    //   console.log(key + ": " + value);
    // });

    try {
      const idUrl = method === "PUT" ? `/${hotelId}` : "";

      const response = await fetch(`http://localhost:3030/hotels${idUrl}`, {
        method: method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

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
    }
  };

  const handleShowMap = () => setShowMap("block");

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
        rel="stylesheet"
      />
      <div className="card p-4 shadow-lg rounded-3" style={{ width: "60%" }}>
        <div
          className="card-header d-flex justify-content-between align-items-center"
          style={{ marginTop: "-4%", marginBottom: "-4%" }}
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
              className="bi bi-buildings"
              viewBox="0 0 16 16"
              color="#273385"
            >
              <path d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022M6 8.694 1 10.36V15h5zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5z" />
              <path d="M2 11h1v1H2zm2 0h1v1H4zm-2 2h1v1H2zm2 0h1v1H4zm4-4h1v1H8zm2 0h1v1h-1zm-2 2h1v1H8zm2 0h1v1h-1zm2-2h1v1h-1zm0 2h1v1h-1zM8 7h1v1H8zm2 0h1v1h-1zm2 0h1v1h-1zM8 5h1v1H8zm2 0h1v1h-1zm2 0h1v1h-1zm0-2h1v1h-1z" />
            </svg>
            <span
              style={{ marginLeft: "2%", fontSize: "25px", color: "#273385" }}
            >
              Nouvel Hotel
            </span>
          </div>
          <div
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
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          </div>
        </div>
        <div className="card-body" style={{ marginBottom: "-3%" }}>
          <form id="myForm" autocomplete="off">
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="nom" className="form-label fw-bold">
                  Nom
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nom"
                  value={formValues.name}
                  onChange={handleChange}
                  name="name"
                />
              </div>
              <div className="col">
                <label htmlFor="prenom" className="form-label fw-bold">
                  Etoiles
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={formValues.star}
                  onChange={handleChange}
                  name="star"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="nom" className="form-label fw-bold">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={formValues.email}
                  onChange={handleChange}
                  name="email"
                />
              </div>
              <div className="col">
                <label htmlFor="prenom" className="form-label fw-bold">
                  Telephone
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={formValues.phone}
                  onChange={handleChange}
                  name="phone"
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
                <label htmlFor="prenom" className="form-label fw-bold">
                  Emplacement
                </label>
                <button
                  type="button"
                  className="form-control"
                  onClick={handleShowMap}
                >
                  Afficher la carte
                </button>
                <div style={{ display: { showMap } }}>
                  <MyMap />
                </div>
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
              <label htmlFor="description" className="form-label fw-bold">
                Logo/image
              </label>
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
    </div>
  );
}
