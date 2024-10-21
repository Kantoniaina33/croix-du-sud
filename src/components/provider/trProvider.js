import React from "react-bootstrap";
import { Delete02Icon, Edit02Icon, LinkSquare02Icon } from "hugeicons-react";
import { useState } from "react";
import AlertDelete from "../util/alertDelete";
import "../../assets/css/soft-ui-dashboard.min.css";
import FormProvider from "./formProvider";
import Modal from "../util/modal";

export default function TrProvider(props) {
  const { providerId, logo, name, phone, email, setMeals } = props;
  const [show, setShow] = useState(false);

  const [alert, setAlert] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const handleAlert = () => setAlert(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowMap = () => setIsMapModalOpen(true);
  const handleCloseModal = () => setIsMapModalOpen(false);

  return (
    <>
      <tr>
        <td>
          <div className="d-flex px-3 py-1">
            <div>
              <img
                src={logo}
                alt="logo"
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />
            </div>
            <div
              className="d-flex flex-column justify-content-center"
              style={{ marginLeft: "3%" }}
            >
              <h6 className="mb-0 text-sm">{name}</h6>
            </div>
          </div>
        </td>
        <td>
          <p className="mb-0 text-sm">{email}</p>
        </td>
        <td>
          <h6 className="mb-0 text-sm">{phone}</h6>
        </td>
        <td>
          <span className="text-xs">
            <a href={`/providers/${providerId}/offerings`}>
              <span style={{ textDecoration: "underline" }}>Prestations</span>
              <LinkSquare02Icon size={15} style={{ marginLeft: "2%" }} />
            </a>
          </span>
        </td>
        <td className="align-middle text-center">
          <span className="text-secondary text-xs font-weight-bold">
            <button
              style={{ backgroundColor: "white", border: "none" }}
              onClick={handleShowMap}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-pencil-square"
                viewBox="0 0 16 16"
                color="#3c499b"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                />
              </svg>
            </button>
            <Modal isOpen={isMapModalOpen}>
              <FormProvider
                title="MODIFIER UN HOTEL"
                method="PUT"
                providerId={providerId}
                logo={logo}
                name={name}
                phone={phone}
                email={email}
                isOpen={isMapModalOpen}
                onCancel={handleCloseModal}
              />
            </Modal>
          </span>
          {/* </td>
        <td className="align-middle text-center"> */}
          <span className="text-secondary text-xs font-weight-bold px-5">
            <button
              style={{ backgroundColor: "white", border: "none" }}
              onClick={handleAlert}
            >
              <Delete02Icon color="rgb(219, 1, 1)" size={23} />
            </button>
            <AlertDelete
              alertMessage={`Êtes-vous sûr de vouloir supprimer ${name} ?`}
              alertDetail="Toutes les chambres et repas associés seront également supprimés."
              show={alert}
              setAlert={setAlert}
              url={`http://localhost:3030/providers/${providerId}`}
            />
          </span>
        </td>
      </tr>
    </>
  );
}
