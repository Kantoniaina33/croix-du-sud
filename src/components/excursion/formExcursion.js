import React from "react";
import { Hotel01Icon } from "hugeicons-react";
import { useState } from "react";

export default function FormExcursion(props) {
  const {
    title,
    method,
    imageUrl,
    place_name,
    description,
    price,
    city,
    agencyId,
  } = props;
  const [message, setMessage] = useState("");

  const [formValues, setFormValues] = useState({
    place_name: place_name || "",
    description: description || "",
    city: city || "Antananarivo",
    price: price || "",
    agencyId: agencyId || "",
    imageUrl: imageUrl || null,
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
    const id = method === "PUT" ? `/${agencyId}` : "";
    
    const formData = new FormData();

    // formData.append("imageUrl", imageUrl);
    // formData.append("place_name", place_name);
    // formData.append("description", description);
    // formData.append("city", city);
    // formData.append("price", price);

    if (formValues.imageUrl) {
      formData.append("imageUrl", formValues.imageUrl);
    }
    // Ajouter toutes les autres valeurs
    formData.append("place_name", formValues.place_name);
    formData.append("description", formValues.description);
    formData.append("city", formValues.city);
    formData.append("price", formValues.price);
    formData.append("agencyId", formValues.agencyId);

    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      const response = await fetch(`http://localhost:3030/excursions${id}`, {
        method: method,
        // headers: {
        //   "Content-Type": "application/json",
        // },
        // body: JSON.stringify(formValues),
        body: formData
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
            type="text"
            name="agencyId"
            value={formValues.agencyId}
          ></input>
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
                className="form-control"
                value={formValues.city}
                onChange={handleChange}
                name="city"
              >
                <option value="Antananarivo" selected>
                  Antananarivo
                </option>
                <option value="Toamasina">Toamasina</option>
                <option value="Mahajanga">Mahajanga</option>
                <option value="Fianarantsoa">Fianarantsoa</option>
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label>Descritption</label>
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
              name="imageUrl"
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
