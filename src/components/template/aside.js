import { Hotel01Icon, Tree06Icon } from "hugeicons-react";
import React, { useState } from "react";
import "./template.css";

export default function Aside() {
  const [openDropdown, setOpenDropdown] = useState(null); // Indique quel dropdown est ouvert

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index); // Ouvre/ferme le dropdown correspondant
  };

  return (
    <aside
      className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3"
      style={{ backgroundColor: "white", zIndex: "1" }}
    >
      <div className="sidenav-header">
        <div className="navbar-brand m-0">
          <img
            src={"agency.image"} // Utilisation de l'image de l'agence
            style={{ objectFit: "cover", width: "40px", height: "55px" }}
            alt="logo"
          />
          <a href="/">
            <span className="ms-1 font-weight-bold">{"agency.name"}</span>
          </a>
        </div>
      </div>

      <hr className="horizontal dark mt-0" />

      <div>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className={`nav-link ${
                window.location.pathname === "/customers/register"
                  ? "active"
                  : ""
              }`}
              href="/customers/register"
            >
              <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                <Tree06Icon size={24} color={"#000000"} variant={"stroke"} />
              </div>
              <span className="nav-link-text ms-1">Reservations</span>
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${
                window.location.pathname === "/customers" ? "active" : ""
              }`}
              href="/customers"
            >
              <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                <Tree06Icon size={24} color={"#000000"} variant={"stroke"} />
              </div>
              <span className="nav-link-text ms-1">Clients</span>
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${
                window.location.pathname === "#" ? "active" : ""
              }`}
              // href="#"
            >
              <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                <Tree06Icon size={24} color={"#000000"} variant={"stroke"} />
              </div>
              <span className="nav-link-text ms-1">Statistiques</span>
            </a>
          </li>
          <li className="nav-item mt-3">
            <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">
              Gestion blabla
            </h6>
          </li>
          <span id="aside">
            <li className="nav-item">
              <a
                className={`nav-link ${
                  window.location.pathname === "/providers" ? "active" : ""
                }`}
                // href="#!"
                onClick={() => toggleDropdown(1)}
              >
                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                  <Hotel01Icon size={50} color={"#000000"} variant={"stroke"} />
                </div>
                <span className="nav-link-text ms-1">Voyage</span>
                <span className="ms-auto">
                  {openDropdown === 1 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-chevron-up"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-chevron-down"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                      />
                    </svg>
                  )}
                </span>
              </a>
              {openDropdown === 1 && (
                <div className="dropdown-wrapper">
                  <ul className="custom-dropdown">
                    <li>
                      <a href="/circuits" className="dropdown-item">
                        Circuits
                      </a>
                    </li>
                    <li>
                      <a href="/programs" className="dropdown-item">
                        Programmes
                      </a>
                    </li>
                    <li>
                      <a href="/excursions" className="dropdown-item">
                        Excursions
                      </a>
                    </li>
                    <li>
                      <a href="/transfers" className="dropdown-item">
                        Transferts
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </span>
          <li className="nav-item">
            <a
              className={`nav-link ${
                window.location.pathname === "/providers" ? "active" : ""
              }`}
              href="/providers"
            >
              <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                <Tree06Icon size={24} color={"#000000"} variant={"stroke"} />
              </div>
              <span className="nav-link-text ms-1">Prestataires</span>
            </a>
          </li>
          <li className="nav-item mt-3">
            <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">
              Gestion des employes
            </h6>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${
                window.location.pathname === "/roles" ? "active" : ""
              }`}
              href="/roles"
            >
              <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                <Tree06Icon size={24} color={"#000000"} variant={"stroke"} />
              </div>
              <span className="nav-link-text ms-1">Postes</span>
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${
                window.location.pathname === "/employees" ? "active" : ""
              }`}
              href="/employees"
            >
              <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                <Tree06Icon size={24} color={"#000000"} variant={"stroke"} />
              </div>
              <span className="nav-link-text ms-1">Employés</span>
            </a>
          </li>
        </ul>
      </div>

      <div className="sidenav-footer mx-3">
        <div className="card card-background shadow-none card-background-mask-secondary">
          <div className="full-background"></div>
        </div>
      </div>
    </aside>
  );
}
