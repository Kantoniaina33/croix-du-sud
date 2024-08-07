import "../../../assets/css/soft-ui-dashboard.min.css";
// import "./style.css";
import Aside from "../../../components/template/aside";
import { Call02Icon, Mail01Icon, StarIcon } from "hugeicons-react";
import OneExcursion from "../../../components/excursion/oneExcursion";

export default function ListRoom() {
  const star = 3;
  const starsArray = Array.from({ length: 3 }, (v, i) =>
    i < star ? "#ffc400" : "grey"
  );
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
                    <OneExcursion></OneExcursion>
                    <OneExcursion></OneExcursion>
                    <OneExcursion></OneExcursion>
                    <OneExcursion></OneExcursion>
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
