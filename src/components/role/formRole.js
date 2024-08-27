import React, { useEffect } from "react";
import { useState } from "react";
import "./style.css";

export default function FormRole(props) {
  const { title, method, name, hourlyWage, roleId } = props;
  const [message, setMessage] = useState("");

  const [formValues, setFormValues] = useState({
    name: name || "",
    hourlyWage: hourlyWage || 1,
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
    console.log(formValues);
    try {
      const idUrl = method === "PUT" ? `/${roleId}` : "";

      const response = await fetch(`http://localhost:3030/roles${idUrl}`, {
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
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="card card-plain mt-1">
      <div className="card-header pb-0 text-left" id="formRole">
        <h4 className="" id="titleFormRole">
          {/* <Role01Icon
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
            <label>Emploi</label>
            <input
              type="text"
              className="form-control"
              value={formValues.name}
              onChange={handleChange}
              name="name"
            />
          </div>
          <div className="mb-3">
            <label>Salaire horaire</label>
            <input
              type="text"
              className="form-control"
              value={formValues.hourlyWage}
              onChange={handleChange}
              name="hourlyWage"
            />
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={handleSave}
              className="btn w-100 mt-4 mb-0"
              id="saveRole"
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
