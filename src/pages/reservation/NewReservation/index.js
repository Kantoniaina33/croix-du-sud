import { useState } from "react";
import FormReservation from "../../../components/reservation/formReservation";
import { useLocation, useParams } from "react-router-dom";
import Aside from "../../../components/template/aside";

function NewReservation() {
  const location = useLocation();
  const circuitId = location.state;
  const { id } = useParams();
  return (
    <div>
      <Aside />
      <main
        id="listCircuit"
        className="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
      >
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
          rel="stylesheet"
        />
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
          <FormReservation
            circuitId={circuitId}
            customerId={id}
            method="POST"
          />
        </div>
      </main>
    </div>
  );
}
export default NewReservation;
