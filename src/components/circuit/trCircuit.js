import React from "react-bootstrap";
import {
  Delete02Icon,
  Edit02Icon,
  StarIcon,
  LinkSquare02Icon,
  PlusSignSquareIcon,
} from "hugeicons-react";
import FormCircuit from "./formCircuit";
import { useState } from "react";
import AlertDelete from "../util/alertDelete";
import Modal from "../util/modal";

export default function TrCircuit(props) {
  const { circuitId, name, price } = props;

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
              <h6 className="mb-0 text-sm">{name}</h6>
            </div>
          </div>
        </td>
        <td>
          <div className="d-flex px-2 py-1">
            <div
              className="d-flex flex-column justify-content-center"
              style={{ marginLeft: "3%" }}
            >
              <h6 className="mb-0 text-sm">{price} Ar</h6>
            </div>
          </div>
        </td>
        <td className="align-middle text-center">
          <span className="text-secondary text-xs font-weight-bold">
            <a href={`/circuits/${circuitId}/programs`}>
              <span style={{ textDecoration: "underline" }}>Programmes</span>
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
              <FormCircuit
                title="MODIFIER UN CIRCUIT"
                method="PUT"
                circuitId={circuitId}
                name={name}
                onCancel={handleCloseModal}
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
              show={alert}
              setAlert={setAlert}
              url={`http://localhost:3030/circuits/${circuitId}`}
            />
          </span>
        </td>
      </tr>
    </>
  );
}
