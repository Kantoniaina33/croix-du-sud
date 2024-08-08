import React from "react";
import { Hotel01Icon } from "hugeicons-react";
import { useState } from "react";

export default function FormHotel(props) {
  const { title, logo, name, address, city, phone, email, star } = props;

  const [formValues, setFormValues] = useState({
    name: name || "",
    address: address || "",
    city: city || "",
    phone: phone || "",
    email: email || "",
    star: star || 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <div className="card card-plain mt-1" id="infoBack">
      <div className="card-header pb-0 text-left bg-transparent">
        <h4 className="" id="infoTitle">
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
            <div className="col-md-10">
              <label>Nom</label>
              <input
                type="text"
                className="form-control"
                value={formValues.name}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-2">
              <label>Etoiles</label>
              <input
                type="number"
                className="form-control"
                value={formValues.star}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label>Adresse</label>
              <input
                type="text"
                className="form-control"
                value={formValues.address}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
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
            <label for="formFile" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="formFile" className="form-label">
              Téléphone
            </label>
            <input
              type="text"
              className="form-control"
              value={formValues.phone}
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
