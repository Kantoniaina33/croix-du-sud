import { useState } from "react";
import FormReservation from "../../../components/reservation/formReservation";
import { useParams } from "react-router-dom";

function NewReservation() {  
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <FormReservation method="POST" />
    </div>
  );
}
export default NewReservation;
