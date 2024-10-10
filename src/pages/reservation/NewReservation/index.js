import { useState } from "react";
import FormReservation from "../../../components/reservation/formReservation";
import { useLocation, useParams } from "react-router-dom";

function NewReservation() {
  const location = useLocation();
  const circuitId = location.state;
  const { id } = useParams();
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <FormReservation circuitId={circuitId} customerId={id} method="POST" />
    </div>
  );
}
export default NewReservation;
