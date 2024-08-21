import React from "react";
import { Delete02Icon, DollarCircleIcon } from "hugeicons-react";
import FormExcursion from "./formExcursion";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import AlertDelete from "../util/alertDelete";

export default function OneExcursion(props) {
  const { excursionId, logo, place_name, city, price, description } = props;
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState(false);
  
  const handleAlert = () => setAlert(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
          {/* <p class="text-gradient text-dark mb-2 text-sm">{city}</p> */}
          <a href="#">
            <h5>{place_name}</h5>
            <span classN="text-gradient text-dark mb-2 text-sm"></span>
          </a>
          <p classN="font-weight-bold  mb-2 text-md">
            <span>
              <DollarCircleIcon size={20} color="blue" variant={"stroke"} />
            </span>
            <span style={{ color: "blue", margin: "5px" }}>{price}</span>
          </p>
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
                title="MODIFIER UNE EXCURSION"
                method="PUT"
                excursionId={excursionId}
                logo={logo}
                place_name={place_name}
                description={description}
                city={city}
                price={price}
              />
            </Modal>
            <button
              style={{ backgroundColor: "white", border: "solid 1px red", borderRadius:"8px", padding:"3px 10px" }}
              onClick={handleAlert}
            >
              <Delete02Icon color="red" size={23} />
            </button>
            <AlertDelete
              alertMessage={`Êtes-vous sûr de vouloir supprimer ${place_name} ?`}
              show={alert}
              setAlert={setAlert}
              url={`http://localhost:3030/excursions/${excursionId}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
