import React from "react";
import { Provider01Icon } from "hugeicons-react";
import { useState } from "react";
import SelectCities from "../util/selectCities";
import CardMap from "../geo/cardMap";
import { useNavigate } from "react-router-dom";

export default function TrAddOfferingDetailReservation(props) {
  const {
    offeringDetailId,
    option,
    offering_name,
    unit_price,
    capacity,
    setOfferingDetailsData,
  } = props;

  const [isSelected, setIsSelected] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editedNumber, setEditedNumber] = useState(1);

  const handleAddRole = (e) => {
    e.preventDefault();
    setIsSelected(true);
    setIsEditing(true);

    setOfferingDetailsData((prevRolesId) => {
      if (offeringDetailId && !prevRolesId.includes(offeringDetailId)) {
        return [
          ...prevRolesId,
          { offeringDetailId: offeringDetailId, quantity: editedNumber },
        ];
      }
      return prevRolesId;
    });
  };

  const handleChange = (e) => {
    setEditedNumber(e.target.value);
    console.log(editedNumber);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setIsSelected(false);
    setIsEditing(false);

    setOfferingDetailsData((prevRolesId) => {
      return prevRolesId.filter((id) => id !== offeringDetailId);
    });
  };

  return (
    <tr>
      <td>
        <span className="text-secondary text-xs font-weight-bold">
          {isSelected ? (
            <button
              style={{ backgroundColor: "white", border: "none" }}
              onClick={handleCancel}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                fill="currentColor"
                className="bi bi-check-circle-fill"
                viewBox="0 0 16 16"
                color="green"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
              </svg>
            </button>
          ) : (
            <button
              style={{ backgroundColor: "white", border: "none" }}
              onClick={handleAddRole}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                fill="currentColor"
                className="bi bi-plus-circle"
                viewBox="0 0 16 16"
                color="green"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
            </button>
          )}
        </span>
      </td>
      <td className="text-sm font-weight-bold mb-0">
        <p className="text-sm font-weight-bold mb-0">{offering_name}</p>
      </td>
      <td>
        <span className="text-sm font-weight-bold mb-0">{option}</span>
      </td>
      <td>
        <p className="text-sm font-weight-bold mb-0">{capacity}</p>
      </td>
      <td>
        <p className="text-sm font-weight-bold mb-0">{unit_price} Ar/</p>
      </td>
      {isEditing && (
        <td>
          <div className="my-auto">
            <input
              style={{ width: "80px" }}
              type="number"
              value={editedNumber}
              onChange={handleChange}
              className="form-control"
              name="editedNumber"
              autoFocus
            />
          </div>
        </td>
      )}
    </tr>
  );
}
