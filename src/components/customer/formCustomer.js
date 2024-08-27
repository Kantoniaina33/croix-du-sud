import React, { useEffect } from "react";
import { useState } from "react";
import "./style.css";

export default function FormCustomer(props) {
  const { title, method, name, firstName, contact, customerId } = props;
  const [message, setMessage] = useState("");

  const [formValues, setFormValues] = useState({
    name: name,
    firstName: firstName,
    contact: contact,
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
      const idUrl = method === "PUT" ? `/${customerId}` : "";

      const response = await fetch(`http://localhost:3030/customers${idUrl}`, {
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
      <div className="card-header pb-0 text-left" id="formCustomer">
        <h4 className="" id="titleFormCustomer">
          {/* <Customer01Icon
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
            <label>Nom</label>
            <input
              type="text"
              className="form-control"
              value={formValues.firstName}
              onChange={handleChange}
              name="firstName"
            />
          </div>
          <div className="mb-3">
            <label>Prenom</label>
            <input
              type="text"
              className="form-control"
              value={formValues.name}
              onChange={handleChange}
              name="name"
            />
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
          <div className="text-center">
            <button
              type="button"
              onClick={handleSave}
              className="btn w-100 mt-4 mb-0"
              id="saveCustomer"
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
