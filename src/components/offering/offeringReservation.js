import React, { useEffect, useState } from "react";
import TrOfferingReservation from "./trOfferingReservation";
import TableRestaurationReservation from "../offeringDetail/tableRestaurationReservation";
import TableOfferingDetailReservation from "../offeringDetail/tableOfferingDetailReservation";
import Modal from "../util/modal";
import FormOfferingDetailReservation from "../offeringDetail/formOfferingDetailReservation";

export default function OfferingReservation(props) {
  const {
    offering_typeId,
    offering_type,
    programId,
    isRestauration,
    reservationId,
    totalPersons,
  } = props;
  const [message, setMessage] = useState("");
  const [offering, setOffering] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const fetchOffering = async () => {
    setMessage("");
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3030/reservations/${reservationId}/programs/${programId}/offerings/types/${offering_typeId}`,
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

  const handleShowForm = () => setIsMapModalOpen(true);
  const handleCloseModal = () => setIsMapModalOpen(false);

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
            <div className="d-flex align-items-center">
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
              </h6>
              <div
                style={{
                  marginLeft: "3%",
                  width: "200px",
                  textTransform: "uppercase",
                }}
              >
                <h6>{offering_type}</h6>
              </div>
            </div>
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
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Prix moyen des services
                          </th>
                          <th className="text-secondary opacity-7"></th>
                          <th className="text-secondary opacity-7"></th>
                        </tr>
                      </thead>
                      <TrOfferingReservation
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
                        average_price={offering.average_price}
                        programId={programId}
                        reservationId={reservationId}
                      />
                    </table>
                    {isRestauration ? (
                      <TableRestaurationReservation
                        programId={programId}
                        totalPersons={totalPersons}
                      />
                    ) : (
                      <>
                        <br />

                        <TableOfferingDetailReservation
                          totalPersons={totalPersons}
                          programId={programId}
                          offeringTypeId={offering.offering_typeId}
                          offeringId={offering.id}
                          reservationId={reservationId}
                        />
                        <div
                          className="btn btn-outline-primary btn-sm mb-0 me-3"
                          style={{ marginLeft: "2%" }}
                        >
                          <a onClick={handleShowForm}>Ajouter</a>
                        </div>
                        <Modal isOpen={isMapModalOpen}>
                          <FormOfferingDetailReservation
                            onCancel={handleCloseModal}
                            offeringTypeId={offering.offering_typeId}
                            offeringId={offering.id}
                            reservationId={reservationId}
                          />
                        </Modal>
                      </>
                    )}
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
