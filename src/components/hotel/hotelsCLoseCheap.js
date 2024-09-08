import React, { useState, useEffect } from "react";
import "./hotel.css";
import { ArrowUpDownIcon } from "hugeicons-react";
import TrHotelMealPrice from "./trHotelMealPrice";
import { useParams } from "react-router-dom";

export default function HotelsCloseCheap() {
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

  const { programId } = useParams();

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
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="card mb-4">
            <div className="card-header pb-0 d-flex justify-content-between align-items-center">
              <h6>Liste des hôtels les plus proches</h6>
            </div>

            <div className="card-body px-0 pt-0 pb-2">
              {loading ? (
                <p>Loading...</p>
              ) : hotels.length > 0 ? (
                <div className="table-responsive p-0">
                  <table className="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Hotel
                        </th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                          Contacts
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Etoiles
                          <ArrowUpDownIcon
                            id="sortIcon"
                            size={18}
                            onClick={() => handleSort("star")}
                            style={{ marginLeft: "5px", marginTop: "-5px" }}
                          />
                        </th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                          Prix repas
                        </th>
                        <th className="text-secondary opacity-7"></th>
                        <th className="text-secondary opacity-7"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {hotels.map((hotel) => (
                        <>
                          <TrHotelMealPrice
                            key={hotel.id}
                            hotelId={hotel.id}
                            name={hotel.name}
                            address={hotel.address}
                            email={hotel.email}
                            phone={hotel.phone}
                            city={hotel.city}
                            star={hotel.star}
                            logo={hotel.image}
                            mealPrice={hotel.mealsPrice}
                          />
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p style={{ marginLeft: "2.5%" }}>Aucun hotel</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
