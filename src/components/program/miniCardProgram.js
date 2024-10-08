import React, { useState } from "react";
import "./program.css";
import { Delete02Icon, Edit02Icon, MapsLocation01Icon } from "hugeicons-react";
import FormProgram from "./formProgram";
import AlertDelete from "../util/alertDelete";

export default function MiniCardProgram(props) {
  const {
    programId,
    departure,
    arrival,
    distance,
    duration,
    icon,
    circuitId,
    selectedProgram,
    onProgramSelect,
  } = props;
  
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState();

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(
        `http://localhost:3030/circuits/${circuitId}/programs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ programId }),
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

  const handleDelete = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const url = `http://localhost:3030/circuits/${circuitId}/programs/${programId}`;
      console.log(url);

      const response = await fetch(
        `http://localhost:3030/circuits/${circuitId}/programs/${programId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
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

  const handleAlert = () => setAlert(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const durationHours = Math.floor(distance / 60);
  const roundedDistance = Math.floor(distance);

  return (
    <div className="card-horizontal mb-3" id="mini_programs">
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
        rel="stylesheet"
      />
      <div className="card-body">
        <div className="radio">
          <input
            type="radio"
            name="selectedProgram"
            value={programId}
            // checked={selectedProgram === programId}
            // onChange={() => onProgramSelect(programId)}
          />
        </div>
        <div className="card-header">
          <h5 className="card-title">
            <MapsLocation01Icon
              size={20}
              color={"#344767"}
              variant={"stroke"}
            />
            <span style={{ margin: "3px 0 0 5px", textTransform:"uppercase", fontSize:"15px" }}>
              {departure} - {arrival}
            </span>
          </h5>
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              top: "100%",
              textAlign: "center",
              marginTop: "8px",
            }}
          ></div>
        </div>
        <div className="card-content">
          <div className="card-description">
            {roundedDistance} Km | {durationHours} h
          </div>
        </div>
      </div>
    </div>
  );
}
