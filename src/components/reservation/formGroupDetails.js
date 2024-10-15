import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./reservation.css";

export default function FormGroupDetails(props) {
  const {
    method,
    reservationId,
    totalPersons,
    totalCouple,
    customerId,
    onCancel,
  } = props;

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [customer, setCustomer] = useState({});
  const [rows, setRows] = useState([{ familyMembers: "", familyCount: "" }]);

  const [formValues, setFormValues] = useState({
    totalPersons: totalPersons,
    totalCouple: totalCouple,
    familyDetails: rows,
  });

  // Gestion de l'ajout d'une nouvelle ligne
  const handleAddRow = () => {
    setRows([...rows, { familyMembers: "", familyCount: "" }]);
  };

  // Gestion de la suppression d'une ligne
  const handleRemoveRow = (index) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  // Gestion de la modification des valeurs dans les inputs
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newRows = [...rows];
    newRows[index][name] = value;
    setRows(newRows);
  };

  // Mise à jour des valeurs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const fetchCustomer = async () => {
    setMessage("");
    try {
      const url = `http://localhost:3030/customers/${customerId}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        setMessage("Failed to fetch customer");
        return;
      }

      const data = await response.json();
      setCustomer(data);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching customer");
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    const updatedFormValues = {
      ...formValues,
      familyDetails: rows,
    };

    console.log(updatedFormValues);
    try {
      const idUrl = method === "PUT" ? `/${reservationId}` : "";
      const response = await fetch(
        `http://localhost:3030/reservations/${reservationId}/travel_participants${idUrl}`,
        {
          method: method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updatedFormValues),
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
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="card p-4 shadow-lg rounded-3"
      style={{ width: "60%", marginTop: "1%" }}
    >
      <div
        className="card-header d-flex justify-content-between align-items-center"
        style={{ marginBottom: "2%", height: "50px" }}
      >
        <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            className="bi bi-luggage-fill"
            viewBox="0 0 16 16"
          >
            <path d="M2 1.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V5h.5A1.5 1.5 0 0 1 8 6.5V7H7v-.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5H4v1H2.5v.25a.75.75 0 0 1-1.5 0v-.335A1.5 1.5 0 0 1 0 13.5v-7A1.5 1.5 0 0 1 1.5 5H2zM3 5h2V2H3z" />
            <path d="M2.5 7a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0v-5a.5.5 0 0 1 .5-.5m10 1v-.5A1.5 1.5 0 0 0 11 6h-1a1.5 1.5 0 0 0-1.5 1.5V8H8v8h5V8zM10 7h1a.5.5 0 0 1 .5.5V8h-2v-.5A.5.5 0 0 1 10 7M5 9.5A1.5 1.5 0 0 1 6.5 8H7v8h-.5A1.5 1.5 0 0 1 5 14.5zm9 6.5V8h.5A1.5 1.5 0 0 1 16 9.5v5a1.5 1.5 0 0 1-1.5 1.5z" />
          </svg>
          <span
            style={{ marginLeft: "2%", fontSize: "20px", color: "#273385" }}
          >
            Détails de la réservation
          </span>
        </div>
      </div>
      <div
        className="card-body"
        style={{ marginBottom: "-3%", marginTop: "-5%" }}
      >
        <p>
          Réservation au nom de: {customer.firstName} {customer.name}
        </p>
        <form id="myForm" autoComplete="off" style={{ marginTop: "0%" }}>
          <div className="row mb-3">
            <div className="col">
              <label className="form-label fw-bold">
                Nombre de personnes pour le voyage
              </label>
              <input
                type="number"
                className="form-control"
                value={formValues.totalPersons}
                onChange={handleChange}
                name="totalPersons"
              />
            </div>
          </div>

          <h6>Détails</h6>
          <div className="row mb-3">
            <div className="col">
              <label className="form-label fw-bold">Couple(s)</label>
              <input
                type="number"
                className="form-control"
                value={formValues.totalCouple}
                onChange={handleChange}
                name="totalCouple"
              />
            </div>
          </div>

          <label className="form-label fw-bold">Famille(s)</label>
          {rows.map((row, index) => (
            <div key={index} className="row mb-3 align-items-end">
              <div className="col-6">
                <input
                  type="number"
                  className="form-control"
                  value={row.familyMembers}
                  onChange={(e) => handleInputChange(index, e)}
                  name="familyMembers"
                  placeholder="Membres de la famille"
                />
              </div>
              <div className="col-4">
                <input
                  type="number"
                  className="form-control"
                  value={row.familyCount}
                  onChange={(e) => handleInputChange(index, e)}
                  name="familyCount"
                  placeholder="Nombre de familles"
                />
              </div>
              <div className="col-2">
                {index === 0 ? (
                  <button
                    type="button"
                    className="form-control"
                    onClick={handleAddRow}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-plus-lg"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2z"
                      />
                    </svg>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="form-control"
                    onClick={() => handleRemoveRow(index)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-dash-lg"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8z"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}

          <div className="d-flex justify-content-between mt-4">
            <span></span>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? "Chargement..." : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
