import "../../../assets/css/soft-ui-dashboard.min.css";
import "./style.css";

function Log() {
  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
        rel="stylesheet"
      />
      <main class="main-content  mt-0" id="info">
        <section>
          <div class="page-header min-vh-75">
            <div class="container">
              <div class="row">
                <div class="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                  <div class="card card-plain mt-1">
                    <div class="card-header pb-0 text-left bg-transparent">
                      <h3 class="font-weight-bolder text-info text-gradient">
                        Welcome back
                      </h3>
                      <p class="mb-0">
                        Enter your email and password to sign in
                      </p>
                    </div>
                    <div class="card-body">
                      <form role="form">
                        <label>Nom de l'agence</label>
                        <div class="mb-3">
                          <input type="text" class="form-control" />
                        </div>
                        <label>Telephone</label>
                        <div class="mb-3">
                          <input type="text" class="form-control" />
                        </div>
                        <label>Description</label>
                        <div class="mb-3">
                          <textarea class="form-control" />
                        </div>
                        <div class="mb-3">
                          <label for="formFile" class="form-label">
                            Logo
                          </label>
                          <input
                            class="form-control"
                            type="file"
                            id="formFile"
                          />
                        </div>
                        <div class="text-center">
                          <button
                            type="button"
                            class="btn bg-gradient-info w-100 mt-4 mb-0"
                          >
                            Sign in
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="oblique position-absolute top-0 h-100 d-md-block d-none me-n8">
                    Hello
                    <div class="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"></div>
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
export default Log;
