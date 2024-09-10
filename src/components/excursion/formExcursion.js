import React from "react";
import { Hotel01Icon } from "hugeicons-react";
import { useState } from "react";

export default function FormExcursion(props) {
  const {
    title,
    method,
    image,
    place_name,
    description,
    price,
    city,
    excursionId,
  } = props;

  const [message, setMessage] = useState("");

  const [formValues, setFormValues] = useState({
    place_name: place_name || "",
    description: description || "",
    city: city || "Antananarivo",
    price: price,
    image: image || null,
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

    const formData = new FormData();

    if (formValues.image) {
      formData.append("image", formValues.image);
    }

    formData.append("place_name", formValues.place_name);
    formData.append("description", formValues.description);
    formData.append("city", formValues.city);
    formData.append("price", formValues.price);
    try {
      const idUrl = method === "PUT" ? `/${excursionId}` : "";

      const response = await fetch(`http://localhost:3030/excursions${idUrl}`, {
        method: method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        if (response.status === 401) {
          setMessage("Problème");
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
          <div className="row mb-3">
            <div className="col-md-8">
              <label>Nom du lieu</label>
              <input
                type="text"
                name="place_name"
                className="form-control"
                value={formValues.place_name}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label>Ville</label>
              <select
                className="form-select"
                value={formValues.city}
                onChange={handleChange}
                name="city"
              >
                <option value="Antananarivo">Antananarivo</option>
                <option value="Toamasina">Toamasina</option>
                <option value="Mahajanga">Mahajanga</option>
                <option value="Fianarantsoa">Fianarantsoa</option>
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label>Description</label>
            <textarea
              type="text"
              name="description"
              className="form-control"
              value={formValues.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Prix</label>
            <input
              type="number"
              name="price"
              className="form-control"
              value={formValues.price}
              onChange={handleChange}
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
        </form>
      </div>
    </div>
  );
}
