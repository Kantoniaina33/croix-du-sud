import React from "react";
import "./style.css";
import { useState } from "react";
import {
  Edit02Icon,
  Tick02Icon,
} from "hugeicons-react";

export default function TrMeal(props) {
  const { icon: Icon, meal, price } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editedPrice, setEditedPrice] = useState(price);

  const handleEditClick = () => {
    setIsEditing(true);
    console.log("edit");
  };
  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handlePriceChange = (e) => setEditedPrice(e.target.value);

  return (
    <tr>
      <td>
        <div className="d-flex px-2">
          <Icon size={24} color={"#000000"} />
        </div>
      </td>
      <td>
        <div className="d-flex px-2">
          <div className="my-auto">
            <h6 className="mb-0 text-sm">{meal}</h6>
          </div>
        </div>
      </td>
      <td>
        <div className="d-flex px-2">
          <div className="my-auto">
            {isEditing ? (
              <input
                type="text"
                value={editedPrice}
                onChange={handlePriceChange}
                onBlur={handleSaveClick}
                className="form-control"
                id="priceInput"
                autoFocus
              />
            ) : (
              <h6 className="mb-0 text-sm">{editedPrice}</h6>
            )}
          </div>
        </div>
      </td>
      <td className="align-middle text-center">
        <span className="text-secondary text-xs font-weight-bold">
          {isEditing ? (
            <button
              style={{ backgroundColor: "white", border: "none" }}
              onClick={handleEditClick}
            >
              <Tick02Icon size={30} color="blue" />
            </button>
          ) : (
            <button
              style={{ backgroundColor: "white", border: "none" }}
              onClick={handleEditClick}
            >
              <Edit02Icon color="blue" size={20} />
            </button>
          )}
        </span>
      </td>
    </tr>
  );
}
