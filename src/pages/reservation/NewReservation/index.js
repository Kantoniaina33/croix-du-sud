import FormReservation from "../../../components/reservation/formReservation";
import FormReservation2 from "../../../components/reservation/formReservation2";

function NewReservation() {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <FormReservation2 method="POST" />
    </div>
  );
}
export default NewReservation;
