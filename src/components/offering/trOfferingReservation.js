import React from "react-bootstrap";
import { Delete02Icon, Edit02Icon, LinkSquare02Icon } from "hugeicons-react";
import { useState } from "react";
import AlertDelete from "../util/alertDelete";
import "../../assets/css/soft-ui-dashboard.min.css";
import Modal from "../util/modal";
import FormProvider from "../provider/formProvider";
import { Link } from "react-router-dom";
import ChooseOffering from "./ChooseOffering";

export default function TrOfferingReservation(props) {
  const {
    providerId,
    logo,
    name,
    city,
    phone,
    email,
    offering_typeId,
    distance,
    average_price,
    programId,
    reservationId,
    id,
  } = props;
  const [show, setShow] = useState(false);

  const [alert, setAlert] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const handleAlert = () => setAlert(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowMap = () => setIsMapModalOpen(true);
  const handleCloseModal = () => setIsMapModalOpen(false);

  const rounded_distance = Math.floor(distance);

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
                <p className="text-xs text-secondary mb-0">{city}</p>
              </a>
            </div>
          </div>
        </td>
        <td>
          <p className="mb-0 text-sm">{email}</p>
        </td>
        <td>
          <p className="mb-0 text-sm">{phone}</p>
        </td>
        {/* <td>
          <p className="mb-0 text-sm">{average_price} Ar</p>
        </td>
        <td>
          <p className="mb-0 text-sm">{rounded_distance} Km</p>
        </td> */}
        <td>
          <span className="text-xs">
            <Link
              style={{ padding: "1.5% 0% 0% 2.5%", color: "#7580cf" }}
              to={`/providers/${providerId}/types/${offering_typeId}/offerings/${id}/details`}
            >
              <span style={{ textDecoration: "underline" }}>
                Offres/Produits
              </span>
              <LinkSquare02Icon size={15} style={{ marginLeft: "2%" }} />
            </Link>
          </span>
        </td>
        <td className="align-middle text-center">
          <span className="text-secondary text-xs font-weight-bold">
            <button
              style={{ backgroundColor: "white", border: "none" }}
              onClick={handleShowMap}
            >
              Remplacer
            </button>
            <Modal isOpen={isMapModalOpen}>
              <ChooseOffering
                urlSave={`http://localhost:3030/reservations/${reservationId}/programs/${programId}/offerings`}
                offering_typeId={offering_typeId}
                programId={programId}
                onCancel={handleCloseModal}
                method="POST"
              />
            </Modal>
          </span>
        </td>
      </tr>
    </>
  );
}
