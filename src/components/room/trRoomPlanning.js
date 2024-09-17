import React from "react";
import { Delete02Icon, Edit02Icon } from "hugeicons-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import AlertDelete from "../util/alertDelete";
import Modal from "../hotel/modal";
import FormRoom from "./formRoom";

export default function TrRoomPlanning(props) {
  const { room_type, price_category, quantity, price, id } = props;
  const { hotelId } = useParams();
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const handleAlert = () => setAlert(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowMap = () => setIsMapModalOpen(true);
  const handleCloseModal = () => setIsMapModalOpen(false);

  return (
    <tr>
      <td>
        <div className="d-flex px-3">
          <div className="my-auto">
            <h6 className="mb-0 text-sm">{room_type}</h6>
          </div>
        </div>
      </td>
      <td>
        <h6 className="mb-0 text-sm">{price_category}</h6>
      </td>
      <td>
        <h6 className="mb-0 text-sm">{quantity}</h6>
      </td>
      <td>
        <h6 className="mb-0 text-sm">{price}</h6>
      </td>
      <td>
        <h6 className="mb-0 text-sm">{price * quantity}</h6>
      </td>
      <td>
        <span className="text-secondary text-xs font-weight-bold">
          <button
            style={{ backgroundColor: "white", border: "none" }}
            onClick={handleAlert}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              fill="currentColor"
              class="bi bi-dash-circle"
              viewBox="0 0 16 16"
              color="red"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
            </svg>{" "}
          </button>
          <AlertDelete
            alertMessage={`Êtes-vous sûr de vouloir supprimer les chambres ${room_type}?`}
            show={alert}
            setAlert={setAlert}
            url={`http://localhost:3030/hotels/${hotelId}/rooms/${id}`}
          />
        </span>
      </td>
    </tr>
  );
}
