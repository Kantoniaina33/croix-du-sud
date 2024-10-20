import React, { useState, useEffect } from "react";
import OfferingReservation from "../offering/offeringReservation";

export default function ListOfferingReservation(props) {
  const { programId, reservationId, totalPersons } = props;
  const [offeringTypes, setOfferingTypes] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchOfferingTypes = async () => {
    setMessage("");
    try {
      const response = await fetch(`http://localhost:3030/offerings/types`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        setMessage("Failed to fetch offering types");
        return;
      }

      const data = await response.json();
      setOfferingTypes(data);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching offering_types");
    }
  };

  useEffect(() => {
    fetchOfferingTypes();
  }, []);

  return (
    <>
      {loading ? (
        <div
          className="spinner-border spinner-border-sm"
          role="status"
          style={{ marginLeft: "3%" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : offeringTypes ? (
        offeringTypes.map((offeringType) => (
          <>
            <OfferingReservation
              offering_type={offeringType.name}
              programId={programId}
              offering_typeId={offeringType.id}
              isRestauration={offeringType.is_restauration}
              reservationId={reservationId}
              totalPersons={totalPersons}
            />
          </>
        ))
      ) : (
        <p style={{ marginLeft: "2.5%" }}></p>
      )}
    </>
  );
}
