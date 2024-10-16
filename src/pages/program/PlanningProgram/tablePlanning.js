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

export default function TablePlanning() {
  const location = useLocation();
  const linkData = location.state;
  const customerInfo = linkData.customerInfo;
  const circuitId = linkData.circuitId;
  const { id, reservationId } = useParams(); //id : customerId
  const [message, setMessage] = useState("");
  const [next, setNext] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isNextModalOpen, setIsNextModalOpen] = useState(false);
  const [programPlanning, setProgramPlanning] = useState(null);
  const [programPlannings, setProgramPlannings] = useState([]);

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
        <nav
          className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
          id="navbarBlur"
          navbar-scroll="true"
        >
          <div className="container-fluid py-1 px-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                <li className="breadcrumb-item text-sm">
                  <span>Programme</span>
                </li>
                <li
                  className="breadcrumb-item text-sm text-dark active"
                  aria-current="page"
                >
                  Planning
                </li>
              </ol>
              {/* <h6 className="font-weight-bolder mb-0">Tables</h6> */}
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
                    onClick={handleShowMap}
                  >
                    Nouveau planning
                  </a>
                </li>
                <li className="nav-item d-flex align-items-center">
                  <LogoutButton />
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <ReturnLink
                  href={`/customers/${id}/reservations`}
                  state={customerInfo}
                />
                <div className="card-header pb-0 d-flex justify-content-between align-items-center">
                  <h6>Planning de voyage</h6>
                  <a
                    style={{ cursor: "pointer" }}
                    className="btn btn-outline-primary btn-sm mb-0 me-3"
                    onClick={handlePersonnalize}
                  >
                    {showButton ? "Enregistrer" : "Personnaliser"}
                  </a>
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
                  ) : programPlannings.length > 0 ? (
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
                            <th className="text-secondary opacity-7"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {programPlannings.map((programPlanning) => (
                            <>
                              <TrPlanningProgram
                                showButton={showButton}
                                price={1000}
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
                                totalPersons = {linkData.totalPersons}
                              />
                            </>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p style={{ fontSize: "15px", marginLeft: "2.5%" }}>
                      Aucun programPlanning
                    </p>
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
