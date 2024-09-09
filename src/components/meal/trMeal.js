import React, { useState } from "react";
import "./style.css";
import { Edit02Icon, Tick02Icon } from "hugeicons-react";
import { useParams } from "react-router-dom";

export default function TrMeal(props) {
  const { hotelId } = useParams();
  const { icon: Icon, meal, price, id } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editedPrice, setEditedPrice] = useState(price);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setEditedPrice(e.target.value);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(
        `http://localhost:3030/hotels/${hotelId}/meals/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ price: Number(editedPrice) }),
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
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <tr>
      <td>
        <div className="d-flex px-2" style={{ marginLeft: "10%" }}>
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
                type="number"
                value={editedPrice}
                onChange={handleChange}
                onBlur={handleSave}
                className="form-control"
                id="priceInput"
                autoFocus
              />
            ) : (
              <h6
                className="mb-0 text-sm"
                style={{ color: editedPrice === 0 ? "red" : "" }}
              >
                {editedPrice}
              </h6>
            )}
          </div>
        </div>
      </td>
      <td className="align-middle text-center">
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
              <Edit02Icon color="blue" size={20} />
            </button>
          )}
        </span>
      </td>
    </tr>
  );
}
