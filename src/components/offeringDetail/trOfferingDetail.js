import React from "react";
import { Delete02Icon, Edit02Icon } from "hugeicons-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import AlertDelete from "../util/alertDelete";
import Modal from "../util/modal";
import FormOfferingDetail from "./formOfferingDetail";

export default function TrOfferingDetail(props) {
  const {
    offering_id,
    offering_type,
    offering_name,
    unit,
    unit_price,
    capacity,
    total,
    id,
  } = props;

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
        <div className="d-flex px-2">
          <div className="my-auto">
            <h6 className="mb-0 text-sm">{offering_type}</h6>
          </div>
        </div>
      </td>
      <td className="align-middle text-center">
        <span className="text-sm font-weight-bold mb-0">{offering_name} </span>
      </td>
      <td className="align-middle text-center">
        <p className="text-sm font-weight-bold mb-0">{unit_price}</p>
      </td>
      <td className="align-middle text-center">
        <p className="text-sm font-weight-bold mb-0">{unit}</p>
      </td>
      <td className="align-middle text-center">
        <p className="text-sm font-weight-bold mb-0">{capacity}</p>
      </td>
      <td className="align-middle text-center">
        <p className="text-sm font-weight-bold mb-0">{total}</p>
      </td>
      <td className="align-middle text-center">
        <span className="text-secondary text-xs font-weight-bold">
          <button
            style={{ backgroundColor: "white", border: "none" }}
            onClick={handleShowMap}
          >
            <Edit02Icon color="#273385" size={20} />
          </button>
          <Modal isOpen={isMapModalOpen}>
            <FormOfferingDetail
              title="MODIFIER DES CHAMBRES"
              method="PUT"
              id={id}
              offering_type={offering_type}
              offering_name={offering_name}
              unit={unit}
              unit_price={unit_price}
              number_of_offerings={total}
              onCancel={handleCloseModal}
              isOpen={isMapModalOpen}
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
            alertMessage={`Êtes-vous sûr de vouloir supprimer les chambres ${offering_type}?`}
            show={alert}
            setAlert={setAlert}
            url={`http://localhost:3030/hotels/${hotelId}/offerings/${id}`}
          />
        </span>
      </td>
    </tr>
  );
}
