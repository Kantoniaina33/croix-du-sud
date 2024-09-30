import React from "react";
import { Provider01Icon } from "hugeicons-react";
import { useState } from "react";
import SelectCities from "../util/selectCities";
import Modal from "./modal";
import CardMap from "../geo/cardMap";
import { useNavigate } from "react-router-dom";

export default function TrSuggestedProvider(props) {
  const {
    providerId,
    name,
    star,
    mealPrice,
    distance,
    selectedProvider,
    onProviderSelect,
  } = props;

  const roundedDistance = Math.floor(distance);

  return (
    <tr>
      <td className="text-sm font-weight-bold mb-0">
        <input
          type="radio"
          name="selectedProvider"
          value={providerId}
          checked={selectedProvider === providerId}
          onChange={() => onProviderSelect(providerId)}
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
