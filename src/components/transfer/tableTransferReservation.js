import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  SquareArrowDataTransferHorizontalIcon,
} from "hugeicons-react";
import TrTransferReservation from "./trTransferReservation";

export default function TableTransferReservation(props) {
  const { programId } = props;
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [transfers, setTransfers] = useState([]);
  const [quotation, setQuotation] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchTransfers = async () => {
    setLoading(true);
    setMessage("");
    try {
      const url = `http://localhost:3030/programs/${programId}/transfers`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        setMessage("Failed to fetch transfers");
        return;
      }
      const data = await response.json();
      setTransfers(data.program_transfers);
      setQuotation(data.quotation);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching transfers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransfers();
  }, []);
  const handleCloseModal = () => setIsMapModalOpen(false);
  const handleShowForm = () => setIsMapModalOpen(true);

  return (
    <div
      className="card-body px-0 pt-0 pb-2"
      style={{
        backgroundColor: "white",
        borderRadius: "10px",
      }}
    >
      <div className="card-header pb-0 d-flex justify-content-between align-items-center">
        <h6>
          <SquareArrowDataTransferHorizontalIcon
            style={{ marginBottom: "3%" }}
            size={20}
            variant={"stroke"}
          />{" "}
          TRANSFERTS
        </h6>
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
        ) : transfers.length > 0 ? (
          <div className="table-responsive p-0">
            <table className="table align-items-center mb-0">
              <thead>
                <tr>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    Transfert
                  </th>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                    Prix
                  </th>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                    Prix par personne
                  </th>
                </tr>
              </thead>
              <tbody>
                {transfers.map((transfer) => (
                  <TrTransferReservation
                    departure={transfer.transfer.departure}
                    arrival={transfer.transfer.arrival}
                    price={transfer.transfer.price}
                    totalPersons={5}
                  />
                ))}
              </tbody>
            </table>
            <p>Total: {quotation} Ar</p>
          </div>
        ) : (
          <p style={{ fontSize: "15px", marginLeft: "2.5%" }}>Aucun tranfert</p>
        )}
      </div>
    </div>
  );
}
