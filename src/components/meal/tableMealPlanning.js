import React, { useEffect, useState } from "react";
import "./style.css";
import { SpoonAndKnifeIcon } from "hugeicons-react";
import { useParams } from "react-router-dom";
import TrMealPlanning from "./trMealPlanning";

export default function TableMealPlanning(props) {
  const { reservationId, planningId } = useParams();
  const { totalPerson } = props;
  const [message, setMessage] = useState("");
  const [meals, setMeals] = useState([]);

  const fetchMeals = async () => {
    setMessage("");
    try {
      const response = await fetch(
        `http://localhost:3030/reservations/${reservationId}/program_plannings/${planningId}/meals`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        setMessage("Failed to fetch meals");
        return;
      }

      const data = await response.json();
      setMeals(data);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching meals");
    }
  };

  useEffect(() => {
    fetchMeals();
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
        <div className="table-responsive p-0">
          <table className="table align-items-center mb-0">
            <thead>
              <tr>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                  Repas
                </th>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                  Prix par personne
                </th>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                  Prix total
                </th>
                <th className="text-secondary opacity-7"></th>
              </tr>
            </thead>
            {meals.map((mealPlanning) => (
              <TrMealPlanning
                reservationId={reservationId}
                planningId={planningId}
                hotelMealId={mealPlanning.meal.id}
                meal={mealPlanning.meal.meal}
                price={mealPlanning.meal.price}
                totalPerson={2}
                excluded={mealPlanning.excluded}
              />
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}
