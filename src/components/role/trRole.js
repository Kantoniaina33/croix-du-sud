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
import { Modal } from "react-bootstrap";
import AlertDelete from "../util/alertDelete";
import AddEmployee from "./addEmployee";

export default function TrRole(props) {
  const { roleId, name, hourlyWage } = props;

  const [show, setShow] = useState(false);
  const [showAddEmployee, setShowAddEmployee] = useState(false);

  const [alert, setAlert] = useState(false);
  const handleAlert = () => setAlert(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowAddEmployee = () => setShowAddEmployee(true);

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
        <td>{hourlyWage} Ar</td>
        <td className="align-middle text-center">
          <span className="text-secondary text-xs font-weight-bold">
            <button
              style={{ backgroundColor: "white", border: "none" }}
              onClick={handleShowAddEmployee}
            >
              Ajouter un {name}
            </button>
            <Modal show={showAddEmployee} onHide={handleClose}>
              <AddEmployee title={`AJOUTER UN ${name}`} method="POST" roleId={roleId} />
            </Modal>
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
              <FormRole
                title="MODIFIER UN CIRCUIT"
                method="PUT"
                roleId={roleId}
                name={name}
                hourlyWage={hourlyWage}
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
              alertMessage={`Êtes-vous sûr de vouloir supprimer l'emploi ${name}' ?`}
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
