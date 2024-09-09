import React, { useEffect } from "react";
import { useState } from "react";
import "./employee.css";
import { CircleIcon } from "hugeicons-react";
import SelectRoles from "../util/selectRoles";
import { useNavigate } from "react-router-dom";

export default function FormEmployee(props) {
  const {
    title,
    method,
    firstName,
    name,
    birthDate,
    genre,
    contact,
    roleId,
    employeeId,
    isRoleIdDefined,
  } = props;

  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    firstName: firstName || "",
    name: name,
    birthDate: birthDate || "",
    genre: genre || "Homme",
    contact: contact,
    roleId: roleId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");
    const idUrl = method === "PUT" ? `/${employeeId}` : "";
    console.log(formValues);
    try {
      const response = await fetch(`http://localhost:3030/employees${idUrl}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setMessage("Problem");
        } else {
          setMessage("Failed");
        }
        return;
      }
      navigate("/reservatio");
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
          {!isRoleIdDefined && (
            <div className="mb-3">
              <label>Poste</label>
              <SelectRoles
                value={formValues.roleId}
                onChange={handleChange}
                name="roleId"
              />
            </div>
          )}
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
