import React, { useEffect, useState } from "react";
import { SpoonAndKnifeIcon } from "hugeicons-react";
import { useParams } from "react-router-dom";
import TrOffering from "./trOffering";

export default function TableOffering(props) {
  const {providerId, offering_type_id } = props;
  const [message, setMessage] = useState("");
  const [offerings, setOfferings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOfferings = async () => {
    setMessage("");
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3030/reservations/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        setMessage("Failed to fetch offerings");
        return;
      }

      const data = await response.json();
      setOfferings(data);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching offerings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOfferings();
  }, []);

  return (
    <div
      className="card-body px-0 pt-0 pb-2"
      style={{
        backgroundColor: "white",
        borderRadius: "10px",
        marginTop: "3%",
      }}
    >
      <div className="card-header pb-0 d-flex justify-content-between align-items-center">
        <h6>Hebergement</h6>
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
        ) : offerings.length > 0 ? (
          <div className="table-responsive p-0">
            <table className="table align-items-center mb-0">
              <thead>
                <tr>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    Nom de l'entité
                  </th>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                    Ville
                  </th>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                    Email
                  </th>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                    Téléphone
                  </th>
                  <th className="text-secondary opacity-7"></th>
                  <th className="text-secondary opacity-7"></th>
                </tr>
              </thead>
              {offerings.map((offering) => (
                <TrOffering
                  providerId={offering.providerId}
                  logo={offering.logo}
                  name={offering.name}
                  city={offering.city}
                  phone={offering.phone}
                  email={offering.email}
                  latitude={offering.latitude}
                  longitude={offering.longitude}
                  location={offering.location}
                />
              ))}
            </table>
          </div>
        ) : (
          <p style={{ fontSize: "15px", marginLeft: "2.5%" }}>
            Aucune prestation
          </p>
        )}
      </div>
    </div>
  );
}
