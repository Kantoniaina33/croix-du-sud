import React from "react";
import { Hotel01Icon, StarIcon } from "hugeicons-react";
import { useState } from "react";
import SelectCities from "../util/selectCities";
import Modal from "./modal";
import CardMap from "../geo/cardMap";
import { useNavigate } from "react-router-dom";
import TrHotelMealPrice from "./trHotelMealPrice";

export default function TrChooseHotel(props) {
  const {
    hotelId,
    name,
    star,
    mealPrice,
    email,
    phone,
    city,
    logo,
    distance,
    selectedHotel,
    onHotelSelect,
  } = props;

  const starsArray = Array.from({ length: 5 }, (v, i) =>
    i < star ? "#ffc400" : "grey"
  );

  const roundedDistance = Math.floor(distance);

  return (
    <tr>
      <td className="text-sm font-weight-bold mb-0">
        <input
          type="radio"
          name="selectedHotel"
          value={hotelId}
          checked={selectedHotel === hotelId}
          onChange={() => onHotelSelect(hotelId)}
        />
      </td>
      <td>
        <div className="d-flex px-2 py-1">
          <div>
            <img
              src={logo}
              alt="logo"
              style={{ width: "60px", height: "60px", objectFit: "cover" }}
            />
          </div>
          <div
            className="d-flex flex-column justify-content-center"
            style={{ marginLeft: "3%" }}
          >
            <h6 className="mb-0 text-sm">{name}</h6>
            <p className="text-xs text-secondary mb-0">{city}</p>
          </div>
        </div>
      </td>
      <td>
        <p className="text-sm font-weight-bold mb-0">{phone}</p>
        <p className="text-sm text-secondary mb-0">{email}</p>
      </td>
      <td className="text-sm font-weight-bold mb-0">
        <span>
          {starsArray.map((color, index) => (
            <StarIcon
              key={index}
              color={color}
              size={17}
              style={{ margin: "1%" }}
            />
          ))}
        </span>
      </td>
      <td>
        <p className="text-sm font-weight-bold mb-0">{mealPrice} Ar</p>
      </td>
      <td>
        <p className="text-sm font-weight-bold mb-0">{roundedDistance} Km</p>
      </td>
    </tr>
  );
}
