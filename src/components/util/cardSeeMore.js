import React, { useState } from "react";
import "./style.css";

export default function CardSeeMore(props) {
  const { programId, departure, arrival, distance, duration, description } =
    props;

  const [show, setShow] = useState(false);

  const [alert, setAlert] = useState(false);
  const handleAlert = () => setAlert(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="card-horizontal mb-3" id="mini_programs">
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
        rel="stylesheet"
      />
      <div className="card-body">Voir plus</div>
    </div>
  );
}
