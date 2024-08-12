import "../../../assets/css/soft-ui-dashboard.min.css";
import Aside from "../../../components/template/aside";
import OneExcursion from "../../../components/excursion/oneExcursion";
import { useState, useEffect } from "react";

export default function ListExcursion() {
  const [excursions, setExcursions] = useState([]);
  const [message, setMessage] = useState("");

  const fetchExcursions = async () => {
    setMessage("");
    try {
      const response = await fetch("http://localhost:3030/excursions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        setMessage("Failed to fetch excursions");
        return;
      }

      const data = await response.json();
      const excursionsArray = Object.keys(data).map((key) => ({
        ...data[key],
      }));
      setExcursions(excursionsArray); 
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching excursions");
    }
  };

  useEffect(() => {
    fetchExcursions();
  }, []);
  return (
    <div>
      <Aside></Aside>
      <main
        id="listHotel"
        className="main-content position-relative max-height-vh-100 h-100 border-radius-lg "
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
                  <span>Excursion</span>
                </li>
                <li
                  className="breadcrumb-item text-sm text-dark active"
                  aria-current="page"
                >
                  Liste
                </li>
              </ol>
              <h6 className="font-weight-bolder mb-0">Tables</h6>
            </nav>
            <div
              className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
              id="navbar"
            >
              <div className="ms-md-auto pe-md-3 d-flex align-items-center w-35">
                <div className="input-group">
                  <span className="input-group-text text-body">
                    <i className="fas fa-search" aria-hidden="true"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Rechercher une excursion..."
                  />
                </div>
              </div>
              <ul className="navbar-nav  justify-content-end">
                <li className="nav-item d-flex align-items-center">
                  <a
                    className="btn btn-outline-primary btn-sm mb-0 me-3"
                    target="blank"
                    href="https://www.creative-tim.com/builder?ref=navbar-soft-ui-dashboard"
                  >
                    Ajouter une nouvelle excursion
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12 mt-4">
              <div className="card mb-4">
                <div className="card-header pb-0 p-3">
                  <h6 className="mb-1">Liste d'excursions</h6>
                  <p className="text-sm"> </p>
                </div>
                <div className="card-body p-3">
                  <div className="row">
                    {excursions.length > 0 ? (
                      excursions.map((excursion) => (
                        <OneExcursion
                          // key={excursion.agencyId}
                          // logo={excursion.logo}
                          place_name={excursion.place_name}
                          city={excursion.city}
                          price={excursion.price}
                          description={excursion.description}
                        />
                      ))
                    ) : (
                      <p>Aucune excursion</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
