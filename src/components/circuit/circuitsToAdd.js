import React from "react";
import { useEffect, useState } from "react";
import MiniCardCircuit from "./miniCardCircuit";
import MyPaginationFront from "../util/myPaginationFront";
import { useNavigate } from "react-router-dom";

export default function CircuitsToAdd(props) {
  const { title, circuitId } = props;
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [circuits, setCircuits] = useState([]);
  const [day, setDay] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("");
  const [sort, setSort] = useState("departure");
  const [order, setOrder] = useState("asc");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCircuitId, setSelectedCircuitId] = useState(null);
  const navigate = useNavigate();

  const limit = 4;
  const circuitsPerPage = 4;

  const indexOfLastCircuit = currentPage * circuitsPerPage;
  const indexOfFirstCircuit = indexOfLastCircuit - circuitsPerPage;
  const currentCircuits = circuits.slice(
    indexOfFirstCircuit,
    indexOfLastCircuit
  );

  const fetchCircuits = async (
    sort = "departure",
    order = "asc",
    search = "",
    searchField = ""
  ) => {
    setLoading(true);
    setMessage("");
    try {
      const url = `http://localhost:3030/circuits/circuits/${circuitId}?limit=${limit}&&orderBy=${sort}&&order=${order}&&searchField=${searchField}&&search=${search}`;
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

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await fetch(
        `http://localhost:3030/circuits/${circuitId}/circuits/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ day: Number(day), circuitId: selectedCircuitId}),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          setMessage("Problem");
        } else {
          setMessage("Failed");
        }
        return;
      }
      navigate(`/circuits/${circuitId}/circuits`);
    } catch (error) {
      console.error("Error:", error);
    }
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
          <h7>Choisir un circuitme</h7>
        </div>
      </div>
      <div style={{ marginLeft: "2%" }}>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="nom" className="form-label fw-bold">
              JOUR
            </label>
            <input
              style={{ width: "20%" }}
              type="number"
              className="form-control"
              id="nom"
              value={day}
              onChange={handleChange}
              name="day"
              required
            />
          </div>
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
              {currentCircuits.map((circuit) => (
                <MiniCardCircuit
                  key={circuit.id}
                  circuitId={circuit.id}
                  departure={circuit.departure}
                  arrival={circuit.arrival}
                  distance={circuit.distance}
                  duration={circuit.duration}
                  style={{
                    flex: "1 1 calc(25% - 10px)",
                    boxSizing: "border-box",
                    marginBottom: "20px",
                  }}
                  // circuitId={circuitId}
                  selectedCircuit={selectedCircuitId}
                  onCircuitSelect={handleCircuitIdSelect}
                />
              ))}
            </div>
            <div className="d-flex justify-content-between align-items-center p-3">
              <p></p>
              <a
                href={`/circuits/${circuitId}/circuits/configuration`}
                type="submit"
                className="btn btn-primary"
                style={{
                  margin: "1%",
                }}
                onClick={handleSave}
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
              </a>
            </div>
            {/* <div style={{ margin: "2% 0 0 40%" }}>
              {circuits.length > circuitsPerPage && (
                <MyPaginationFront
                  totalCircuits={circuits.length}
                  circuitsPerPage={circuitsPerPage}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              )}
            </div> */}
          </>
        ) : (
          <p style={{ marginLeft: "2.5%", fontSize: "14px" }}>
            Aucun circuitme à choisir
          </p>
        )}
      </div>
    </>
  );
}
