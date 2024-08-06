import "../../../assets/css/soft-ui-dashboard.min.css";
import "./style.css";

function InfoAgency() {
  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
        rel="stylesheet"
      />
      <main className="main-content  mt-0" id="info">
        <section>
          <div className="page-header min-vh-75">
            <div className="container">
              <div className="row">
                <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                  <div className="card card-plain mt-1" id="infoBack">
                    <div className="card-header pb-0 text-left bg-transparent">
                      <h4 className="" id="infoTitle">
                        Informations sur l'agence
                      </h4>
                    </div>
                    <div className="card-body">
                      <form role="form">
                        <label>Nom</label>
                        <div className="mb-3">
                          <input type="text" className="form-control" />
                        </div>
                        <label>Telephone</label>
                        <div className="mb-3">
                          <input type="text" className="form-control" />
                        </div>
                        <label>Description</label>
                        <div className="mb-3">
                          <textarea className="form-control" />
                        </div>
                        <div className="mb-3">
                          <label for="formFile" className="form-label">
                            InfoAgencyo
                          </label>
                          <input
                            className="form-control"
                            type="file"
                            id="formFile"
                          />
                        </div>
                        <div className="text-center">
                          <button
                            type="button"
                            className="btn w-100 mt-4 mb-0"
                            id="saveInfo"
                          >
                            Enregistrer
                          </button>
                        </div>
                        <br></br>
                        <br></br>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="oblique position-absolute top-0 h-100 d-md-block d-none me-n8">
                    <div
                      id="oblique"
                      className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
                    ></div>
                    <div className="d-flex justify-content-center align-items-center h-100 position-relative z-index-1">
                      <div className="text-center text-white" id="textOblique">
                        <p>Renseignez les infos </p>
                        <p>de votre agence pour commencer !</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
export default InfoAgency;
