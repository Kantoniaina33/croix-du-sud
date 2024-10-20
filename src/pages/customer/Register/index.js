import FormCustomer from "../../../components/customer/formCustomer";
import Aside from "../../../components/template/aside";
import Return from "../../../components/util/return";

function Register() {
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
          <FormCustomer method="POST" />
        </div>
      </main>
    </div>
  );
}
export default Register;
