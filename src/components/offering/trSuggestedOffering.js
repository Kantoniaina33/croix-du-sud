import React from "react";
import { Offering01Icon } from "hugeicons-react";
import { useState } from "react";
import SelectCities from "../util/selectCities";
import Modal from "../util/modal";
import CardMap from "../geo/cardMap";
import { useNavigate } from "react-router-dom";

export default function TrSuggestedOffering(props) {
  const {
    providerId,
    image,
    name,
    city,
    phone,
    email,
    offering_typeId,
    distance,
    average_price,
    id,
    selectedOffering,
    onOfferingSelect,
  } = props;

  const roundedDistance = Math.floor(distance);
  const roundedPrice = Math.floor(average_price);

  return (
    <tr>
      <td className="text-sm font-weight-bold mb-0">
        <input
          type="radio"
          name="selectedOffering"
          value={id}
          checked={selectedOffering === id}
          onChange={() => onOfferingSelect(id)}
        />
      </td>
      <td>
        <div className="d-flex py-1">
          <div>
            <img
              src={image}
              alt="image"
              style={{ width: "40px", height: "40px", objectFit: "cover" }}
            />
          </div>
          <div
            className="d-flex flex-column justify-content-center"
            style={{ marginLeft: "3%" }}
          >
            <h6 className="mb-0 text-sm">{name}</h6>
          </div>
        </div>
      </td>
      <td>
        <p className="text-sm font-weight-bold mb-0">{roundedPrice} Ar</p>
      </td>
      <td>
        <p className="text-sm font-weight-bold mb-0">{roundedDistance} Km</p>
      </td>
    </tr>
  );
}
