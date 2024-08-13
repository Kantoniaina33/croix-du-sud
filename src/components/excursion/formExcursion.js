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
    agencyId,
  } = props;

  const [message, setMessage] = useState("");

  // Initialisation des valeurs du formulaire avec les props ou des valeurs par défaut
  const [formValues, setFormValues] = useState({
    place_name: place_name || "",
    description: description || "",
    city: city || "Antananarivo",
    price: price || "",
    agencyId: agencyId || "",
    image: image || null, // image initialisée à null si non fournie
  });

  // Gestionnaire de changement pour mettre à jour l'état des valeurs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Si l'utilisateur change l'image, stocker l'objet fichier dans le state
    if (name === "image" && e.target.files.length > 0) {
      // Mettre à jour avec le fichier sélectionné
      setFormValues((prevValues) => ({
        ...prevValues,
        image: e.target.files[0], // Récupérer l'objet fichier sélectionné
      }));
    } else {
      // Mettre à jour avec la valeur saisie
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  // Gestionnaire pour sauvegarder les données du formulaire
  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");

    // Construction de l'URL avec l'ID de l'agence si en mode PUT (mise à jour)
    const id = method === "PUT" ? `/${agencyId}` : "";

    // Utilisation de FormData pour inclure le fichier image et les autres données du formulaire
    const formData = new FormData();

    // Ajouter l'image au formData si elle existe
    if (formValues.image) {
      formData.append("image", formValues.image);
    }

    // Ajouter les autres champs du formulaire à formData
    formData.append("place_name", formValues.place_name);
    formData.append("description", formValues.description);
    formData.append("city", formValues.city);
    formData.append("price", formValues.price);
    formData.append("agencyId", formValues.agencyId);

    // Debugging: Afficher les paires clé-valeur dans la console
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      // Envoyer les données au serveur en utilisant la méthode spécifiée (POST ou PUT)
      const response = await fetch(`http://localhost:3030/excursions${id}`, {
        method: method,
        // headers: {
        //   "Content-Type": "application/json", // Commenté car FormData gère les en-têtes
        // },
        body: formData // Envoi des données avec FormData
      });

      // Vérification de la réponse du serveur
      if (!response.ok) {
        if (response.status === 401) {
          setMessage("Problème d'authentification");
        } else {
          setMessage("Échec de la sauvegarde");
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
            readOnly // Rendre le champ non modifiable
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
                <option value="Antananarivo">Antananarivo</option>
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

