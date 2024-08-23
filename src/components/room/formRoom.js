import React from "react";
import { BedDoubleIcon } from "hugeicons-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import SelectRoomTypes from "../util/selectRoomTypes";
import SelectPriceCategories from "../util/selectPriceCategories";

export default function FormRoom(props) {
  const {
    title,
    method,
    room_type,
    capacity,
    price_category,
    price,
    number_of_rooms,
    id,
  } = props;
  const { hotelId } = useParams();
  const [message, setMessage] = useState("");

  const [formValues, setFormValues] = useState({
    room_type: room_type || "Single",
    capacity: capacity || 1,
    price_category: price_category || "Premier",
    price: price || "",
    number_of_rooms: number_of_rooms || 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");
    const idUrl = method === "PUT" ? `/${id}` : "";

    try {
      const response = await fetch(
        `http://localhost:3030/hotels/${hotelId}/rooms${idUrl}`,
        {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          setMessage("Probleme");
        } else {
          setMessage("Failed");
        }
        return;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="card card-plain mt-1" id="infoBack">
      <div className="card-header pb-0 text-left bg-transparent">
        <h5 className="" id="infoTitle">
          <BedDoubleIcon
            size={40}
            color="#273385"
            variant={"stroke"}
            style={{
              marginTop: "-1%",
              boxShadow: "0px 5px 5px 0 rgba(0, 0, 0, 0.082)",
              padding: "2%",
              borderRadius: "5px",
            }}
          />
          <span style={{ marginLeft: "3%" }}>{title}</span>
        </h5>
      </div>
      <div className="card-body">
        <form>
          <div className="row mb-3">
            <div className="col-md-6">
              <label>Type</label>
              <SelectRoomTypes
                value={formValues.room_type}
                onChange={handleChange}
                name="room_type"
              />
            </div>
            <div className="col-md-6">
              <label>Capacite</label>
              <input
                type="number"
                className="form-control"
                value={formValues.capacity}
                onChange={handleChange}
                name="capacity"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label>Categorie de prix</label>
              <SelectPriceCategories
                value={formValues.price_category}
                onChange={handleChange}
                name="price_category"
              />
            </div>
            <div className="col-md-6">
              <label>Tarif par nuit</label>
              <input
                type="text"
                className="form-control"
                value={formValues.price}
                onChange={handleChange}
                name="price"
              />
            </div>
          </div>
          <div className="mb-3">
            <label for="formFile" className="form-label">
              Nombre total
            </label>
            <input
              type="number"
              className="form-control"
              value={formValues.number_of_rooms}
              onChange={handleChange}
              name="number_of_rooms"
            />
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={handleSave}
              className="btn w-100 mt-4 mb-0"
              id="saveInfo"
            >
              Enregistrer
            </button>
          </div>
          <br></br>
          <br></br>
        </form>
      </div>
    </div>
  );
}
