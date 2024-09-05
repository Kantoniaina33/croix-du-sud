import React from "react-bootstrap";
import {
  Delete02Icon,
  Edit02Icon,
  StarIcon,
  LinkSquare02Icon,
} from "hugeicons-react";
import FormHotel from "./formHotel";
import { useState } from "react";
import AlertDelete from "../util/alertDelete";
import Modal from "./modal";

export default function TrHotelMealPrice(props) {
  const { hotelId, logo, name, address, city, phone, email, star, mealPrice } =
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

  return (
    <>
      <tr>
        <td>
          <div className="d-flex px-2 py-1">
            <div>
              <img
                src={logo}
                alt="logo"
                style={{ width: "60px", height: "60px" }}
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
        <td className="align-middle text-center text-sm">
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
        <td className="align-middle text-center">{mealPrice} Ar</td>
        <td className="align-middle text-center">
          <span className="text-xs">
            <a href={`/hotels/${hotelId}/rooms`}>
              <span style={{ textDecoration: "underline" }}>Chambres</span>
              <LinkSquare02Icon size={15} style={{ marginLeft: "2%" }} />
            </a>
          </span>
        </td>
        <td className="align-middle text-center">
          <span className="text-xs">
            <a href={`/hotels/${hotelId}/meals`}>
              <span style={{ textDecoration: "underline" }}>Repas</span>
              <LinkSquare02Icon size={15} style={{ marginLeft: "3%" }} />
            </a>
          </span>
        </td>
      </tr>
    </>
  );
}
