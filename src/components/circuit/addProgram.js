import React, { useEffect } from "react";
import { useState } from "react";
import "./style.css";
import { CircleIcon } from "hugeicons-react";

export default function AddProgram(props) {
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

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await fetch(
        `http://localhost:3030/circuits/${circuitId}/programs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({programId: programId}),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          setMessage("Probleme");
        } else {
          setMessage("Failed");
        }
        return;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="card card-plain mt-1">
      <div className="card-header pb-0 text-left" id="formCircuit">
        <h4 className="" id="titleFormCircuit">
          {/* <Circuit01Icon
            size={40}
            color="#273385"
            variant={"stroke"}
            style={{
              marginTop: "-1%",
              boxShadow: "0px 5px 5px 0 rgba(0, 0, 0, 0.082)",
              padding: "2%",
              borderRadius: "5px",
            }}
          /> */}
          <span style={{ marginLeft: "3%" }}>{title}</span>
        </h4>
      </div>
      <div className="card-body">
        <form>
          <div className="mb-3">
            <label>Programme</label>
            <select
              className="form-select"
              value={programId}
              onChange={handleChange}
              name="programId"
            >
              {programs.map((program) => (
                <>
                  <option value={program.id}>
                    {program.departure} -{program.arrival}
                  </option>
                </>
              ))}
            </select>
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={handleSave}
              className="btn w-100 mt-4 mb-0"
            >
              Enregistrer
            </button>
          </div>
          <br></br>
          <br></br>
        </form>
      </div>
    </div>
  );
}
