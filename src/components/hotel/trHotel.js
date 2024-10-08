import React from "react-bootstrap";
import {
  Delete02Icon,
  Edit02Icon,
  StarIcon,
  LinkSquare02Icon,
} from "hugeicons-react";
import { useState } from "react";
import AlertDelete from "../util/alertDelete";
import Modal from "../util/modal";
import "../../assets/css/soft-ui-dashboard.min.css";
import FormHotel from "./formHotel";

export default function TrHotel(props) {
  const {
    hotelId,
    logo,
    name,
    address,
    city,
    phone,
    email,
    star,
    setMeals,
    latitude,
    longitude,
    location,
  } = props;
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
  const handleCloseModal = () => setIsMapModalOpen(false);

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
              <a href={`/hotels/${hotelId}`}>
                <h6 className="mb-0 text-sm">{name}</h6>
              </a>
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
            {setMeals == false && <span style={{ color: "red" }}>*</span>}
            <a href={`/hotels/${hotelId}/meals`}>
              <span style={{ textDecoration: "underline" }}>Repas</span>
              <LinkSquare02Icon size={15} style={{ marginLeft: "3%" }} />
            </a>
          </span>
        </td>
        <td className="align-middle text-center">
          <span className="text-secondary text-xs font-weight-bold">
            <button
              style={{ backgroundColor: "white", border: "none" }}
              onClick={handleShowMap}
            >
              <Edit02Icon color="blue" size={20} />
            </button>
            <Modal isOpen={isMapModalOpen}>
              <FormHotel
                title="MODIFIER UN HOTEL"
                method="PUT"
                hotelId={hotelId}
                logo={logo}
                name={name}
                address={address}
                city={city}
                phone={phone}
                email={email}
                star={star}
                isOpen={isMapModalOpen}
                onCancel={handleCloseModal}
                latitude={latitude}
                longitude={longitude}
                location={location}
              />
            </Modal>
          </span>
        </td>
        <td className="align-middle text-center">
          <span className="text-secondary text-xs font-weight-bold">
            <button
              style={{ backgroundColor: "white", border: "none" }}
              onClick={handleAlert}
            >
              <Delete02Icon color="rgb(219, 1, 1)" size={23} />
            </button>
            <AlertDelete
              alertMessage={`Êtes-vous sûr de vouloir supprimer ${name} ?`}
              alertDetail="Toutes les chambres et repas associés seront également supprimés."
              show={alert}
              setAlert={setAlert}
              url={`http://localhost:3030/hotels/${hotelId}`}
            />
          </span>
        </td>
      </tr>
    </>
  );
}
