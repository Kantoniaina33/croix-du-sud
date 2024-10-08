import React from "react";
import { useEffect, useState } from "react";
import MiniCardProgram from "./miniCardProgram";
import MyPaginationFront from "../util/myPaginationFront";

export default function ProgramsToAdd(props) {
  const { title, circuitId } = props;
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [day, setDay] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("");
  const [sort, setSort] = useState("departure");
  const [order, setOrder] = useState("asc");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProgramId, setSelectedProgramId] = useState(null);

  const limit = 4;
  const programsPerPage = 4;

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

  const handleChange = (e) => {
    setDay(e.target.value);
  };


  const handleProgramIdSelect = (e) => {
    const programId = e.target.value;
    setSelectedProgramId(programId);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");
    console.log(Number(day));
    console.log(selectedProgramId);
    

    try {
      const response = await fetch(
        `http://localhost:3030/circuit/${circuitId}/programs/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ day: Number(day), programId: selectedProgramId}),
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
      window.location.reload();
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
          <h7>Choisir un programme</h7>
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
                  selectedProgram={selectedProgramId}
                  onProgramSelect={handleProgramIdSelect}
                />
              ))}
            </div>
            <div className="d-flex justify-content-between align-items-center p-3">
              <p></p>
              <a
                href={`/circuits/${circuitId}/programs/configuration`}
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
              {programs.length > programsPerPage && (
                <MyPaginationFront
                  totalPrograms={programs.length}
                  programsPerPage={programsPerPage}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              )}
            </div> */}
          </>
        ) : (
          <p style={{ marginLeft: "2.5%", fontSize: "14px" }}>
            Aucun programme à choisir
          </p>
        )}
      </div>
    </>
  );
}
