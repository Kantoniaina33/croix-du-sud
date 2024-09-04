import React from "react";
import { Delete02Icon, Edit02Icon } from "hugeicons-react";
import { useState } from "react";
import FormRoom from "./formRoom";
import { useParams } from "react-router-dom";
import AlertDelete from "../util/alertDelete";
import Modal from "../hotel/modal";

export default function TrRoom(props) {
  const { room_type, capacity, price_category, price, total, id } = props;
  const { hotelId } = useParams();
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const handleAlert = () => setAlert(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowMap = () => setIsMapModalOpen(true);


  return (
    <tr>
      <td>
        <div className="d-flex px-2">
          <div className="my-auto">
            <h6 className="mb-0 text-sm">{room_type}</h6>
          </div>
        </div>
      </td>
      <td className="align-middle text-center">
        <span className="text-sm font-weight-bold mb-0">{capacity} </span>
      </td>
      <td className="align-middle text-center">
        <p className="text-sm font-weight-bold mb-0">{price_category}</p>
      </td>
      <td className="align-middle text-center">
        <p className="text-sm font-weight-bold mb-0">{price}</p>
      </td>
      <td className="align-middle text-center">
        <p className="text-sm font-weight-bold mb-0">{total}</p>
      </td>
      <td className="align-middle text-center">
        <span className="text-secondary text-xs font-weight-bold">
          <button
            style={{ backgroundColor: "white", border: "none" }}
            onClick={handleShow}
          >
            <Edit02Icon color="#273385" size={20} />
          </button>
          <Modal isOpen={isMapModalOpen}>
          <FormRoom
              title="MODIFIER DES CHAMBRES"
              method="PUT"
              id={id}
              room_type={room_type}
              capacity={capacity}
              price_category={price_category}
              price={price}
              number_of_rooms={total}
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
