import React, { useState, useEffect } from "react";
import "./hotel.css";
import { ArrowUpDownIcon } from "hugeicons-react";
import TrHotelMealPrice from "./trHotelMealPrice";
import { useParams } from "react-router-dom";
import Return from "../util/return";
import TrExcursion from "../excursion/trExcursion";

export default function ExcursionsDispo(props) {
  const { programId } = props;

  const [show, setShow] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [message, setMessage] = useState("");
  const [next, setNext] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("");
  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState("asc");
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const fetchHotels = async (
    nextDoc = null,
    sort = "name",
    order = "asc",
    search = "",
    searchField = ""
  ) => {
    setLoading(true);
    setMessage("");
    try {
      const url = `http://localhost:3030/programs/${programId}/close_hotels`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        setMessage("Failed to fetch hotels");
        return;
      }
      const data = await response.json();
      setHotels(data);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching hotels");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowMap = () => setIsMapModalOpen(true);

  const handleSort = (value) => {
    setCurrentPage(1);
    setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    setSort(value);
  };

  const handleSelectCity = (e) => {
    setSearchField("city");
    setSearch(e.target.value);
  };

  useEffect(() => {
    fetchHotels(null, sort, order, search, searchField);
  }, [sort, order, search, searchField]);

  const handlePageChange = (nextDoc) => {
    fetchHotels(nextDoc, sort, order, search, searchField);
    setCurrentPage((prevPage) => (nextDoc ? prevPage + 1 : 1));
  };

  return (
    <>
      <div className="card-header pb-0 d-flex justify-content-between align-items-center">
        <div>
          <p style={{ fontSize: "15px" }}>Liste des excursions disponibles</p>
        </div>
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
        ) : hotels.length > 0 ? (
          <div className="table-responsive p-0">
            <table className="table align-items-center mb-0">
              <thead>
                <tr>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    Excursion
                  </th>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                    Prix
                  </th>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                    Distance
                  </th>
                </tr>
              </thead>
              <tbody>
                {hotels.slice(0, 3).map((hotel) => (
                  <>
                    <TrExcursion
                      key={hotel.id}
                      excursionId={hotel.id}
                      place_name={"hotel.place_name"}
                      city={hotel.city}
                      image={hotel.image}
                      price={"hotel.price"}
                      distance={hotel.distance}
                    />
                  </>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ marginLeft: "2.5%" }}></p>
        )}
      </div>
    </>
  );
}
