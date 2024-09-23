import "../../../assets/css/soft-ui-dashboard.min.css";
import Aside from "../../../components/template/aside";
import { useState, useEffect } from "react";
import LogoutButton from "../../../components/util/logoutButton";
import TableMealPlanning from "../../../components/meal/tableMealPlanning";
import TableRoomPlanning from "../../../components/room/tableRoomPlanning";
import TableExcursionPlanning from "../../../components/excursion/tableExcursionPlanning";
import "./style.css";
import { useParams } from "react-router-dom";

export default function PlanningDetails(props) {
  const { planningId, reservationId } = useParams();
  const [planning, setPlanning] = useState([]);
  const [message, setMessage] = useState("");

  const fetchPlanning = async () => {
    setMessage("");
    try {
      const url = `http://localhost:3030/reservations/${reservationId}/program_plannings/${planningId}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        setMessage("Failed to fetch planning");
        return;
      }
      const data = await response.json();
      setPlanning(data);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching planning");
    }
  };

  useEffect(() => {
    fetchPlanning();
  }, []);

  return (
    <div>
      <Aside></Aside>
      <main
        id="listHotel"
        className="main-content position-relative max-height-vh-100 h-100 border-radius-lg "
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
                  <span>Planningmes</span>
                </li>
                <li
                  className="breadcrumb-item text-sm text-dark active"
                  aria-current="page"
                >
                  Details planning
                </li>
              </ol>
            </nav>
            <div
              className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
              id="navbar"
            >
              <ul className="navbar-nav  justify-content-end">
                <li className="nav-item d-flex align-items-center">
                  <LogoutButton />
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container-fluid py-4">
          <div className="row" style={{ overflowY: "auto", height: "80vh" }}>
            <div className="col-12">
              <div className="card mb-4">
                <div
                  className="card-header pb-0"
                  style={{ marginBottom: "-2%" }}
                >
                  <h6>Details du planning</h6>
                  <p>Jour {planning.day}</p>
                </div>
                <TableMealPlanning />
                <hr className="custom-hr" />
                <TableRoomPlanning />
                <hr className="custom-hr" />
                <TableExcursionPlanning
                  programId={planning.programId}
                  reservationId={reservationId}
                  planningId={planningId}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
