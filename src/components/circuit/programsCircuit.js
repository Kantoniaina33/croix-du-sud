import React from "react-bootstrap";
import {
  Delete02Icon,
  Edit02Icon,
  StarIcon,
  LinkSquare02Icon,
  PlusSignSquareIcon,
} from "hugeicons-react";
import FormCircuit from "./formCircuit";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import AlertDelete from "../util/alertDelete";
import AddProgram from "./addProgram";
import MiniCardProgram from "../program/miniCardProgram";
import CardSeeMore from "../util/cardSeeMore";

export default function ProgramsCircuit(props) {
  const { title, circuitId } = props;
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [programId, setProgramId] = useState([]);
  const [next, setNext] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("");
  const [sort, setSort] = useState("departure");
  const [order, setOrder] = useState("asc");

  const fetchPrograms = async (
    nextDoc = null,
    sort = "departure",
    order = "asc",
    search = "",
    searchField = ""
  ) => {
    setLoading(true);
    setMessage("");
    try {
      const url = `http://localhost:3030/programs?next=${
        nextDoc || ""
      }&&orderBy=${sort}&&order=${order}&&searchField=${searchField}&&search=${search}`;

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
      setNext(data.next);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching programs");
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    setProgramId(e.target.value);
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
    fetchPrograms(null, sort, order, search, searchField);
  }, [sort, order, search, searchField]);

  const handlePageChange = (nextDoc) => {
    fetchPrograms(nextDoc, sort, order, search, searchField);
    setCurrentPage((prevPage) => (nextDoc ? prevPage + 1 : 1));
  };

  return (
    <>
      <div className="card-header pb-0">
        <h5>TERRES ET CONTRASTES</h5>
        <h6>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-list-nested"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M4.5 11.5A.5.5 0 0 1 5 11h10a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5m-2-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m-2-4A.5.5 0 0 1 1 3h10a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5"
            />
          </svg>
          <span style={{ marginLeft: "1%" }}>Liste des programmes</span>
        </h6>
      </div>
      <div className="card-body px-0 pt-0 pb-2 mt-3">
        {loading ? (
          <p>Loading...</p>
        ) : programs.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0px" }}>
            {programs.slice(0, 3).map((program) => (
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
                icon="minus"
              />
            ))}
            <CardSeeMore
              style={{
                flex: "1 1 calc(25% - 10px)",
                boxSizing: "border-box",
                marginBottom: "20px",
              }}
            />
          </div>
        ) : (
          <p style={{ marginLeft: "2.5%" }}>Aucun emploi</p>
        )}
      </div>
    </>
  );
}
