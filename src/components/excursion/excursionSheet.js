import React, { useEffect } from "react";
import {
  Delete02Icon,
  DollarCircleIcon,
  Edit02Icon,
  Location01Icon,
} from "hugeicons-react";
import { useState } from "react";
import AlertDelete from "../util/alertDelete";
import "./style.css";
import { useParams } from "react-router-dom";

export default function ExcursionSheet(props    ) {
  const { excursionId } = props;
  const [excursion, setExcursion] = useState([]);

  const fetchExcursion = async () => {
    try {
        console.log(`http://localhost:3030/excursions/${excursionId}`); 
      const response = await fetch(
        `http://localhost:3030/excursions/${excursionId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log(data);
      setExcursion(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchExcursion();
    console.log(excursionId);
  }, []);

  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState(false);

  const handleAlert = () => setAlert(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="col-xl-3 col-md-6 mb-xl-0 mb-4">
      {/* <div className="card" id="cardExcursion"> */}
      <img src={excursion.image} alt="excursion" className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{excursion.place_name}</h5>
        <div className="d-flex align-items-center">
          <div>
            <Location01Icon size={18} color={"black"} variant={"stroke"} />
          </div>
          <div style={{ margin: "4px 0 0 2px", color: "black" }}>
            {excursion.city}
          </div>
        </div>
        <div className="d-flex align-items-center">
          <div>
            <DollarCircleIcon size={18} color={"black"} variant={"stroke"} />
          </div>
          <div style={{ margin: "4px 0 0 2px", color: "black" }}>
            {excursion.price} Ar
          </div>
        </div>
        <div>{excursion.description}</div>
        <div className="d-flex align-items-center justify-content-between mt-2">
          <button
            style={{
              backgroundColor: "white",
              border: "transparent",
            }}
            onClick={handleShow}
          >
            <Edit02Icon color="#273385" size={23} />
          </button>
          <button
            style={{
              backgroundColor: "white",
              border: "transparent",
            }}
            onClick={handleAlert}
          >
            <Delete02Icon color="rgb(219, 1, 1)" size={23} />
          </button>
          <AlertDelete
            alertMessage={`Êtes-vous sûr de vouloir supprimer ${excursion.place_name} ?`}
            show={alert}
            setAlert={setAlert}
            url={`http://localhost:3030/excursions/${excursionId}`}
          />
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}
