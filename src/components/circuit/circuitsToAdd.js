import React from "react";
import { useEffect, useState } from "react";
import MiniCardCircuit from "./miniCardCircuit";
import MyPaginationFront from "../util/myPaginationFront";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function CircuitsToAdd() {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [circuits, setCircuits] = useState([]);
  const [day, setDay] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("");
  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState("asc");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCircuitId, setSelectedCircuitId] = useState(null);
  const navigate = useNavigate();

  const limit = 4;

  const fetchCircuits = async (
    sort = "name",
    order = "asc",
    search = "",
    searchField = ""
  ) => {
    setLoading(true);
    setMessage("");
    try {
      const url = `http://localhost:3030/circuits/paginated?limit=${limit}&&orderBy=${sort}&&order=${order}&&searchField=${searchField}&&search=${search}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        setMessage("Failed to fetch circuits");
        return;
      }
      const data = await response.json();
      setCircuits(data.circuits);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching circuits");
    } finally {
      setLoading(false);
    }
  };

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
    fetchCircuits(sort, order, search, searchField);
  }, [sort, order, search, searchField]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleChange = (e) => {
    setDay(e.target.value);
  };


  const handleCircuitIdSelect = (circuitId) => {
    setSelectedCircuitId(circuitId);
  };

  return (
    <>
      <div className="card-header pb-0 d-flex justify-content-between align-items-center">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flex: 1,
            color: "#273385",
          }}
        >
          <h7>Choisir un circuit</h7>
        </div>
      </div>
      <div className="card-body px-0 pt-0 pb-2 mt-4">
        {loading ? (
          <div
            className="spinner-border spinner-border-sm"
            role="status"
            style={{ marginLeft: "3%" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : circuits.length > 0 ? (
          <>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0px" }}>
              {circuits.map((circuit) => (
                <MiniCardCircuit
                  key={circuit.id}
                  circuitId={circuit.id}
                  name={circuit.name}
                  style={{
                    flex: "1 1 calc(25% - 10px)",
                    boxSizing: "border-box",
                    marginBottom: "20px",
                  }}
                  price={10000}
                  selectedCircuit={selectedCircuitId}
                  onCircuitSelect={handleCircuitIdSelect}
                />
              ))}
            </div>
            <div className="d-flex justify-content-between align-items-center p-3">
              <p></p>
              <Link
                to={`/customers/${id}/reservation/informations`}
                state={selectedCircuitId}
                className="btn btn-primary"
                style={{
                  margin: "1%",
                }}
              >
                {isLoading ? (
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  "Enregistrer"
                )}
              </Link>
            </div>
          </>
        ) : (
          <p style={{ marginLeft: "2.5%", fontSize: "14px" }}>
            Aucun circuit à choisir
          </p>
        )}
      </div>
    </>
  );
}
