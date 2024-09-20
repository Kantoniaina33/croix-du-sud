import React from "react";
import { Hotel01Icon } from "hugeicons-react";
import { useState } from "react";
import SelectCities from "../util/selectCities";
import Modal from "./modal";
import CardMap from "../geo/cardMap";
import { useNavigate } from "react-router-dom";

export default function TrSuggestedHotel(props) {
  const {
    hotelId,
    name,
    star,
    mealPrice,
    distance,
    selectedHotel,
    onHotelSelect,
  } = props;

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
      <td className="text-sm font-weight-bold mb-0">
        <p className="text-sm font-weight-bold mb-0">{name}</p>
      </td>
      <td className="text-sm font-weight-bold mb-0">
        <p className="text-sm font-weight-bold mb-0">{star}</p>
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
