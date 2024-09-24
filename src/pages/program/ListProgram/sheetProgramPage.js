import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Aside from "../../../components/template/aside";
import Return from "../../../components/util/return";
import SheetProgram from "../../../components/program/sheetProgram";

export default function SheetProgramPage() {
  const { id } = useParams();
  const [program, setProgram] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProgram = async () => {
    setLoading(true);
    setMessage("");
    try {
      const url = `http://localhost:3030/programs/${id}`;
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

  return (
    <div>
      <Aside />
      <main
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
                  Détails
                </li>
              </ol>
            </nav>
          </div>
        </nav>
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              {loading ? (
                <div
                  className="spinner-border spinner-border-sm"
                  role="status"
                  style={{ marginLeft: "3%" }}
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : program ? (
                <SheetProgram
                  programId={program.id}
                  departure={program.departure}
                  arrival={program.arrival}
                  distance={program.distance}
                  duration={program.duration}
                  description={program.description}
                  // departureLatitude={program.departureCoordinates.latitude}
                  // departureLongitude={program.departureCoordinates.longitude}
                  // arrivalLatitude={program.arrivalCoordinates.latitude}
                  // arrivalLongitude={program.arrivalCoordinates.longitude}
                />
              ) : (
                <p>Oups</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
