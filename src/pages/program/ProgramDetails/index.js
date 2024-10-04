import React, { useState, useEffect } from "react";
import TrHotel from "../../../components/hotel/trHotel";
import "../../../assets/css/soft-ui-dashboard.min.css";
import Aside from "../../../components/template/aside";
import MyPagination from "../../../components/util/myPagination";
import SelectCities from "../../../components/util/selectCities";
import { ArrowUpDownIcon } from "hugeicons-react";
import Modal from "../../../components/util/modal";
import HotelsCloseCheap from "../../../components/hotel/hotelsCLoseCheap";
import ExcursionsDispo from "../../../components/excursion/excursionsDispo";
import { useParams } from "react-router-dom";
import Return from "../../../components/util/return";
import SheetProgram from "../../../components/program/sheetProgram";
import OfferingPlanning from "../../../components/offering/offeringPlanning";
import TableExcursionPlanning from "../../../components/excursion/tableExcursionPlanning";
import TableTransferPlanning from "../../../components/transfer/tableTransferPlanning";

export default function ProgramDetails() {
  const [program, setProgram] = useState([]);
  const { programId } = useParams();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProgram = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgram();
    console.log(program + "huuuuuuuuuuuuuuuuuuuuuuuuuuu");
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
            <div
              className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
              id="navbar"
            >
              <div className="ms-md-auto pe-md-3 d-flex align-items-center"></div>
              <ul className="navbar-nav justify-content-end">
                <li className="nav-item d-flex align-items-center">
                  <a
                    className="btn btn-outline-primary btn-sm mb-0 me-3"
                    target="blank"
                    // onClick={handleShowMap}
                  >
                    Ajouter une prestation
                  </a>
                  {/* <Modal isOpen={isMapModalOpen}>
                    <FormHotel
                      method="POST"
                      title="NOUVEL HOTEL"
                      isOpen={isMapModalOpen}
                      onCancel={handleCloseModal}
                    />
                  </Modal> */}
                </li>
                <li className="nav-item d-flex align-items-center"></li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                {loading ? (
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                    style={{ marginLeft: "3%" }}
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : program && program.departureCoordinates ? (
                  <SheetProgram
                    programId={program.id}
                    departure={program.departure}
                    arrival={program.arrival}
                    distance={program.distance}
                    duration={program.duration}
                    description={program.description}
                    departureLatitude={program.departureCoordinates.latitude}
                    departureLongitude={program.departureCoordinates.longitude}
                    arrivalLatitude={program.arrivalCoordinates.latitude}
                    arrivalLongitude={program.arrivalCoordinates.longitude}
                  />
                ) : (
                  <p>Oups</p>
                )}
                <hr className="custom-hr" />
                <OfferingPlanning
                  providerId="0Se8m59EW4cHVMVXHnPT"
                  offering_typeId="yipTw9dMU52GdSl34aXJ"
                />
                <hr className="custom-hr" />
                <TableExcursionPlanning />
                <hr className="custom-hr" />
                <TableTransferPlanning />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
