import React from "react";
import { Hotel01Icon } from "hugeicons-react";
import { useState } from "react";
import SelectCities from "../util/selectCities";
import Modal from "../hotel/modal";
import CardMap from "../geo/cardMap";
import { useNavigate } from "react-router-dom";

export default function ListExcursionToAdd(props) {
  const { place_name, price } = props;

  return (
    <tr>
      <td>
        <div className="d-flex px-3 py-1">
          <div
            className="d-flex flex-column justify-content-center"
            style={{ marginLeft: "3%" }}
          >
            <h6 className="mb-0 text-sm">{place_name}</h6>
          </div>
        </div>
      </td>
      <td>
        <h6 className="mb-0 text-sm">{price} Ar</h6>
      </td>
      <td className="align-middle text-center">
        <span className="text-secondary text-xs font-weight-bold">
          <button style={{ backgroundColor: "white", border: "none" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              fill="currentColor"
              class="bi bi-plus-circle"
              viewBox="0 0 16 16"
              color="green"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>
          </button>
        </span>
      </td>
    </tr>
  );
}
