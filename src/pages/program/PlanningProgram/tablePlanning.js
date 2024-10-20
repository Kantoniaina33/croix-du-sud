import React, { useState, useEffect } from "react";
import "../../../assets/css/soft-ui-dashboard.min.css";
import Aside from "../../../components/template/aside";
import MyPagination from "../../../components/util/myPagination";
import Modal from "../../../components/util/modal";
import LogoutButton from "../../../components/util/logoutButton";

import Return from "../../../components/util/return";
import { Link, useLocation, useParams } from "react-router-dom";
import MySearchBar from "../../../components/util/mySearchBar";
import ReturnLink from "../../../components/util/returnLink";
import TrPlanningProgram from "../../../components/program/trPlanningProgram";
import Header from "../../../components/template/header";

export default function TablePlanning() {
  const location = useLocation();
  // const linkData = location.state;
  // const customerInfo = linkData.customerInfo;
  // const circuitId = linkData.circuitId;
  const { id, reservationId } = useParams(); //id : customerId
  const [message, setMessage] = useState("");
  const [next, setNext] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isNextModalOpen, setIsNextModalOpen] = useState(false);
  const [programPlanning, setProgramPlanning] = useState(null);
  const [reservation, setReservation] = useState(null);
  const [programPlannings, setProgramPlannings] = useState([]);

  const fetchReservation = async () => {
    setLoading(true);
    setMessage("");
    try {
      const url = `http://localhost:3030/reservations/${reservationId}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        setMessage("Failed to fetch reservation");
        return;
      }
      const data = await response.json();
      setReservation(data);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching reservation");
    } finally {
      setLoading(false);
    }
  };

  const fetchProgramPlannings = async () => {
    setLoading(true);
    setMessage("");
    try {
      const url = `http://localhost:3030/reservations/${reservationId}/program_plannings`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        setMessage("Failed to fetch plannings");
        return;
      }
      const data = await response.json();
      setProgramPlannings(data);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching plannings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservation();
    fetchProgramPlannings();
  }, []);

  const handleCloseModal = () => setIsMapModalOpen(false);
  const handlePersonnalize = () => setShowButton(!showButton);
  const handleShowMap = () => setIsMapModalOpen(true);
  const handleCloseNextModal = () => setIsNextModalOpen(false);

  const handleNext = (programPlanning) => {
    setProgramPlanning(programPlanning);
    setIsMapModalOpen(false);
    setIsNextModalOpen(true);
  };

  return (
    <div>
      <Aside />
      <main
        id="listProgram"
        className="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
      >
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
          rel="stylesheet"
        />
        <Header pages="Reservation" slash="Planning programme" />
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4" style={{ position: "inherit" }}>
                {/* <ReturnLink
                  href={`/customers/${id}/reservations`}
                  state={customerInfo}
                /> */}
                {reservation && (
                  <div style={{ margin: "2% 0 -2% 2.5%", fontSize: "10px" }}>
                    <p>
                      Client: {reservation.customer.firstName}{" "}
                      {reservation.customer.name}
                    </p>
                    <p>Circuit: {reservation.circuit.name}</p>
                    <p>Personnes: {reservation.total_travel_participants}</p>
                  </div>
                )}
                <div className="card-header pb-0 d-flex justify-content-between align-items-center">
                  <h6>Planning de voyage</h6>
                  <div className="d-flex align-items-center">
                    <a
                      style={{ cursor: "pointer" }}
                      className="btn btn-outline-primary btn-sm mb-0 me-3"
                      onClick={handlePersonnalize}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-file-earmark-arrow-down"
                        viewBox="0 0 16 16"
                    
                      >
                        <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293z" />
                        <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
                      </svg>{" "}
                      Telecharger
                    </a>
                    <a
                      style={{ cursor: "pointer" }}
                      className="btn btn-outline-primary btn-sm mb-0 me-3"
                      onClick={handlePersonnalize}
                    >
                      {showButton ? "Enregistrer" : "Personnaliser"}
                    </a>
                  </div>
                </div>

                <div className="card-body px-0 pt-0 pb-2">
                  {loading ? (
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                      style={{ marginLeft: "3%" }}
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : programPlannings.length > 0 && reservation ? (
                    <div className="table-responsive p-0">
                      <table className="table align-items-center mb-0">
                        <thead>
                          <tr>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Jour
                            </th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                              Date
                            </th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                              Itinéraires
                            </th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                              Prix
                            </th>
                            <th className="text-secondary opacity-7"></th>
                            <th className="text-secondary opacity-7"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {programPlannings.map((programPlanning) => (
                            <>
                              <TrPlanningProgram
                                showButton={showButton}
                                price={programPlanning.programPrice}
                                day={programPlanning.program_day}
                                programId={programPlanning.programId}
                                included={programPlanning.included}
                                date={programPlanning.formatted_date}
                                itinerary={
                                  programPlanning.program.departure +
                                  " - " +
                                  programPlanning.program.arrival
                                }
                                reservationId={reservationId}
                                id={programPlanning.id}
                                totalPersons={
                                  reservation.total_travel_participants
                                }
                              />
                            </>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p style={{ fontSize: "15px", marginLeft: "2.5%" }}></p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
