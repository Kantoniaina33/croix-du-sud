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
import AddProgram from "./addProgram";
import Modal from "../hotel/modal";

export default function TrCircuit(props) {
  const { circuitId, name } = props;

  const [show, setShow] = useState(false);
  const [showAddProgram, setShowAddProgram] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);


  const [alert, setAlert] = useState(false);
  const handleAlert = () => setAlert(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowAddProgram = () => setShowAddProgram(true);
  const handleShowMap = () => setIsMapModalOpen(true);


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
        <td className="align-middle text-center">
          <span className="text-secondary text-xs font-weight-bold">
            <a href={`/circuits/${circuitId}/programs`}>
              <button
                style={{ backgroundColor: "white", border: "none" }}
                // onClick={handleShowMap}
              >
                <PlusSignSquareIcon
                  size={23}
                  color={"green"}
                  variant={"stroke"}
                />
              </button>
            </a>
          </span>
        </td>
        <td className="align-middle text-center">
          <span className="text-secondary text-xs font-weight-bold">
            <button
              style={{ backgroundColor: "white", border: "none" }}
              onClick={handleShow}
            >
              <Edit02Icon color="blue" size={20} />
            </button>
            <Modal show={show} onHide={handleClose}>
              <FormCircuit
                title="MODIFIER UN CIRCUIT"
                method="PUT"
                circuitId={circuitId}
                name={name}
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
              alertMessage={`Êtes-vous sûr de vouloir supprimer le circuit ${name} ?`}
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
