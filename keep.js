

import { Hotel01Icon } from "hugeicons-react";
import React, { useState } from "react";
import "./template.css";

export default function Aside() {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside
      className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3
      "
      id={`${isOpen ? "sidebar-open" : "sidebar-closed"}`}
    >
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      />

      <div className="sidenav-header">
        <i
          className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
          aria-hidden="true"
          id="iconSidenav"
        ></i>
        <div className="navbar-brand m-0" target="_blank">
          <img
            src={"/logo.png"}
            style={{ objectFit: "cover", width: "40px", height: "55px" }}
            alt="logo"
          />
          <a href="https://demos.creative-tim.com/soft-ui-dashboard/pages/dashboard.html ">
            <span className="ms-1 font-weight-bold">{"agency.name"}</span>
          </a>
          <span className="sidebarIcon" onClick={toggleSidebar}>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="25"
                fill="currentColor"
                className="bi bi-layout-sidebar-inset-reverse"
                viewBox="0 0 16 16"
              >
                <path d="M2 2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zm12-1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2z" />
                <path d="M13 4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z" />
              </svg>
            </a>
          </span>
        </div>
      </div>
      <hr className="horizontal dark mt-0" />
      <div>
        <ul className="navbar-nav">
          <li className="nav-item"></li>
          <li className="nav-item">
            <a
              className={`nav-link ${
                window.location.pathname === "/providers" ? "active" : ""
              }`}
              href="/providers"
            >
              <div id="sidebarIcons" className="icon icon-shape icon-sm shadow border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <Hotel01Icon size={50} color={"#000000"} variant={"stroke"} />
              </div>
              <span className="nav-link-text ms-1">Prestataires</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}
