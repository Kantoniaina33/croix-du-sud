import React, { useEffect } from "react";
import { useState } from "react";
import "./reservation.css";
import SelectCustomers from "../util/selectCustomers";
import SelectCircuits from "../util/selectCircuits";

export default function FormReservation(props) {
  const {
    title,
    method,
    budget,
    startDate,
    duration,
    customerId,
    circuitId,
    reservationId,
  } = props;
  const [message, setMessage] = useState("");

  const [formValues, setFormValues] = useState({
    budget: budget || null,
    startDate: startDate,
    duration: duration,
    customerId: customerId,
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
    console.log(formValues);
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
    }
  };

  return (
    <div className="card card-plain mt-1">
      <div className="card-header pb-0 text-left" id="formReservation">
        <h4 className="" id="titleFormReservation">
          {/* <Reservation01Icon
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
          <div className="mb-3">
            <label>Client</label>
            <SelectCustomers
              value={formValues.customerId}
              onChange={handleChange}
              name="customerId"
            />
          </div>
          <div className="mb-3">
            <label>Circuit</label>
            <SelectCircuits
              value={formValues.circuitId}
              onChange={handleChange}
              name="circuitId"
            />
          </div>
          <div className="mb-3">
            <label>Date du voyage</label>
            <input
              type="date"
              className="form-control"
              value={formValues.startDate}
              onChange={handleChange}
              name="startDate"
            />
          </div>
          <div className="mb-3">
            <label>Duree</label>
            <input
              type="number"
              className="form-control"
              value={formValues.duration}
              onChange={handleChange}
              name="duration"
            />
          </div>
          <div className="mb-3">
            <label>Budget</label>
            <input
              type="number"
              className="form-control"
              value={formValues.budget}
              onChange={handleChange}
              name="budget"
            />
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={handleSave}
              className="btn w-100 mt-4 mb-0"
              id="saveReservation"
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
