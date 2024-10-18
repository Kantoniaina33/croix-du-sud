import React from "react-bootstrap";
import { Delete02Icon, Edit02Icon, LinkSquare02Icon } from "hugeicons-react";
import FormReservation from "./formReservation";
import { useState } from "react";
import AlertDelete from "../util/alertDelete";
import { Link } from "react-router-dom";

export default function TrReservation(props) {
  const {
    reservationId,
    reservationRef,
    reservationDate,
    circuit,
    circuitId,
    customerId,
    customerInfo,
    totalPersons,
  } = props;

  const [show, setShow] = useState(false);
  const [showAddProgram, setShowAddProgram] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const [alert, setAlert] = useState(false);
  const handleAlert = () => setAlert(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowAddProgram = () => setShowAddProgram(true);
  const handleShowMap = () => setIsMapModalOpen(true);
  const handleCloseModal = () => setIsMapModalOpen(false);

  return (
    <tr>
      <td>
        <div className="d-flex px-2 py-1">
          <div
            className="d-flex flex-column justify-content-center"
            style={{ marginLeft: "3%" }}
          >
            <h6 className="mb-0 text-sm">{reservationRef}</h6>
          </div>
        </div>
      </td>
      <td>
        <p className="text-sm font-weight-bold mb-0">{reservationDate}</p>
      </td>
      <td>
        <p className="text-sm font-weight-bold mb-0">
          {circuit} {totalPersons} hey
        </p>
      </td>
      <td className="text-xs">
        <Link
          to={`/customers/${customerId}/reservations/${reservationId}/planning`}
          state={{ customerInfo, circuitId, totalPersons }}
          style={{ textDecoration: "underline" }}
        >
          Planning
          <LinkSquare02Icon size={15} style={{ marginLeft: "3%" }} />
        </Link>
      </td>
    </tr>
  );
}
