import React from "react-bootstrap";
import {
  Delete02Icon,
  Edit02Icon,
  StarIcon,
  LinkSquare02Icon,
  MapsLocation01Icon,
} from "hugeicons-react";
import FormProgram from "./formProgram";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import AlertDelete from "../util/alertDelete";

export default function TrProgram(props) {
  const { programId, departure, arrival, distance, duration, description } = props;

  const [show, setShow] = useState(false);

  const [alert, setAlert] = useState(false);
  const handleAlert = () => setAlert(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <tr>
        <td>
          <div className="d-flex px-2 py-1">
            <div>
              <MapsLocation01Icon
                size={20}
                color={"#344767"}
                variant={"stroke"}
                style={{margin:"3px 0 0 5px"}}
              />
            </div>
            <div
              className="d-flex flex-column justify-content-center"
              style={{ marginLeft: "3%" }}
            >
              <h6 className="mb-0 text-sm">
                {departure} - {arrival}
              </h6>
            </div>
          </div>
        </td>
        <td>
          <p className="text-sm font-weight-bold mb-0">{distance} Km</p>
        </td>
        <td>
          <p className="text-sm font-weight-bold mb-0">{duration} h</p>
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
              <FormProgram
                title="MODIFIER UN PROGRAMME"
                method="PUT"
                programId={programId}
                departure={departure}
                arrival={arrival}
                distance={distance}
                duration={duration}
                description={description}
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
              alertMessage={`Êtes-vous sûr de vouloir supprimer le programme ${departure}-${arrival} ?`}
              show={alert}
              setAlert={setAlert}
              url={`http://localhost:3030/programs/${programId}`}
            />
          </span>
        </td>
      </tr>
    </>
  );
}
