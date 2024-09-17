import React from "react";
import { Hotel01Icon } from "hugeicons-react";
import { useState } from "react";
import SelectCities from "../util/selectCities";
import Modal from "./modal";
import CardMap from "../geo/cardMap";
import { useNavigate } from "react-router-dom";

export default function ListHotelToAdd(props) {
  const {
    hotelId,  
    name,
    star,
    mealPrice,
    distance,
  } = props;

  const roundedDistance = Math.floor(distance);

  return (
    <>
      <tr>
        <td>
          <div className="d-flex px-2 py-1">
            <div
              className="d-flex flex-column justify-content-center"
              style={{ marginLeft: "3%" }}
            >
              <h6 className="mb-0 text-sm">{name}</h6>
            </div>
          </div>
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
    </>
  );

}
