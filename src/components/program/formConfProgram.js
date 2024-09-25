import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SheetProgram from "./sheetProgram";
import Return from "../util/return";
import { MapsLocation01Icon } from "hugeicons-react";
import HotelsCloseCheap from "../hotel/hotelsCLoseCheap";
import ExcursionsDispo from "../excursion/excursionsDispo";
import TableChooseHotel from "../hotel/tableChooseHotel";

export default function FormConfProgram(props) {
  const { programId } = props;
  const [program, setProgram] = useState(null);
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
  }, []);

  return (
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
        <>
          <div className="programDetails">
            <div className="card-image-left">
              <div className="card-content">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="title">
                    <h6 className="card-title">
                      <MapsLocation01Icon
                        size={25}
                        color={"#344767"}
                        variant={"stroke"}
                      />
                      <span
                        style={{
                          textTransform: "uppercase",
                          margin: "3px 0 0 10px",
                          fontSize: "16px",
                        }}
                      >
                        {program.departure} - {program.arrival}
                      </span>
                    </h6>
                  </div>
                </div>
                <div className="info">
                  <p>
                    Duree:
                    <span> {2} jours</span>
                  </p>
                  <p>
                    Jour:
                    <span> {1}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <hr className="custom-hr" />
          <TableChooseHotel programId={programId} />
          <hr className="custom-hr" />
          {/* <excursionsDispo programId={programId} /> */}
        </>
      ) : (
        <p>Oups</p>
      )}
    </div>
  );
}
