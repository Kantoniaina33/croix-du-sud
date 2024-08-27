import FormCustomer from "../../../components/customer/formCustomer";

function Register() {
  return (
    <div className="container" style={{ marginTop: "210px" }}>
      <div className="row mt-lg-n10 mt-md-n11 mt-n10">
        <div className="col-xl-4 col-lg-5 col-md-7 mx-auto">
          <div className="card z-index-0">
            <div className="card-header text-center pt-4">
              <h5>Informations du client</h5>
            </div>
            <FormCustomer method="POST" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
