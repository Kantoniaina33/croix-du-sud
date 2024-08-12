import React from "react";
import { Hotel01Icon } from "hugeicons-react";
import { useState } from "react";

export default function FormExcursion(props) {
  const { title, logo, place_name, description, price, city } = props;
  const [message, setMessage] = useState("");

  const [formValues, setFormValues] = useState({
    place_name: place_name || "",
    description: description || "",
    city: city || "",
    price: price || "",
  });

  const handleChange = (e) => {
    const { place_name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [place_name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:3030/excursions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ place_name, description, price, city }),
      });

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
      <div className="card-header pb-0 text-left" id="formHotel">
        <h4 className="" id="titleFormHotel">
          <Hotel01Icon
            size={40}
            color="#273385"
            variant={"stroke"}
            style={{
              marginTop: "-1%",
              boxShadow: "0px 5px 5px 0 rgba(0, 0, 0, 0.082)",
              padding: "2%",
              borderRadius: "5px",
            }}
          />
          <span style={{ marginLeft: "3%" }}>{title}</span>
        </h4>
      </div>
      <div className="card-body">
        <form role="form">
          <div className="row mb-3">
            <div className="col-md-8">
              <label>Nom du lieu</label>
              <input
                type="text"
                className="form-control"
                value={formValues.place_name}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label>Ville</label>
              <select
                className="form-control"
                value={formValues.city}
                onChange={handleChange}
              >
                <option value="antananarivo">Antananarivo</option>
                <option value="toamasina">Toamasina</option>
                <option value="mahajanga">Mahajanga</option>
                <option value="fianarantsoa">Fianarantsoa</option>
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label>Descritption</label>
            <textarea
              type="text"
              className="form-control"
              value={formValues.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Prix</label>
            <input
              type="text"
              className="form-control"
              value={formValues.price}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="formFile" className="form-label">
              Logo/image
            </label>
            <input className="form-control" type="file" id="formFile" />
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={handleSave}
              className="btn w-100 mt-4 mb-0"
              id="saveHotel"
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
