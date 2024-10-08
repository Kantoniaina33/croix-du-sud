import React, { useEffect, useState } from "react";
import { SpoonAndKnifeIcon } from "hugeicons-react";
import { useParams } from "react-router-dom";
import TrOffering from "./trOffering";
import Modal from "../util/modal";
import AlertDelete from "../util/alertDelete";
import TrOfferingPlanning from "./trOfferingPlanning";

export default function OfferingPlanning(props) {
  const { offering_typeId, offering_type, programId } = props;
  const [message, setMessage] = useState("");
  const [offering, setOffering] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOffering = async () => {
    setMessage("");
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3030/programs/${programId}/offerings/types/${offering_typeId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        setMessage("Failed to fetch offering");
        return;
      }

      const data = await response.json();
      setOffering(data);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching offering");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffering();
  }, []);

  return (
    <>
      {offering && (
        <div
          className="card-body px-0 pt-0 pb-2"
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        >
          <div className="card-header pb-0 d-flex justify-content-between align-items-center">
            <h6>
              <svg
                style={{ marginBottom: "2%" }}
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                class="bi bi-x-diamond"
                viewBox="0 0 16 16"
              >
                <path d="M7.987 16a1.53 1.53 0 0 1-1.07-.448L.45 9.082a1.53 1.53 0 0 1 0-2.165L6.917.45a1.53 1.53 0 0 1 2.166 0l6.469 6.468A1.53 1.53 0 0 1 16 8.013a1.53 1.53 0 0 1-.448 1.07l-6.47 6.469A1.53 1.53 0 0 1 7.988 16zM7.639 1.17 4.766 4.044 8 7.278l3.234-3.234L8.361 1.17a.51.51 0 0 0-.722 0M8.722 8l3.234 3.234 2.873-2.873c.2-.2.2-.523 0-.722l-2.873-2.873zM8 8.722l-3.234 3.234 2.873 2.873c.2.2.523.2.722 0l2.873-2.873zM7.278 8 4.044 4.766 1.17 7.639a.51.51 0 0 0 0 .722l2.874 2.873z" />
              </svg>
              <span
                style={{
                  textTransform: "uppercase",
                  marginLeft: "3%",
                }}
              >
                {" "}
                {offering_type}
              </span>
              <button
                style={{ backgroundColor: "white", border: "none" }}
                // onClick={handleAlert}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  class="bi bi-dash-circle"
                  viewBox="0 0 16 16"
                  color="red"
                  style={{ marginBottom: "20%" }}
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                </svg>{" "}
              </button>
            </h6>
          </div>
          <div
            className="card-body px-0 pt-0 pb-2"
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
            }}
          >
            <div className="card-header pb-0 d-flex justify-content-between align-items-center"></div>
            <div
              className="card-body px-0 pt-0 pb-2"
              style={{ marginTop: "-3%" }}
            >
              {loading ? (
                <div
                  className="spinner-border spinner-border-sm"
                  role="status"
                  style={{ marginLeft: "3%" }}
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : offering ? (
                <>
                  <div className="table-responsive p-0">
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Nom de l'entité
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Email
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Téléphone
                          </th>
                          {/* <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                      Prix
                    </th>
                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                      Distance
                    </th> */}
                          <th className="text-secondary opacity-7"></th>
                          <th className="text-secondary opacity-7"></th>
                        </tr>
                      </thead>
                      <TrOfferingPlanning
                        id={offering.id}
                        logo={offering.image}
                        name={offering.name}
                        city={offering.city}
                        phone={offering.phone}
                        email={offering.email}
                        latitude={offering.latitude}
                        longitude={offering.longitude}
                        location={offering.location}
                        offering_typeId={offering.offering_typeId}
                        offering_type={offering_type}
                        distance={200}
                        average_price={2000}
                      />
                    </table>
                  </div>
                  <br />
                  <hr className="custom-hr" />
                </>
              ) : (
                <p style={{ fontSize: "15px", marginLeft: "2.5%" }}>
                  Aucune prestation
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
