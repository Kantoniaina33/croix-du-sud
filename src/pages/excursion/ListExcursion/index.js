import "../../../assets/css/soft-ui-dashboard.min.css";
// import "./style.css";
import Aside from "../../../components/template/aside";
import { Call02Icon, Mail01Icon, StarIcon } from "hugeicons-react";
import TrMeal from "../../../components/meal/trMeal";
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
        <nav class="navbar navbar-main navbar-expand-lg bg-transparent shadow-none position-absolute px-4 w-100 z-index-2">
          <div class="container-fluid py-1">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 ps-2 me-sm-6 me-5">
                <li class="breadcrumb-item text-sm">
                  <span style={{ color: "white" }}>Pages</span>
                </li>
                <li
                  class="breadcrumb-item text-sm text-white active"
                  aria-current="page"
                >
                  Profile
                </li>
              </ol>
              <h6 class="text-white font-weight-bolder ms-2">Profile</h6>
            </nav>
            <div
              class="collapse navbar-collapse me-md-0 me-sm-4 mt-sm-0 mt-2"
              id="navbar"
            ></div>
          </div>
        </nav>
        <div class="container-fluid py-4">
          <div class="row">
            <div class="col-12 mt-4">
              <div class="card mb-4">
                <div class="card-header pb-0 p-3">
                  <h6 class="mb-1">Projects</h6>
                  <p class="text-sm">Architects design houses</p>
                </div>
                <div class="card-body p-3">
                  <div class="row">
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
