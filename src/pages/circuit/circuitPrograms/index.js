import React, { useState, useEffect } from "react";
import "../../../assets/css/soft-ui-dashboard.min.css";
import Aside from "../../../components/template/aside";
import Modal from "../../../components/util/modal";
import FormHotelPlanning from "../../../components/hotel/formHotelPlanning";
import LogoutButton from "../../../components/util/logoutButton";
import { Link, useNavigate, useParams } from "react-router-dom";
import TrProgramCircuit from "../../../components/program/trProgramCircuit";
import ReturnLink from "../../../components/util/returnLink";
import Return from "../../../components/util/return";
import Header from "../../../components/template/header";

export default function CircuitPrograms() {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [next, setNext] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isNextModalOpen, setIsNextModalOpen] = useState(false);
  const [circuitPrograms, setCircuitPrograms] = useState([]);
  const navigate = useNavigate();

  const fetchCircuitProgram = async () => {
    setLoading(true);
    setMessage("");
    try {
      const url = `http://localhost:3030/circuits/${id}/programs`;
      console.log(url);
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
      setCircuitPrograms(data);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching plannings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCircuitProgram();
  }, []);

  const handleNewProgram = (e) => {
    navigate(`/circuits/${id}/programs/new`);
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
        <Header
          pages="Circuits"
          slash="Planning programmes"
          buttonText="Ajouter un programme"
          handleOnClick={handleNewProgram}
        />
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4" style={{ position: "inherit" }}>
                <Return />
                <div className="card-header pb-0 d-flex justify-content-between align-items-center">
                  <h6>Programmes</h6>
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
                  ) : circuitPrograms.length > 0 ? (
                    <div className="table-responsive p-0">
                      <table className="table align-items-center mb-0">
                        <thead>
                          <tr>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Jour
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
                          {circuitPrograms.map((circuitProgram) => (
                            <>
                              <TrProgramCircuit
                                day={circuitProgram.program_day}
                                price={circuitProgram.price}
                                itinerary={
                                  circuitProgram.program.departure +
                                  " - " +
                                  circuitProgram.program.arrival
                                }
                                programId={circuitProgram.programId}
                              />
                            </>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p style={{ fontSize: "15px", marginLeft: "2.5%" }}>
                      Aucun programme
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
