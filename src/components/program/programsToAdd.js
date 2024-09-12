import React from "react";
import { useEffect, useState } from "react";
import MiniCardProgram from "./miniCardProgram";
import MyPaginationFront from "../util/myPaginationFront";

export default function ProgramsToAdd(props) {
  const { title, circuitId } = props;
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("");
  const [sort, setSort] = useState("departure");
  const [order, setOrder] = useState("asc");
  const limit = 4;
  const programsPerPage = 4;

  // Calcul des programmes à afficher pour la page actuelle
  const indexOfLastProgram = currentPage * programsPerPage;
  const indexOfFirstProgram = indexOfLastProgram - programsPerPage;
  const currentPrograms = programs.slice(
    indexOfFirstProgram,
    indexOfLastProgram
  );

  const fetchPrograms = async (
    sort = "departure",
    order = "asc",
    search = "",
    searchField = ""
  ) => {
    setLoading(true);
    setMessage("");
    try {
      const url = `http://localhost:3030/programs/circuits/${circuitId}?limit=${limit}&&orderBy=${sort}&&order=${order}&&searchField=${searchField}&&search=${search}`;
      console.log(url);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        setMessage("Failed to fetch programs");
        return;
      }
      const data = await response.json();
      setPrograms(data.programs);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching programs");
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
    fetchPrograms(sort, order, search, searchField);
  }, [sort, order, search, searchField]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-plus-circle"
            viewBox="0 0 16 16"
            style={{ marginBottom: "0%" }}
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
          <h7 style={{ marginLeft: "1%" }}>Ajouter des programmes</h7>
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
        ) : programs.length > 0 ? (
          <>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0px" }}>
              {currentPrograms.map((program) => (
                <MiniCardProgram
                  key={program.id}
                  programId={program.id}
                  departure={program.departure}
                  arrival={program.arrival}
                  distance={program.distance}
                  duration={program.duration}
                  style={{
                    flex: "1 1 calc(25% - 10px)",
                    boxSizing: "border-box",
                    marginBottom: "20px",
                  }}
                  circuitId={circuitId}
                />
              ))}
            </div>
            <div style={{ margin: "2% 0 0 40%" }}>
              {programs.length > programsPerPage && (
                <MyPaginationFront
                  totalPrograms={programs.length}
                  programsPerPage={programsPerPage}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </>
        ) : (
          <p style={{ marginLeft: "2.5%", fontSize: "14px" }}>
            Aucun programme à ajouter
          </p>
        )}
      </div>
    </>
  );
}
