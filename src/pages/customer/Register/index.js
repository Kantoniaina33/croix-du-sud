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
        <nav
          className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
          id="navbarBlur"
          navbar-scroll="true"
        >
          <div className="container-fluid py-1 px-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                <li className="breadcrumb-item text-sm">
                  <span>Circuits</span>
                </li>
                <li
                  className="breadcrumb-item text-sm text-dark active"
                  aria-current="page"
                >
                  Programmes
                </li>
              </ol>
            </nav>
          </div>
        </nav>
          <div className="container d-flex justify-content-center align-items-center min-vh-100">
        {/* <div className="container-fluid py-4">
            <div className="row">
              <div className="col-12">
                <div className="card mb-4"> */}
                  <FormCustomer method="POST" />  
                {/* </div>
              </div>
            </div>
          </div> */}
        </div>
      </main>
    </div>
  );
}
export default Register;
