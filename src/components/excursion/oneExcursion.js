import React from "react";
import { DollarCircleIcon } from "hugeicons-react";
import FormExcursion from "./formExcursion";
import { useState } from "react";
import { Modal } from "react-bootstrap";

export default function OneExcursion(props) {
  const { logo, place_name, city, price, description } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDeleteClick = () => {
    const confirmed = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cet hotel ?"
    );
    if (confirmed) {
      console.log("Élément supprimé !");
    } else {
      console.log("Suppression annulée.");
    }
  };

  return (
    <div class="col-xl-3 col-md-6 mb-xl-0 mb-4">
      <div class="card card-blog card-plain">
        <div class="position-relative">
          <a class="d-block shadow-xl border-radius-xl">
            <img
              alt="excursion"
              class="img-fluid shadow border-radius-xl"
              src={logo}
              style={{ width: "100%", height: "150px" }}
            />
          </a>
        </div>
        <div class="card-body px-1 pb-0">
          <a href="#">
            <h5 style={{ marginBottom: -8 }}>{place_name}</h5>
            <span classN="text-gradient text-dark mb-2 text-sm">{city}</span>
          </a>
          <p classN="font-weight-bold  mb-2 text-md">
            <span>
              <DollarCircleIcon size={20} color="blue" variant={"stroke"} />
            </span>
            <span style={{ color: "blue", margin: "5px" }}>{price}</span>
          </p>
          <p class="mb-4 text-sm">{description}</p>
          <div class="d-flex align-items-center justify-content-between">
            <button
              onClick={handleShow}
              type="button"
              class="btn btn-outline-primary btn-sm mb-0"
            >
              Modifier
            </button>
            <Modal show={show} onHide={handleClose}>
              <FormExcursion
                title="Modifier une excursion"
                method="PUT"
                logo={logo}
                place_name={place_name}
                description={description}
                city={city}
                price={price}
              />
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
