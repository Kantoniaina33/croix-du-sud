import React from "react-bootstrap";
import {
  Delete02Icon,
  Edit02Icon,
  StarIcon,
  LinkSquare02Icon,
  PlusSignSquareIcon,
} from "hugeicons-react";
import FormRole from "./formRole";
import { useState } from "react";
import AlertDelete from "../util/alertDelete";
import Modal from "../util/modal";

export default function TrRole(props) {
  const { roleId, name, hourlyWage } = props;
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const [show, setShow] = useState(false);

  const [showFormEmployee, setShowFormEmployee] = useState(false);

  const [alert, setAlert] = useState(false);
  const handleAlert = () => setAlert(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowMap = () => setIsMapModalOpen(true);

  const handleShowFormEmployee = () => setShowFormEmployee(true);
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
        <td className="text-sm font-weight-bold mb-0">{hourlyWage} Ar</td>
        {/* <td className="align-middle text-center">
          <span className="text-secondary text-xs font-weight-bold">
            <a href={`roles/${roleId}/employees`}>Liste des employés</a>
          </span>
        </td> */}
        <td className="align-middle text-center">
          <span className="text-secondary text-xs font-weight-bold">
            <button
              style={{ backgroundColor: "white", border: "none" }}
              onClick={handleShowMap}
            >
              <Edit02Icon color="blue" size={20} />
            </button>
            <Modal isOpen={isMapModalOpen}>
              <FormRole
                title="MODIFIER UN CIRCUIT"
                method="PUT"
                roleId={roleId}
                name={name}
                hourlyWage={hourlyWage}
                isOpen={isMapModalOpen}
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
              url={`http://localhost:3030/roles/${roleId}`}
            />
          </span>
        </td>
      </tr>
    </>
  );
}
