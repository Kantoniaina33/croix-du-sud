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
      { offering && (

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
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              class="bi bi-lamp"
              viewBox="0 0 16 16"
              style={{ marginBottom: "3%" }}
            >
              <path
                fill-rule="evenodd"
                d="M5.04.303A.5.5 0 0 1 5.5 0h5c.2 0 .38.12.46.303l3 7a.5.5 0 0 1-.363.687h-.002q-.225.044-.45.081a33 33 0 0 1-4.645.425V13.5a.5.5 0 1 1-1 0V8.495a33 33 0 0 1-4.645-.425q-.225-.036-.45-.08h-.003a.5.5 0 0 1-.362-.688l3-7ZM3.21 7.116A31 31 0 0 0 8 7.5a31 31 0 0 0 4.791-.384L10.171 1H5.83z"
              />
              <path d="M6.493 12.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.3 1.3 0 0 0-.37.265.3.3 0 0 0-.052.075l-.001.004-.004.01V14l.002.008.016.033a.6.6 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.6.6 0 0 0 .146-.15l.015-.033L12 14v-.004a.3.3 0 0 0-.057-.09 1.3 1.3 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465s-2.462-.172-3.34-.465c-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411" />
            </svg>
            <span
              style={{
                textTransform: "uppercase",
              }}
            >
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
              <br/>
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
