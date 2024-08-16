import React from "react";
import { Delete02Icon, Edit02Icon } from "hugeicons-react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import FormRoom from "./formRoom";

export default function TrRoom(props) {
  const { room_type, capacity, price_category, price, total, id } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDeleteClick = () => {
    const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cet élément ?");
    if (confirmed) {
      console.log("Élément supprimé !");
    } else {
      console.log("Suppression annulée.");
    }
  };

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
            <Edit02Icon color="blue" size={20} />
          </button>
          <Modal show={show} onHide={handleClose}>
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
            onClick={handleDeleteClick}
          >
            <Delete02Icon color="red" size={23} />
          </button>
        </span>
      </td>
    </tr>
  );
}
