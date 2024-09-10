import { useState } from "react";
import "./agency.css";
import { useNavigate } from "react-router-dom";

function FormAgency(props) {
  const { method, name, phone, description, logo, onCancel } = props;
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    name: name || "",
    phone: phone || "",
    description: description || "",
    logo: logo || null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "logo" && e.target.files.length > 0) {
      setFormValues((prevValues) => ({
        ...prevValues,
        logo: e.target.files[0],
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    const formData = new FormData();

    if (formValues.logo) {
      formData.append("logo", formValues.logo);
    }

    formData.append("name", formValues.name);
    formData.append("phone", formValues.phone);
    formData.append("description", formValues.description);

    try {
      const response = await fetch(`http://localhost:3030/agencies`, {
        method: method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        if (response.status === 401) {
          setMessage("Problem");
        } else {
          setMessage("Failed");
        }
        return;
      }
      navigate("/hotels");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
                        <label>Nom de l'agence</label>
                        <div className="mb-3">
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={formValues.name}
                            onChange={handleChange}
                          />
                        </div>
                        <label>Téléphone</label>
                        <div className="mb-3">
                          <input
                            type="text"
                            className="form-control"
                            name="phone"
                            value={formValues.phone}
                            onChange={handleChange}
                          />
                        </div>
                        <label>Description</label>
                        <div className="mb-3">
                          <textarea
                            className="form-control"
                            name="description"
                            value={formValues.description}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label for="formFile" className="form-label">
                            Logo/Image
                          </label>
                          <input
                            className="form-control"
                            type="file"
                            name="logo"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="text-center">
                          <button
                            type="button"
                            onClick={handleSave}
                            className="btn w-100 mt-4 mb-0"
                            id="saveInfo"
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
                              "Enregistrer"
                            )}
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
export default FormAgency;
