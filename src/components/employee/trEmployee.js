import React from "react-bootstrap";
import {
  Delete02Icon,
  Edit02Icon,
  StarIcon,
  LinkSquare02Icon,
  PlusSignSquareIcon,
} from "hugeicons-react";
import { useState } from "react";
import AlertDelete from "../util/alertDelete";
import FormEmployee2 from "./formEmployee2";
import Modal from "../hotel/modal";

export default function TrEmployee(props) {
  const {
    EmployeeId,
    firstName,
    name,
    birthDate,
    genre,
    email,
    phone,
    role,
    roleId,
    employeeId,
  } = props;

  const [show, setShow] = useState(false);
  const [showFormEmployee, setShowFormEmployee] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);


  const [alert, setAlert] = useState(false);
  const handleAlert = () => setAlert(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowFormEmployee = () => setShowFormEmployee(true);
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
              <h6 className="mb-0 text-sm">{firstName}</h6>
            </div>
          </div>
        </td>
        <td className="align-middle text-center">
          <div className="d-flex px-2 py-1">
            <div className="d-flex flex-column justify-content-center">
              <h6 className="mb-0 text-sm">{name}</h6>
            </div>
          </div>
        </td>
        <td className="align-middle text-center">
          <div className="d-flex px-2 py-1">
            <div className="d-flex flex-column justify-content-center">
              <h6 className="mb-0 text-sm">{genre}</h6>
            </div>
          </div>
        </td>
        <td>
          <p className="text-sm font-weight-bold mb-0">{phone}</p>
          <p className="text-sm text-secondary mb-0">{email}</p>
        </td>
        <td className="align-middle text-center">
          <div className="d-flex px-2 py-1">
            <div className="d-flex flex-column justify-content-center">
              <h6 className="mb-0 text-sm">{role}</h6>
            </div>
          </div>
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
              <FormEmployee2
                title="MODIFIER LES INFORMATIONS D'UN EMPLOYE"
                method="PUT"
                firstName={firstName}
                name={name}
                birthDate={birthDate}
                genre={genre}
                email={email}
                phone={phone}
                roleId={roleId}
                employeeId={employeeId}
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
              alertMessage={`Êtes-vous sûr de vouloir supprimer l'employé ${name} ?`}
              show={alert}
              setAlert={setAlert}
              url={`http://localhost:3030/Employees/${employeeId}`}
            />
          </span>
        </td>
      </tr>
    </>
  );
}
