import { Button, Modal } from "react-bootstrap";
import React, { useState } from "react";
import "./util.css";
import { AlertCircleIcon } from "hugeicons-react";

export default function AlertDelete(props) {
  const { alertMessage, alertDetail, url, show, setAlert } = props;
  const [message, setMessage] = useState("");

  const handleDelete = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          setMessage("Problem lors de la suppression");
        } else {
          setMessage("Login failed");
        }
        return;
      }
      setAlert(false);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClose = () => setAlert(false);

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="alert">
      <div className="iconAlert">
        <AlertCircleIcon size={30} color="rgb(219, 1, 1)" />
      </div>
      <div className="bodyAlert">
        <div>{alertMessage}</div>
        <div className="detailAlert">{alertDetail}</div>
      </div>
      <div className="alertFooter">
        <button
          type="button"
          onClick={handleClose}
          className="btn btn-outline-primary btn-sm mb-0"
          id="annuler"
        >
          Non
        </button>
        <button
          type="button"
          onClick={handleDelete}
          id="confirmer"
          className="btn btn-outline-primary btn-sm mb-0"
        >
          Oui
        </button>
      </div>
    </Modal>
  );
}
