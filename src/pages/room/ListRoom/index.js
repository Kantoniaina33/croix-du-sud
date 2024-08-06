import TrHotel from "../../../components/hotel/trHotel";
import "../../../assets/css/soft-ui-dashboard.min.css";
import "./style.css";
import Aside from "../../../components/template/aside";
import { Call02Icon, Mail01Icon, StarIcon } from "hugeicons-react";
import TrRoom from "../../../components/room/trRoom";

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
        <div class="container-fluid">
          <div
            class="page-header border-radius-xl mt-4"
            style={{ minHeight: "150px" }}
          >
            <span class="mask opacity-6" id="background"></span>
          </div>
          <div class="card card-body blur shadow-blur mx-4 mt-n6 overflow-hidden">
            <div class="row gx-4">
              <div class="col-auto">
                <div class="avatar avatar-xl position-relative">
                  <img
                    src="/carlton.png"
                    alt="profile_image"
                    class="w-100 border-radius-lg shadow-sm"
                  />
                </div>
              </div>
              <div class="col-auto my-auto">
                <div class="h-100">
                  <h5 class="mb-1">Carlton</h5>
                  <p class="mb-0 font-weight-bold text-xs">
                    adresse Carlton | Antanarivo
                  </p>
                  <span>
                    {starsArray.map((color, index) => (
                      <StarIcon
                        key={index}
                        color={color}
                        size={17}
                        style={{ margin: "1%" }}
                      />
                    ))}
                  </span>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3">
                <div class="nav-wrapper position-relative end-0">
                  <ul
                    class="nav nav-pills nav-fill p-1 bg-transparent"
                    role="tablist"
                  >
                    <li class="nav-item">
                      <Call02Icon size={24} color="grey" variant={"stroke"} />
                      <span class="ms-1">034 34 334 34</span>
                    </li>
                    <li class="nav-item">
                      <Mail01Icon size={24} color="grey" variant={"stroke"} />
                      <span class="ms-1">carlton@gmail.com</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-0">
                  <h6>Liste de chambres</h6>
                </div>
                <div className="card-body px-0 pt-0 pb-2">
                  <div className="table-responsive p-0">
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Type
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Capacite
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Categorie de prix
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Tarif par nuit
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Nombre total
                          </th>
                          <th className="text-secondary opacity-7"></th>
                          <th className="text-secondary opacity-7"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <TrRoom
                          type="Double"
                          capacity="2"
                          price_category="Premier"
                          price="2000 Ar"
                          total="10"
                        />
                        <TrRoom
                          type="Twin"
                          capacity="2"
                          price_category="Premier"
                          price="2500 Ar"
                          total="7"
                        />
                        <TrRoom
                          type="Twin"
                          capacity="2"
                          price_category="Second"
                          price="3500 Ar"
                          total="7"
                        />
                      </tbody>
                    </table>
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
