import React, { useState, useEffect } from "react";
import "./provider.css";
import { ArrowUpDownIcon } from "hugeicons-react";
import TrProviderMealPrice from "./trProviderMealPrice";
import { useParams } from "react-router-dom";
import Return from "../util/return";

export default function ProvidersCloseCheap(props) {
  const { programId } = props;

  const [show, setShow] = useState(false);
  const [providers, setProviders] = useState([]);
  const [message, setMessage] = useState("");
  const [next, setNext] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("");
  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState("asc");
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const fetchProviders = async (
    nextDoc = null,
    sort = "name",
    order = "asc",
    search = "",
    searchField = ""
  ) => {
    setLoading(true);
    setMessage("");
    try {
      const url = `http://localhost:3030/programs/${programId}/close_providers`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        setMessage("Failed to fetch providers");
        return;
      }
      const data = await response.json();
      setProviders(data);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching providers");
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
    fetchProviders(null, sort, order, search, searchField);
  }, [sort, order, search, searchField]);

  const handlePageChange = (nextDoc) => {
    fetchProviders(nextDoc, sort, order, search, searchField);
    setCurrentPage((prevPage) => (nextDoc ? prevPage + 1 : 1));
  };

  return (
    <>
      <div className="card-header pb-0 d-flex justify-content-between align-items-center">
        <div>
          <p style={{ fontSize: "16px" }}>Liste des hôtels les plus proches</p>
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
        ) : providers.length > 0 ? (
          <div className="table-responsive p-0">
            <table className="table align-items-center mb-0">
              <thead>
                <tr>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    Provider
                  </th>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                    Contacts
                  </th>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                    Etoiles
                    {/* <ArrowUpDownIcon
                            id="sortIcon"
                            size={18}
                            onClick={() => handleSort("star")}
                            style={{ marginLeft: "5px", marginTop: "-5px" }}
                          /> */}
                  </th>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                    Prix repas
                  </th>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                    Distance
                  </th>
                </tr>
              </thead>
              <tbody>
                {providers.slice(0, 3).map((provider) => (
                  <>
                    <TrProviderMealPrice
                      key={provider.id}
                      providerId={provider.id}
                      name={provider.name}
                      address={provider.address}
                      email={provider.email}
                      phone={provider.phone}
                      city={provider.city}
                      star={provider.star}
                      logo={provider.image}
                      mealPrice={provider.mealsPrice}
                      distance={provider.distance}
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
