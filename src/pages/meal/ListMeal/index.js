import "../../../assets/css/soft-ui-dashboard.min.css";
import "./style.css";
import Aside from "../../../components/template/aside";
import { Call02Icon, Coffee02Icon, Mail01Icon, NoodlesIcon, SpoonAndKnifeIcon, StarIcon } from "hugeicons-react";
import TrMeal from "../../../components/meal/trMeal";
import HeadHotel from "../../../components/hotel/headHotel";

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
        <nav className="navbar navbar-main navbar-expand-lg bg-transparent shadow-none position-absolute px-4 w-100 z-index-2">
          <div className="container-fluid py-1">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 ps-2 me-sm-6 me-5">
                <li className="breadcrumb-item text-sm">
                  <span style={{ color: "white" }}>Pages</span>
                </li>
                <li
                  className="font-weight-bold breadcrumb-item text-sm text-white active"
                  aria-current="page"
                >
                  Chambres
                </li>
              </ol>
            </nav>
            <div
              className="collapse navbar-collapse me-md-0 me-sm-4 mt-sm-0 mt-2"
              id="navbar"
            ></div>
          </div>
        </nav>
        <div className="container-fluid">
          <div
            className="page-header border-radius-xl mt-4"
            style={{ minHeight: "150px" }}
          >
            <span className="mask opacity-6" id="background"></span>
          </div>
          <HeadHotel
            logo="/carlton.png"
            name="Carlton"
            email="carlton@gmail.com"
            phone="034 34 334 34"
            star="5"
            address="carlton adresse"
            city="Antananarivo"
          />
        </div>
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-0">
                  <h6>Tarif repas</h6>
                </div>
                <div className="card-body px-0 pt-0 pb-2">
                  <div className="table-responsive p-0">
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-secondary opacity-7"></th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Repas
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Prix
                          </th>
                          <th className="text-secondary opacity-7"></th>
                        </tr>
                      </thead>
                      <TrMeal
                        icon={Coffee02Icon}
                        meal="Petit déjeuner"
                        price="10500 Ar"
                      />
                      <TrMeal
                        icon={SpoonAndKnifeIcon}
                        meal="Déjeuner"
                        price="2000 Ar"
                      />
                      <TrMeal
                        icon={NoodlesIcon}
                        meal="Diner"
                        price="1500 Ar"
                      />
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
