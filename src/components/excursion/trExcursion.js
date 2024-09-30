import React from "react";
import {
  Delete02Icon,
  DollarCircleIcon,
  Edit02Icon,
  Location01Icon,
} from "hugeicons-react";
import { useState } from "react";
import AlertDelete from "../util/alertDelete";
import "./excursion.css";
import Modal from "../util/modal";

export default function TrExcursion(props) {
  const { excursionId, image, place_name, city, price, distance } = props;

  const roundedDistance = Math.floor(distance);

  return (
    <>
      <tr>
        <td>
          <div className="d-flex px-2 py-1">
            <div>
              <img
                src={image}
                alt="logo"
                style={{ width: "60px", height: "60px", objectFit: "cover" }}
              />
            </div>
            <div
              className="d-flex flex-column justify-content-center"
              style={{ marginLeft: "3%" }}
            >
              <h6 className="mb-0 text-sm">{place_name}</h6>
              <p className="text-xs text-secondary mb-0">{city}</p>
            </div>
          </div>
        </td>
        <td>
          <p className="text-sm font-weight-bold mb-0">{price} Ar</p>
        </td>
        <td>
          <p className="text-sm font-weight-bold mb-0">{roundedDistance} Km</p>
        </td>
      </tr>
    </>
  );
}
