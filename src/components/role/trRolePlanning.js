import React from "react";
import {
  Delete02Icon,
  DollarCircleIcon,
  Edit02Icon,
  Location01Icon,
  Tick02Icon,
} from "hugeicons-react";
import { useState } from "react";
import AlertDelete from "../util/alertDelete";

export default function TrRolePlanning(props) {
  const { roleId, roleName, number, price, programId, id, totalPrice } = props;
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedNumber, setEditedPrice] = useState(number);
  const [alert, setAlert] = useState(false);
  const handleAlert = () => setAlert(true);
  const handleChange = (e) => {
    setEditedPrice(e.target.value);
  };
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(
        `http://localhost:3030/programs/${programId}/staff/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ number: Number(editedNumber) }),
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

      setIsEditing(false);
      //  window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <tr>
      <td>
        <div className="d-flex px-3 py-1">
          <div
            className="d-flex flex-column justify-content-center"
            style={{ marginLeft: "3%" }}
          >
            <h6 className="mb-0 text-sm">{roleName}</h6>
          </div>
        </div>
      </td>
      <td>
        {isEditing ? (
          <input
            type="number"
            value={editedNumber}
            onChange={handleChange}
            className="form-control"
            id="priceInput"
            autoFocus
            style={{ width: "80px" }}
          />
        ) : (
          <h6
            className="mb-0 text-sm"
            style={{ color: editedNumber === 0 ? "red" : "" }}
          >
            {editedNumber}
          </h6>
        )}
      </td>
      <td>
        <h6 className="mb-0 text-sm">{price} Ar</h6>
      </td>
      <td>
        <h6 className="mb-0 text-sm">{totalPrice} Ar</h6>
      </td>
      <td>
        <span className="text-secondary text-xs font-weight-bold">
          {isEditing ? (
            <button
              style={{ backgroundColor: "white", border: "none" }}
              onClick={handleSave}
            >
              <Tick02Icon size={30} color="blue" />
            </button>
          ) : (
            <button
              style={{ backgroundColor: "white", border: "none" }}
              onClick={handleEditClick}
            >
              <Edit02Icon size={20} color="blue" />
            </button>
          )}
        </span>
      </td>
      <td>
        <span className="text-secondary text-xs font-weight-bold">
          <button
            style={{ backgroundColor: "white", border: "none" }}
            onClick={handleAlert}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-dash-circle"
              viewBox="0 0 16 16"
              color="red"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
            </svg>{" "}
          </button>
          <AlertDelete
            alertMessage={`Êtes-vous sûr de vouloir supprimer blabla ?`}
            alertDetail="Toutes les chambres et repas associés seront également supprimés."
            show={alert}
            setAlert={setAlert}
            url={`http://localhost:3030/programs/${programId}/staff/${id}`}
          />
        </span>
      </td>
    </tr>
  );
}
