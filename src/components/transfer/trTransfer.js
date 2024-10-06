import React from "react-bootstrap";
import {
  Delete02Icon,
  Edit02Icon,
  StarIcon,
  LinkSquare02Icon,
  PlusSignSquareIcon,
} from "hugeicons-react";
import FormTransfer from "./formTransfer";
import { useState } from "react";
import AlertDelete from "../util/alertDelete";
import Modal from "../util/modal";

export default function TrTransfer(props) {
  const { transferId, departure, arrival, price } = props;

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
              <h6 className="text-uppercase mb-0 text-sm">
                {departure} - {arrival}
              </h6>
            </div>
          </div>
        </td>
        <td>
          <h6 className="mb-0 text-sm">{price}</h6>
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
              <FormTransfer
                title="MODIFIER UN CIRCUIT"
                method="PUT"
                transferId={transferId}
                departure={departure}
                arrival={arrival}
                price={price}
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
              alertMessage={`Êtes-vous sûr de vouloir supprimer ${departure} - ${arrival}?`}
              show={alert}
              setAlert={setAlert}
              url={`http://localhost:3030/transfers/${transferId}`}
            />
          </span>
        </td>
      </tr>
    </>
  );
}
