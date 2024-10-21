import { Hotel01Icon, LogoutSquare02Icon, Tree06Icon } from "hugeicons-react";
import React, { useEffect, useState } from "react";
import MySearchBar from "../util/mySearchBar";
import { useNavigate } from "react-router-dom";

export default function Header(props) {
  const {
    pages,
    slash,
    pageTitle,
    searchPlaceholder,
    search,
    setSearch,
    handleClearSearch,
    handleSearch,
    buttonText,
    handleOnClick,
  } = props;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <nav
      className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
      id="navbarBlur"
      navbar-scroll="true"
      style={{ position: "sticky" }}
    >
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      />
      <div className="container-fluid py-1 px-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
            <li className="breadcrumb-item text-sm">
              <a className="opacity-5 text-dark" href="javascript:;">
                {pages}
              </a>
            </li>
            <li
              className="breadcrumb-item text-sm text-dark active"
              aria-current="page"
            >
              {slash}
            </li>
          </ol>
          <h6 className="font-weight-bolder mb-0">{pageTitle}</h6>
        </nav>
        <div
          className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
          id="navbar"
        >
          <div className="ms-md-auto pe-md-3 d-flex align-items-center">
            <div className="input-group">
              {searchPlaceholder && (
                <MySearchBar
                  placeholder={searchPlaceholder}
                  search={search}
                  setSearch={setSearch}
                  handleClearSearch={handleClearSearch}
                  handleSearch={handleSearch}
                />
              )}
            </div>
          </div>
          <ul className="navbar-nav  justify-content-end">
            {buttonText && (
              <li className="nav-item d-flex align-items-center">
                <a
                  className="btn btn-outline-primary btn-sm mb-0 me-3"
                  target="_blank"
                  onClick={handleOnClick}
                >
                  {buttonText}
                </a>
              </li>
            )}
            <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
              <a
                href="javascript:;"
                className="nav-link text-body p-0"
                id="iconNavbarSidenav"
              >
                <div className="sidenav-toggler-inner">
                  <i className="sidenav-toggler-line"></i>
                  <i className="sidenav-toggler-line"></i>
                  <i className="sidenav-toggler-line"></i>
                </div>
              </a>
            </li>
            {/* <li className="nav-item px-3 d-flex align-items-center">
              <a href="javascript:;" className="nav-link text-body p-0">
                <i className="fa fa-cog fixed-plugin-button-nav cursor-pointer"></i>
              </a>
            </li> */}
            <li className="nav-item dropdown pe-2 d-flex align-items-center">
              <a
                onClick={toggleDropdown}
                className="nav-link text-body p-0"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <svg
                  className="fixed-plugin-button-nav cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path
                    fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                  />
                </svg>
              </a>
              <ul
                className={`dropdown-menu dropdown-menu-end px-2 py-3 me-sm-n4 ${
                  isDropdownOpen ? "show" : ""
                }`}
                aria-labelledby="dropdownMenuButton"
                style={{ display: isDropdownOpen ? "block" : "none", zIndex:2000, position:"absolute"}}
              >
                <li className="mb-2" onClick={handleLogout}>
                  <a className="dropdown-item border-radius-md">
                    <div className="d-flex py-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="currentColor"
                        class="bi bi-box-arrow-right"
                        viewBox="0 0 16 16"
                        style={{ marginTop: "2%" }}
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                        />
                      </svg>
                      <h6
                        className="text-sm font-weight-normal mb-1"
                        style={{ marginLeft: "5%" }}
                      >
                        Se deconnecter
                      </h6>
                    </div>
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="dropdown-item border-radius-md"
                    href="/users/new"
                  >
                    <div className="d-flex py-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="currentColor"
                        class="bi bi-people"
                        viewBox="0 0 16 16"
                        style={{ marginTop: "2%" }}
                      >
                        <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
                      </svg>
                      <h6
                        className="text-sm font-weight-normal mb-1"
                        style={{ marginLeft: "5%" }}
                      >
                        Gerer les profils
                      </h6>
                    </div>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
