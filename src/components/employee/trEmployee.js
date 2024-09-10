import React, { useState, useEffect } from "react";
import { Delete02Icon, Edit02Icon } from "hugeicons-react";
import AlertDelete from "../util/alertDelete";
import FormEmployee2 from "./formEmployee2";
import Modal from "../hotel/modal";
import FormRoleEmployee from "./formRoleEmployee";

export default function TrEmployee(props) {
  const {
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

  const [showMapModal, setShowMapModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [employee, setEmployee] = useState(null);
  const [alert, setAlert] = useState(false);

  const loadEmployeeData = async () => {
    try {
      const url = `http://localhost:3030/employees/${employeeId}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données.");
      }

      const data = await response.json();
      setEmployee(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleShowRoleModal = async () => {
    await loadEmployeeData();
    setShowRoleModal(true);
  };

  const handleCloseRoleModal = () => setShowRoleModal(false);

  const handleShowMapModal = () => setShowMapModal(true);
  const handleCloseMapModal = () => setShowMapModal(false);

  const handleAlert = () => setAlert(true);

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
        <td className="text-sm font-weight-bold mb-0">
          <h6 className="mb-0 text-sm">{name}</h6>
        </td>
        <td className="text-sm font-weight-bold mb-0">
          <h6 className="mb-0 text-sm">{genre}</h6>
        </td>
        <td className="text-sm font-weight-bold mb-0">
          <p className="text-sm font-weight-bold mb-0">{phone}</p>
          <p className="text-sm text-secondary mb-0">{email}</p>
        </td>
        <td className="text-sm font-weight-bold mb-0">
          <h6 className="mb-0 text-sm">{role}</h6>
        </td>
        <td className="align-middle text-center">
          <a
            className="text-sm"
            style={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={handleShowRoleModal}
          >
            Modifier le poste
          </a>
          {showRoleModal && (
            <Modal isOpen={showRoleModal} onClose={handleCloseRoleModal}>
              <FormRoleEmployee
                onCancel={handleCloseRoleModal}
                employee={employee}
                roleId={roleId}
                method="PUT"
              />
            </Modal>
          )}
        </td>
        <td className="align-middle text-center">
          <button
            style={{ backgroundColor: "white", border: "none" }}
            onClick={handleShowMapModal}
          >
            <Edit02Icon color="blue" size={20} />
          </button>
          {showMapModal && (
            <Modal isOpen={showMapModal} onClose={handleCloseMapModal}>
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
                onCancel={handleCloseMapModal}
              />
            </Modal>
          )}
        </td>
        <td className="align-middle text-center">
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
        </td>
      </tr>
    </>
  );
}
