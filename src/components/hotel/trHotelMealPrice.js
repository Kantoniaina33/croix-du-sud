import React from "react-bootstrap";
import {
  Delete02Icon,
  Edit02Icon,
  StarIcon,
  LinkSquare02Icon,
} from "hugeicons-react";
import formHotel2 from "./formHotel2";
import { useState } from "react";
import AlertDelete from "../util/alertDelete";
import Modal from "./modal";

export default function TrHotelMealPrice(props) {
  const { hotelId, logo, name, address, city, phone, email, star, mealPrice, distance} =
    props;
  const starsArray = Array.from({ length: 5 }, (v, i) =>
    i < star ? "#ffc400" : "grey"
  );

  const [show, setShow] = useState(false);

  const [alert, setAlert] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const handleAlert = () => setAlert(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowMap = () => setIsMapModalOpen(true);

  const roundedDistance = Math.floor(distance);

  return (
    <>
      <tr>
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
              <p className="text-xs text-secondary mb-0">{address}</p>
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
    </>
  );
}
