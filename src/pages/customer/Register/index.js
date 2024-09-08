import FormCustomer from "../../../components/customer/formCustomer";
import FormCustomer2 from "../../../components/customer/formCustomer2";

function Register() {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <FormCustomer2 method="POST" />;
    </div>
  );
}
export default Register;
