import React, { useState } from "react";
import "./style.css";
import { Edit02Icon, Tick02Icon } from "hugeicons-react";
import { useParams } from "react-router-dom";

export default function TrMealPlanning(props) {
  const { hotelId } = useParams();
  const { meal, price, id, totalPerson } = props;
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
        <div className="d-flex px-4">
          <div className="my-auto">
            <h6 className="mb-0 text-sm">{meal}</h6>
          </div>
        </div>
      </td>
      <td>
        <div className="d-flex px-2">
          <div className="my-auto">
            <h6 className="mb-0 text-sm">{price} Ar</h6>
          </div>
        </div>
      </td>
      <td>
        <div className="d-flex px-2">
          <div className="my-auto">
            <h6 className="mb-0 text-sm">{price * totalPerson} Ar</h6>
          </div>
        </div>
      </td>
      <td className="align-middle text-center">
        <span className="text-secondary text-xs font-weight-bold">
          <button
            style={{ backgroundColor: "white", border: "none" }}
            onClick={handleSave}
          >
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
            </svg>{" "}
          </button>
        </span>
      </td>
    </tr>
  );
}
