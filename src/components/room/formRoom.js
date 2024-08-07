import React from "react";
import { StarIcon, Call02Icon, Mail01Icon } from "hugeicons-react";

export default function FormRoom(props) {
  const { logo, name, address, city, phone, email, star } = props;
  const starsArray = Array.from({ length: star }, (v, i) =>
    i < star ? "#ffc400" : "grey"
  );
  return (
    <div className="card card-plain mt-1" id="infoBack">
      <div className="card-header pb-0 text-left bg-transparent">
        <h4 className="" id="infoTitle">
          Chambre
        </h4>
      </div>
      <div className="card-body">
        <form role="form">
          <label>Type</label>
          <div className="mb-3">
            <input type="text" className="form-control" />
          </div>
          <label>Capacité</label>
          <div className="mb-3">
            <input type="text" className="form-control" />
          </div>
          <label>Catégorie de prix</label>
          <div className="mb-3">
            <textarea className="form-control" />
          </div>
          <div className="mb-3">
            <label for="formFile" className="form-label">
              Tarif par nuit
            </label>
            <input className="form-control" type="file" id="formFile" />
          </div>
          <div className="mb-3">
            <label for="formFile" className="form-label">
              Total
            </label>
            <input className="form-control" type="file" id="formFile" />
          </div>
          <div className="mb-3">
            <label for="formFile" className="form-label">
              Étoiles
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
