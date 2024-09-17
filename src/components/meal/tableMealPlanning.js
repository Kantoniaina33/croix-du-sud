import React, { useState } from "react";
import "./style.css";
import {
  Coffee02Icon,
  Edit02Icon,
  SpoonAndKnifeIcon,
  Tick02Icon,
} from "hugeicons-react";
import { useParams } from "react-router-dom";
import TrMealPlanning from "./trMealPlanning";

export default function TableMealPlanning() {
  const { hotelId } = useParams();
  const [message, setMessage] = useState("");

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
                  Prix
                </th>
                <th className="text-secondary opacity-7"></th>
              </tr>
            </thead>
            <TrMealPlanning meal={"Meal"} price={1000} />
            <TrMealPlanning meal={"Meal"} price={1000} />
            <TrMealPlanning meal={"Meal"} price={1000} />
          </table>
        </div>
      </div>
    </div>
  );
}
