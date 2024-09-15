import React, { useState } from "react";
import "./style.css";
import { Edit02Icon, Tick02Icon } from "hugeicons-react";
import { useParams } from "react-router-dom";

export default function TrMealPlanning(props) {
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
    <div className="card-body px-0 pt-0 pb-2">
      <div className="table-responsive p-0">
        <table className="table align-items-center mb-0">
          <thead>
            <tr>
              <th className="text-secondary opacity-7"></th>
              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                Repas
              </th>
              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                Prix
              </th>
              <th className="text-secondary opacity-7"></th>
            </tr>
          </thead>
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
                      {editedPrice} Ar
                    </h6>
                  )}
                </div>
              </div>
            </td>
            <td className="align-middle text-center">
              <span className="text-secondary text-xs font-weight-bold">
                <button
                  style={{ backgroundColor: "", border: "none" }}
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
        </table>
      </div>
    </div>
  );
}
