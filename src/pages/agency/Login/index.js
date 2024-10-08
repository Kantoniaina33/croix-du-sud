import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/css/soft-ui-dashboard.min.css";
import "./style.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3030/agencies/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setMessage("Email ou mot de passe invalide");
        } else {
          setMessage("Login failed");
        }
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      if (data.isSetInfo) {
        navigate("/hotels");
      } else {
        navigate("/info");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="login">
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
        rel="stylesheet"
      />
      <nav className="navbar navbar-expand-lg position-absolute top-0 z-index-3 w-100 shadow-none my-3 navbar-transparent mt-4">
        <div className="container">
          <span className="navbar-brand font-weight-bolder ms-lg-0 ms-3 text-white">
            <img style={{ width: 30, height: 30 }} src="/logo.png" alt="logo" />
            <span id="croix">Croix Du Sud</span>
          </span>
        </div>
      </nav>
      <main className="main-content">
        <section className="min-vh-100">
          <div
            className="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg" /*style="background-image: url('../assets/img/curved-images/curved14.jpg');"*/
          >
            <span id="bienvenue" className="mask"></span>
            <div
              className="container"
              style={{ marginTop: "-3%", marginBottom: "-2%" }}
            >
              <div className="row justify-content-center">
                <div className="col-lg-5 text-center mx-auto">
                  <h1 className="text-white mb-2 mt-5">Bienvenue!</h1>
                  <p className="text-lead text-white">
                    Transformez la gestion de votre agence de voyage avec notre
                    solution innovante.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="container" style={{ marginTop: "-210px" }}>
            <div className="row mt-lg-n10 mt-md-n11 mt-n10">
              <div className="col-xl-4 col-lg-5 col-md-7 mx-auto">
                <div className="card z-index-0">
                  <div className="card-header text-center pt-4">
                    <h5>Connexion</h5>
                  </div>
                  {message && (
                    <span style={{ color: "red", textAlign: "center" }}>
                      {message}
                    </span>
                  )}
                  <div className="card-body" style={{ marginTop: "-5%" }}>
                    <form onSubmit={handleLogin}>
                      <div className="mb-3">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Adresse email"
                          aria-label="Email"
                          aria-describedby="email-addon"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Mot de passe"
                          aria-label="Password"
                          aria-describedby="password-addon"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn bg-gradient-dark w-100 my-4 mb-2"
                        >
                          {isLoading ? (
                            <div
                              className="spinner-border spinner-border-sm"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          ) : (
                            "Se connecter"
                          )}
                        </button>
                      </div>
                      <p className="text-sm mt-3 mb-0">
                        Vous n'avez pas encore un compte?{" "}
                        <a
                          href="/signup"
                          className="text-dark font-weight-bolder"
                        >
                          S'inscrire
                        </a>
                      </p>
                    </form>
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
export default Login;
