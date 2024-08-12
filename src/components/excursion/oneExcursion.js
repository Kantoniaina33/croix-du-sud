import React from "react";
import { DollarCircleIcon } from "hugeicons-react";

export default function OneExcursion(props) {
  const { logo, place_name, city, price, description } = props;
  return (
    <div class="col-xl-3 col-md-6 mb-xl-0 mb-4">
      <div class="card card-blog card-plain">
        <div class="position-relative">
          <a class="d-block shadow-xl border-radius-xl">
            <img
              alt="excursion"
              class="img-fluid shadow border-radius-xl"
              src={logo}
              style={{ width: "100%", height: "150px" }}
            />
          </a>
        </div>
        <div class="card-body px-1 pb-0">
          <a href="#">
            <h5 style={{ marginBottom: -8 }}>{place_name}</h5>
            <span classN="text-gradient text-dark mb-2 text-sm">
              {city}
            </span>
          </a>
          <p classN="font-weight-bold  mb-2 text-md">
            <span>
              <DollarCircleIcon size={20} color="blue" variant={"stroke"} />
            </span>
            <span style={{ color: "blue", margin: "5px" }}>{price}</span>
          </p>
          <p class="mb-4 text-sm">
            {description}
          </p>
          <div class="d-flex align-items-center justify-content-between">
            <button type="button" class="btn btn-outline-primary btn-sm mb-0">
              Modifier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
