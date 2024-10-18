import React, { useEffect, useState } from "react";
import { SpoonAndKnifeIcon } from "hugeicons-react";
import { useParams } from "react-router-dom";
import TrOfferingDetailReservation from "./trOfferingDetailReservation";
import Modal from "../util/modal";
import FormOfferingDetailReservation from "./formOfferingDetailReservation";

export default function TableOfferingDetailReservation(props) {
  const { programId, reservationId, offeringId, totalPersons } = props;
  const [message, setMessage] = useState("");
  const [offeringDetails, setOfferingDetails] = useState([]);
  const [quotation, setQuotation] = useState(0);

  const [loading, setLoading] = useState(false);

  const fetchOfferingDetails = async () => {
    setMessage("");
    setLoading(true);
    console.log(
      `http://localhost:3030/reservations/${reservationId}/offerings/${offeringId}/details`
    );

    try {
      const response = await fetch(
        `http://localhost:3030/reservations/${reservationId}/offerings/${offeringId}/details`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        setMessage("Failed to fetch offering details");
        return;
      }

      const data = await response.json();
      setOfferingDetails(data.reservationOfferingDetails);
      setQuotation(data.quotation);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching offering details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOfferingDetails();
  }, []);

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
          <SpoonAndKnifeIcon style={{ marginBottom: "5%" }} /> DETAILS
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
        ) : offeringDetails ? (
          <div className="table-responsive p-0">
            <table className="table align-items-center mb-0">
              <thead>
                <tr>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    Offre
                  </th>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                    Quantite
                  </th>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                    Prix
                  </th>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                    Prix Total
                  </th>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                    Periode de tarification
                  </th>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                    A payer par personne
                  </th>
                </tr>
              </thead>
              {offeringDetails.map((offeringDetailPlanning) => (
                <TrOfferingDetailReservation
                  totalPersons={totalPersons}
                  key={offeringDetailPlanning.id}
                  programId={programId}
                  quantity={offeringDetailPlanning.quantity}
                  offeringName={offeringDetailPlanning.offeringDetail.name}
                  tarifPeriod={offeringDetailPlanning.offeringDetail.unit}
                  price={offeringDetailPlanning.offeringDetail.unit_price}
                  reservationId={reservationId}
                  id={offeringDetailPlanning.id}
                  offeringId={offeringDetailPlanning.offeringId}
                  totalPrice={offeringDetailPlanning.total_price}
                />
              ))}
            </table>
            <p>Total: {quotation} Ar</p>
          </div>
        ) : (
          <p style={{ fontSize: "15px", marginLeft: "2.5%" }}>Aucun employé</p>
        )}
      </div>
    </div>
  );
}
