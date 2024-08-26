import React, { useEffect } from "react";
import { useState } from "react";
import "./style.css";
import { CircleIcon } from "hugeicons-react";

export default function AddEmployee(props) {
  const {
    title,
    method,
    firstName,
    name,
    birthDate,
    genre,
    contact,
    employeeId,
    roleId,
  } = props;

  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [roles, setRoles] = useState([]);
  const [next, setNext] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("");
  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState("asc");

  const fetchRoles = async (
    nextDoc = null,
    sort = "name",
    order = "asc",
    search = "",
    searchField = ""
  ) => {
    setLoading(true);
    setMessage("");
    try {
      const url = `http://localhost:3030/roles?next=${
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
        setMessage("Failed to fetch roles");
        return;
      }
      const data = await response.json();
      setRoles(data.roles);
      setNext(data.next);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching roles");
    } finally {
      setLoading(false);
    }
  };

  const [formValues, setFormValues] = useState({
    firstName: firstName || "",
    name: name,
    birthDate: birthDate || "",
    genre: genre || "Homme",
    contact: contact,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
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
    fetchRoles(null, sort, order, search, searchField);
  }, [sort, order, search, searchField]);

  const handlePageChange = (nextDoc) => {
    fetchRoles(nextDoc, sort, order, search, searchField);
    setCurrentPage((prevPage) => (nextDoc ? prevPage + 1 : 1));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");
    const idUrl = method === "PUT" ? `/${employeeId}` : "";
    console.log(formValues);
    try {
      const response = await fetch(
        `http://localhost:3030/roles/${roleId}/employees${idUrl}`,
        {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
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
          <div className="row mb-3">
            <div className="col-md-6">
              <label>Nom</label>
              <input
                type="text"
                className="form-control"
                value={formValues.firstName}
                onChange={handleChange}
                name="firstName"
              />
            </div>
            <div className="col-md-6">
              <label>Prenom</label>
              <input
                type="text"
                className="form-control"
                value={formValues.name}
                onChange={handleChange}
                name="name"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <label>Genre</label>
              <select
                className="form-select"
                value={formValues.genre}
                onChange={handleChange}
                name="genre"
              >
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
              </select>
            </div>
            <div className="col-md-8">
              <label>Date de naissance</label>
              <input
                type="date"
                className="form-control"
                value={formValues.birthDate}
                onChange={handleChange}
                name="birthDate"
              />
            </div>
          </div>
          <div className="mb-3">
            <label>Contact</label>
            <input
              type="text"
              className="form-control"
              value={formValues.contact}
              onChange={handleChange}
              name="contact"
            />
          </div>
          {/* <div className="mb-3">
            <label>Emploi</label>
            <select
              className="form-select"
              value={roleId}
              onChange={handleChange}
              name="roleId"
            >
              {roles.map((role) => (
                <>
                  <option value={role.id}>
                    {role.departure} -{role.arrival}
                  </option>
                </>
              ))}
            </select>
          </div> */}
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
