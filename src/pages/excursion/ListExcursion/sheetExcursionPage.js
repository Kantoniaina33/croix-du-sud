import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SheetExcursion from "../../../components/excursion/sheetExcursion";

export default function SheetExcursionPage() {
  const { id } = useParams();
  const [excursion, setExcursion] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchExcursion = async () => {
    setLoading(true);
    setMessage("");
    try {
      const url = `http://localhost:3030/excursions/${id}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        setMessage("Failed to fetch excursion");
        return;
      }
      const data = await response.json();
      setExcursion(data);
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching excursion");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExcursion();
    console.log(excursion);
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
      ) : (
        <SheetExcursion
          key={excursion.id}
          excursionId={excursion.id}
          place_name={excursion.place_name}
          city={excursion.city}
          image={excursion.image}
          price={excursion.price}
          distance={excursion.distance}
        />
      )}
    </>
  );
}
