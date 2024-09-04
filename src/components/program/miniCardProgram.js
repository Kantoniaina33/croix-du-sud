import React, { useState } from "react";
import "./style.css";
import { Delete02Icon, Edit02Icon, MapsLocation01Icon } from "hugeicons-react";
import { Modal } from "react-bootstrap";
import FormProgram from "./formProgram";
import AlertDelete from "../util/alertDelete";

export default function MiniCardProgram(props) {
  const { programId, departure, arrival, distance, duration, icon } = props;

  const [show, setShow] = useState(false);

  const [alert, setAlert] = useState(false);
  const handleAlert = () => setAlert(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="card-horizontal mb-3" id="mini_programs">
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
        rel="stylesheet"
      />
      <div className="card-body">
        <div className="card-header">
          <h5 className="card-title">
            <MapsLocation01Icon
              size={25}
              color={"#344767"}
              variant={"stroke"}
            />
            <span style={{ margin: "3px 0 0 5px" }}>
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
            {distance} Km | {duration} h
          </div>
          <div className="icon">
            <button
              style={{
                backgroundColor: "white",
                border: "transparent",
              }}
              onClick={handleShow}
            >
              {icon == "minus" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="23"
                  fill="currentColor"
                  class="bi bi-dash-circle"
                  viewBox="0 0 16 16"
                  color="red"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="23"
                  fill="currentColor"
                  class="bi bi-plus-circle"
                  viewBox="0 0 16 16"
                  color="green"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
