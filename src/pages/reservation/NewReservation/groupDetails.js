import FormGroupDetails from "../../../components/reservation/formGroupDetails";

export default function GroupDetails() {

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <FormGroupDetails method="POST" />
    </div>
  );
}