import React, { useEffect } from "react";
import { useState } from "react";
import "./program.css";

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
  } = props;
  const [message, setMessage] = useState("");

  const [formValues, setFormValues] = useState({
    departure: departure || "",
    arrival: arrival || "",
    distance: distance || 1,
    duration: duration || 1,
    description: description || "",
    departureLatitude: departureLatitude,
    departureLongitude: departureLongitude,
    arrivalLatitude: arrivalLatitude,
    arrivalLongitude: arrivalLongitude,
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
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="card card-plain mt-1">
      <div className="card-header pb-0 text-left" id="formProgram">
        <h4 className="" id="titleFormProgram">
          {/* <Program01Icon
            size={40}
            color="#273385"
            variant={"stroke"}
            style={{
              marginTop: "-1%",
              boxShadow: "0px 5px 5px 0 rgba(0, 0, 0, 0.082)",
              padding: "2%",
              borderRadius: "5px",
            }}
          /> */}
          <span style={{ marginLeft: "3%" }}>{title}</span>
        </h4>
      </div>
      <div className="card-body">
        <form>
          <div className="row mb-3">
            <div className="col-md-4">
              <label>Depart</label>
              <input
                type="text"
                className="form-control"
                value={formValues.departure}
                onChange={handleChange}
                name="departure"
              />
            </div>
            <div className="col-md-4">
              <label>Latitude</label>
              <input
                type="text"
                className="form-control"
                value={formValues.departureLatitude}
                onChange={handleChange}
                name="departureLatitude"
              />
            </div>
            <div className="col-md-4">
              <label>Longitude</label>
              <input
                type="text"
                className="form-control"
                value={formValues.departureLongitude}
                onChange={handleChange}
                name="departureLongitude"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <label>Arrive</label>
              <input
                type="text"
                className="form-control"
                value={formValues.arrival}
                onChange={handleChange}
                name="arrival"
              />
            </div>
            <div className="col-md-4">
              <label>Latitude</label>
              <input
                type="text"
                className="form-control"
                value={formValues.arrivalLatitude}
                onChange={handleChange}
                name="arrivalLatitude"
              />
            </div>
            <div className="col-md-4">
              <label>Longitude</label>
              <input
                type="text"
                className="form-control"
                value={formValues.arrivalLongitude}
                onChange={handleChange}
                name="arrivalLongitude"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label for="formFile" className="form-label">
                Distance du trajet (Km)
              </label>
              <input
                type="number"
                className="form-control"
                value={formValues.distance}
                onChange={handleChange}
                name="distance"
              />
            </div>
            <div className="col-md-6">
              <label for="formFile" className="form-label">
                Duree du trajet (h)
              </label>
              <input
                type="number"
                className="form-control"
                value={formValues.duration}
                onChange={handleChange}
                name="duration"
              />
            </div>
          </div>
          <div className="mb-3">
            <label>Descritption</label>
            <textarea
              type="text"
              name="description"
              className="form-control"
              value={formValues.description}
              onChange={handleChange}
            />
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={handleSave}
              className="btn w-100 mt-4 mb-0"
              id="saveProgram"
            >
              Enregistrer
            </button>
          </div>
          <br></br>
          <br></br>
        </form>
      </div>
    </div>
  );
}
