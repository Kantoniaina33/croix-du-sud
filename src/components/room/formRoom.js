import React from "react";
import { BedDoubleIcon } from "hugeicons-react";
import { useState } from "react";

export default function FormRoom(props) {
  const { title, type, capacity, price_category, price, total } = props;

  const [formValues, setFormValues] = useState({
    type: type || "",
    capacity: capacity || "",
    price_category: price_category || "",
    price: price || "",
    total: total || ""
  });

  const handleChange = (e) => {
    const { type, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [type]: value,
    }));
  };

  return (
    <div className="card card-plain mt-1" id="infoBack">
      <div className="card-header pb-0 text-left bg-transparent">
        <h4 className="" id="infoTitle">
          <BedDoubleIcon
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
              <label>Type</label>
              <select
                className="form-control"
                value={formValues.type}
                onChange={handleChange}
              >
                <option value="antananarivo">Double</option>
                <option value="toamasina">Twin</option>
              </select>
            </div>
            <div className="col-md-4">
              <label>Capacite</label>
              <input
                type="number"
                className="form-control"
                value={formValues.capacity}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-3">
              <label>Categorie de prix</label>
              <select
                className="form-control"
                value={formValues.price_category}
                onChange={handleChange}
              >
                <option value="antananarivo">Premier</option>
                <option value="toamasina">Second</option>
              </select>
            </div>
          <div className="mb-3">
              <label>Tarif par nuit</label>
              <input
              type="text"
              className="form-control"
              value={formValues.price}
              onChange={handleChange}
            />
            </div>
          <div className="mb-3">
            <label for="formFile" className="form-label">
              Nombre total
            </label>
            <input
              type="number"
              className="form-control"
              value={formValues.total}
              onChange={handleChange}
            />
          </div>
          <div className="text-center">
            <button type="button" className="btn w-100 mt-4 mb-0" id="saveInfo">
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
