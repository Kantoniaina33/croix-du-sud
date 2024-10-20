import { useEffect, useState } from "react";
import Modal from "../util/modal";
import TrExcursionReservation from "./trExcursionReservation";

export default function TableExcursionReservation(props) {
  const { programId, totalPersons } = props;
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const handleCloseModal = () => setIsMapModalOpen(false);
  const handleShowForm = () => setIsMapModalOpen(true);
  const [quotation, setQuotation] = useState(0);
  const [excursions, setExcursions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchExcursions = async () => {
    setLoading(true);
    setMessage("");
    try {
      const url = `http://localhost:3030/programs/${programId}/excursions`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        setMessage("Failed to fetch excursions");
        return;
      }
      const data = await response.json();
      setExcursions(data.program_excursions);
      setQuotation(data.quotation);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching excursions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExcursions();
  }, []);

  return (
    <div
      className="card-body px-0 pt-0 pb-2"
      style={{
        backgroundColor: "white",
        borderRadius: "10px",
        marginTop: "-2%",
      }}
    >
      <div className="card-header pb-0 d-flex justify-content-between align-items-center">
        <h6>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            class="bi bi-tree"
            viewBox="0 0 16 16"
            style={{ marginBottom: "3%" }}
          >
            <path d="M8.416.223a.5.5 0 0 0-.832 0l-3 4.5A.5.5 0 0 0 5 5.5h.098L3.076 8.735A.5.5 0 0 0 3.5 9.5h.191l-1.638 3.276a.5.5 0 0 0 .447.724H7V16h2v-2.5h4.5a.5.5 0 0 0 .447-.724L12.31 9.5h.191a.5.5 0 0 0 .424-.765L10.902 5.5H11a.5.5 0 0 0 .416-.777zM6.437 4.758A.5.5 0 0 0 6 4.5h-.066L8 1.401 10.066 4.5H10a.5.5 0 0 0-.424.765L11.598 8.5H11.5a.5.5 0 0 0-.447.724L12.69 12.5H3.309l1.638-3.276A.5.5 0 0 0 4.5 8.5h-.098l2.022-3.235a.5.5 0 0 0 .013-.507" />
          </svg>
          <span> EXCURSIONS</span>
        </h6>
      </div>
      <div className="card-body px-0 pt-0 pb-2">
        {/* <a className="btn btn-outline-primary btn-sm mb-0 me-3" target="blank">
          Nouvel employe
        </a> */}
        {loading ? (
          <div
            className="spinner-border spinner-border-sm"
            role="status"
            style={{ marginLeft: "3%" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : excursions ? (
          <div className="table-responsive p-0">
            <table className="table align-items-center mb-0">
              <thead>
                <tr>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    Excursion
                  </th>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                    Prix
                  </th>
                </tr>
              </thead>
              <tbody>
                {excursions.map((excursionPlanning) => (
                  <TrExcursionReservation
                    excursionId={excursionPlanning.excursion.id}
                    image={excursionPlanning.excursion.image}
                    place_name={excursionPlanning.excursion.place_name}
                    price={excursionPlanning.excursion.price}
                    programId={programId}
                    totalPersons={totalPersons}
                  />
                ))}
              </tbody>
            </table>
            <div style={{ margin: "1% 0 -1% 3%" }}>
              <p>Total: {quotation * totalPersons} Ar</p>
            </div>
          </div>
        ) : (
          <p style={{ marginLeft: "2.5%", fontSize: "15px" }}>
            Aucune excursion.
          </p>
        )}
      </div>
    </div>
  );
}
