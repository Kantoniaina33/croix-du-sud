import React, { useEffect, useState } from "react";
import { SpoonAndKnifeIcon } from "hugeicons-react";
import { useParams } from "react-router-dom";
import TrRestaurationDetailPlanning from "./trRestaurationDetailPlanning";

export default function TableRestaurationDetailPlanning(props) {
  const { programId } = props;
  const [message, setMessage] = useState("");
  const [restaurationDetails, setRestaurationDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quotation, setQuotation] = useState(0);


  const fetchRestaurationDetails = async () => {
    setMessage("");
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3030/programs/${programId}/restauration/details`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        setMessage("Failed to fetch restauration details");
        return;
      }

      const data = await response.json();
      setRestaurationDetails(data.program_restaurations);
      setQuotation(data.quotation);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching restauration details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurationDetails();
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
          <SpoonAndKnifeIcon style={{ marginBottom: "5%" }} /> REPAS
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
        ) : restaurationDetails.length > 0 ? (
          <div className="table-responsive p-0">
            <table className="table align-items-center mb-0">
              <thead>
                <tr>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    Repas
                  </th>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                    Prix
                  </th>
                  <th className="text-secondary opacity-7"></th>
                </tr>
              </thead>
              {restaurationDetails.map((restaurationDetailPlanning) => (
                <TrRestaurationDetailPlanning
                  key={restaurationDetailPlanning.id}
                  programId={programId}
                  meal={restaurationDetailPlanning.restauration.name}
                  price={restaurationDetailPlanning.restauration.unit_price}
                  id={restaurationDetailPlanning.id}
                  included={restaurationDetailPlanning.included}
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
