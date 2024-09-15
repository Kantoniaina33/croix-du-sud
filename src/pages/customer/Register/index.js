import FormCustomer from "../../../components/customer/formCustomer";

function Register() {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <FormCustomer method="POST" />;
    </div>
  );
}
export default Register;
