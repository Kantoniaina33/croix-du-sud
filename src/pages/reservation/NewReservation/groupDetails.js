import { useParams } from "react-router-dom";
import FormGroupDetails from "../../../components/reservation/formGroupDetails";
import Aside from "../../../components/template/aside";

export default function GroupDetails() {
  const { id, reservationId } = useParams(); //id: customerId
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
          <FormGroupDetails
            customerId={id}
            reservationId={reservationId}
            method="POST"
          />
        </div>
      </main>
    </div>
  );
}
