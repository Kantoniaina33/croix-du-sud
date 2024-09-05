import React, { useState, useEffect } from "react";
import TrHotel from "../../../components/hotel/trHotel";
import "../../../assets/css/soft-ui-dashboard.min.css";
import Aside from "../../../components/template/aside";
import FormHotel2 from "../../../components/hotel/formHotel2";
import MyPagination from "../../../components/util/myPagination";
import SelectCities from "../../../components/util/selectCities";
import { ArrowUpDownIcon } from "hugeicons-react";
import Modal from "../../../components/hotel/modal";
import HotelsCloseCheap from "../../../components/hotel/hotelsCLoseCheap";

export default function ListCloseHotels() {
  const [show, setShow] = useState(false);

  return (
    <div>
      <Aside />
      <main
        id="listHotel"
        className="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
      >
        <nav
          className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
          id="navbarBlur"
          navbar-scroll="true"
        >
          <div className="container-fluid py-1 px-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                <li className="breadcrumb-item text-sm">
                  <span>Hotels</span>
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
          </div>
        </nav>
        <HotelsCloseCheap/>
      </main>
    </div>
  );
}
