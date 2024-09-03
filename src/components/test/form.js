import React, { useState } from "react";
import "./style.css";

export default function Form() {
  const [imageVisible, setImageVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setImageVisible(true);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
        rel="stylesheet"
      />
      <div
        className="card p-4 shadow-lg rounded-3 d-flex flex-row"
        style={{ width: "80%", marginBottom: "-4%" }}
      >
        <div
          className="card-body flex-grow-1"
          style={{ marginBottom: "-3%" }}
        >
          <div
            className="card-header d-flex justify-content-between align-items-center"
            style={{ marginTop: "-2%", marginBottom: "-4%" }}
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
          <form id="myForm" autoComplete="off" onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="nom" className="form-label fw-bold">
                  Nom
                </label>
                <input type="text" className="form-control" id="nom" />
              </div>
              <div className="col">
                <label htmlFor="prenom" className="form-label fw-bold">
                  Prénom
                </label>
                <input type="text" className="form-control" id="prenom" />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label fw-bold">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                rows="3"
              ></textarea>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <button
                type="button"
                className="btn"
                style={{
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
                  borderRadius: "20px",
                  marginTop: "1%",
                }}
              >
                Enregistrer
              </button>
            </div>
          </form>
        </div>
        {imageVisible && (
          <div
            className="image-container"
            style={{ flexShrink: 0, marginLeft: "20px" }}
          >
            <img
              src="tsimbazaza.jpg"
              alt="Aperçu"
              style={{
                borderRadius: "10px",
                maxHeight: "300px",
                width: "100%",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
