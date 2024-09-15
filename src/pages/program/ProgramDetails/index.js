import React, { useState, useEffect } from "react";
import TrHotel from "../../../components/hotel/trHotel";
import "../../../assets/css/soft-ui-dashboard.min.css";
import Aside from "../../../components/template/aside";
import MyPagination from "../../../components/util/myPagination";
import SelectCities from "../../../components/util/selectCities";
import { ArrowUpDownIcon } from "hugeicons-react";
import Modal from "../../../components/hotel/modal";
import HotelsCloseCheap from "../../../components/hotel/hotelsCLoseCheap";
import ExcursionsDispo from "../../../components/hotel/excursionsDispo";
import { useParams } from "react-router-dom";
import Return from "../../../components/util/return";

export default function ProgramDetails() {
  const [program, setProgram] = useState([]);
  const { programId } = useParams();
  const [message, setMessage] = useState("");

  const fetchProgram = async () => {
    setMessage("");
    try {
      const url = `http://localhost:3030/programs/${programId}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        setMessage("Failed to fetch program");
        return;
      }
      const data = await response.json();
      setProgram(data);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching program");
    }
  };

  useEffect(() => {
    fetchProgram();
  }, []);

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
                  <span>Programmes</span>
                </li>
                <li
                  className="breadcrumb-item text-sm text-dark active"
                  aria-current="page"
                >
                  Details
                </li>
              </ol>
            </nav>
          </div>
        </nav>
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <Return href="/programs" />
                <div className="card-header pb-0 d-flex justify-content-between align-items-center">
                  <div>
                    <h6 style={{ textTransform: "uppercase" }}>
                      {program.departure} - {program.arrival}
                    </h6>
                  </div>
                </div>
                <HotelsCloseCheap programId={programId} />
                <ExcursionsDispo programId={programId} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
