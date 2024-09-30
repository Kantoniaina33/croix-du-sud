import React from "react-bootstrap";
import {
  Delete02Icon,
  Edit02Icon,
  LinkSquare02Icon,
} from "hugeicons-react";
import { useState } from "react";
import AlertDelete from "../util/alertDelete";
import "../../assets/css/soft-ui-dashboard.min.css";
import FormProvider from "./formProvider";
import Modal from "../util/modal";

export default function TrProvider(props) {
  const {
    providerId,
    logo,
    name,
    city,
    phone,
    email,
    setMeals,
    latitude,
    longitude,
    location,
  } = props;
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
          <div className="d-flex px-3 py-1">
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
              <a href={`/providers/${providerId}`}>
                <h6 className="mb-0 text-sm">{name}</h6>
              </a>
            </div>
          </div>
        </td>
        <td>
          <p className="mb-0 text-sm">{city}</p>
        </td>
        <td>
          <p className="mb-0 text-sm">{email}</p>
        </td>
        <td>
          <h6 className="mb-0 text-sm">{phone}</h6>
        </td>
        <td>
          <span className="text-xs">
            <a href={`#`}>
              <span style={{ textDecoration: "underline" }}>Prestations</span>
              <LinkSquare02Icon size={15} style={{ marginLeft: "2%" }} />
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
              <FormProvider
                title="MODIFIER UN HOTEL"
                method="PUT"
                providerId={providerId}
                logo={logo}
                name={name}
                city={city}
                phone={phone}
                email={email}
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
              url={`http://localhost:3030/providers/${providerId}`}
            />
          </span>
        </td>
      </tr>
    </>
  );
}
