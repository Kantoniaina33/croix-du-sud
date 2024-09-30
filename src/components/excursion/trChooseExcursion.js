import React from "react";
import "./excursion.css";

export default function TrChooseExcursion(props) {
  const {
    excursionId,
    image,
    place_name,
    city,
    price,
    distance,
    selectedExcursion,
    onExcursionSelect,
  } = props;

  const roundedDistance = Math.floor(distance);

  return (
    <>
      <tr className="choose">
        <td>
          <div className="d-flex px-2 py-1">
            <div
              className="d-flex flex-column justify-content-center"
              style={{ marginLeft: "5%" }}
            >
              <input
                type="checkbox"
                name="selectedExcursion"
                value={excursionId}
                checked={selectedExcursion === excursionId}
                onChange={() => onExcursionSelect(excursionId)}
              />
            </div>
          </div>
        </td>
        <td className="name">
          <h6>
            <span className="text-sm font-weight-bold mb-0">{place_name}</span>
          </h6>
        </td>
        <td>
          <span className="text-sm font-weight-bold mb-0">{price} Ar</span>
        </td>
        <td>
          <span className="text-sm font-weight-bold mb-0">
            {roundedDistance} Km
          </span>
        </td>
      </tr>
    </>
  );
}
