import React, { useState, useEffect } from "react";
import Aside from "../../../components/template/aside";
import Modal from "../../../components/util/modal";
import { useLocation, useParams } from "react-router-dom";
import SheetProgram from "../../../components/program/sheetProgram";
import ChooseOffering from "../../../components/offering/ChooseOffering";
import ChooseOfferingType from "../../../components/offeringType/chooseOfferingType";
import TableStaffReservation from "../../../components/role/tableStaffReservation";
import TableExcursionReservation from "../../../components/excursion/tableExcursionReservation";
import TableTransferReservation from "../../../components/transfer/tableTransferReservation";
import ListOfferingReservation from "../../../components/program/listOfferingReservation";

export default function ProgramDetailReservation() {
  const location = useLocation();
  const linkData = location.state;
  const [program, setProgram] = useState([]);
  const { programId, reservationId } = useParams();
  const [message, setMessage] = useState("");
  const [offeringTypeId, setOfferingTypeId] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isNextModalOpen, setIsNextModalOpen] = useState(false);

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
  }, []);

  const handleCloseModal = () => setIsMapModalOpen(false);
  const handleShowMap = () => setIsMapModalOpen(true);
  const handleCloseNextModal = () => setIsNextModalOpen(false);

  const handleNext = (offering_typeId) => {
    setOfferingTypeId(offering_typeId);
    setIsMapModalOpen(false);
    setIsNextModalOpen(true);
  };

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
              <ul className="navbar-nav justify-content-end"></ul>
            </div>
          </div>
        </nav>
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4" style={{ position: "inherit" }}>
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
                    isReservation={true}
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
                    price={program.price}
                  />
                ) : (
                  <p>Oups</p>
                )}
                <hr className="custom-hr" />
                <TableStaffReservation
                  programId={programId}
                  totalPersons={linkData.totalPersons}
                />
                <hr className="custom-hr" />
                <ListOfferingReservation
                  programId={programId}
                  reservationId={reservationId}
                  totalPersons={linkData.totalPersons}
                />
                <TableExcursionReservation
                  programId={programId}
                  totalPersons={linkData.totalPersons}
                />
                <hr className="custom-hr" />
                <TableTransferReservation
                  programId={programId}
                  reservationId={reservationId}
                  totalPersons={linkData.totalPersons}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
