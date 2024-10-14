import { useParams } from "react-router-dom";
import FormGroupDetails from "../../../components/reservation/formGroupDetails";

export default function GroupDetails() {
const {id}= useParams();
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <FormGroupDetails
        customerId={id}
        reservationId={"qk4t2pm8ql0pOVqk7CSb"}
        method="POST"
      />
    </div>
  );
}