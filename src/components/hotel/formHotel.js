import React from "react";
import { Hotel01Icon } from "hugeicons-react";
import { useState } from "react";
import "./style.css";

export default function FormHotel(props) {
  const { title, method, image, name, address, city, phone, email, star, agencyId } =
    props;
  const [message, setMessage] = useState("");

  const [formValues, setFormValues] = useState({
    name: name || "",
    address: address || "",
    city: city || "Antananarivo",
    phone: phone || "",
    email: email || "",
    star: star || 0,
    image: image || null,
    agencyId: agencyId || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image" && e.target.files.length > 0) {
      setFormValues((prevValues) => ({
        ...prevValues,
        image: e.target.files[0],
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };
  
  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");
    const id = method === "PUT" ? `/${agencyId}` : "";

    const formData = new FormData();

    if (formValues.image) {
      formData.append("image", formValues.image);
    }

    formData.append("name", formValues.name);
    formData.append("address", formValues.address);
    formData.append("city", formValues.city);
    formData.append("phone", formValues.phone);
    formData.append("email", formValues.email);
    formData.append("star", formValues.star);
    formData.append("agencyId", formValues.agencyId);

    try {
      const response = await fetch(`http://localhost:3030/hotels${id}`, {
        method: method,
        body: formData,
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
        <form>
          <input
            type="hidden"
            name="agencyId"
            value={formValues.agencyId}
          ></input>
          <div className="row mb-3">
            <div className="col-md-10">
              <label>Nom</label>
              <input
                type="text"
                className="form-control"
                value={formValues.name}
                onChange={handleChange}
                name="name"
              />
            </div>
            <div className="col-md-2">
              <label>Etoiles</label>
              <input
                type="number"
                className="form-control"
                value={formValues.star}
                onChange={handleChange}
                name="star"
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
                name="address"
              />
            </div>
            <div className="col-md-6">
              <label>Ville</label>
              <select
                className="form-control"
                value={formValues.city}
                onChange={handleChange}
                name="city"
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
              name="email"
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
              name="phone"
            />
          </div>
          <div className="mb-3">
            <label for="formFile" className="form-label">
              Logo/image
            </label>
            <input
              className="form-control"
              name="image"
              type="file"
              id="formFile"
              onChange={handleChange}
            />
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
