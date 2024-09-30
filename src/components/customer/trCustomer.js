import React from "react-bootstrap";
import { Delete02Icon, Edit02Icon, LinkSquare02Icon } from "hugeicons-react";
import FormCustomer from "./formCustomer";
import { useState } from "react";
import AlertDelete from "../util/alertDelete";
import Modal from "../util/modal";
import { Link } from "react-router-dom";

export default function TrCustomer(props) {
  const { customerRef, firstName, name, contact, customerId } = props;

  const customerInfo = { firstName: firstName, name: name };

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
    <>
      <tr>
        <td>
          <div className="d-flex px-2 py-1">
            <div
              className="d-flex flex-column justify-content-center"
              style={{ marginLeft: "3%" }}
            >
              <h6 className="mb-0 text-sm">{customerRef}</h6>
            </div>
          </div>
        </td>
        <td>
          <p className="text-sm font-weight-bold mb-0">
            {firstName} {name}
          </p>
        </td>
        <td>
          <p className="text-sm font-weight-bold mb-0">{contact}</p>
        </td>
        <td className="align-middle text-center">
          <span className="text-secondary text-xs font-weight-bold">
            <Link
              to={`/customers/${customerId}/reservations`}
              state={customerInfo}
              style={{ textDecoration: "underline" }}
            >
              Reservations
              <LinkSquare02Icon size={15} style={{ marginLeft: "3%" }} />
            </Link>
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
              show={alert}
              setAlert={setAlert}
              url={`http://localhost:3030/customers/${customerId}`}
            />
          </span>
        </td>
      </tr>
    </>
  );
}
