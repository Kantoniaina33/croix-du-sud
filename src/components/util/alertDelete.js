import { Button, Modal } from "react-bootstrap";
import React, { useState } from "react";
import "./style.css";
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
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          setMessage("Probleme lors de la suppression");
        } else {
          setMessage("Login failed");
        }
        return;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClose = () => setAlert(false);

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="alert">
      <div className="iconAlert">
        <AlertCircleIcon size={30} color="red" />
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
          Annuler
        </button>
        <button
          type="button"
          onClick={handleDelete}
          id="confirmer"
          className="btn btn-outline-primary btn-sm mb-0"
        >
          Confirmer
        </button>
      </div>
    </Modal>
  );
}
