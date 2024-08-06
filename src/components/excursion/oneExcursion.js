import React from "react";
import {
  Delete02Icon,
  Edit02Icon,
  StarIcon,
  LinkSquare02Icon,
} from "hugeicons-react";

export default function OneExcursion(props) {
  const { logo, name, address, city, phone, email, star } = props;
  const starsArray = Array.from({ length: 5 }, (v, i) =>
    i < star ? "#ffc400" : "grey"
  );
  return (
    <div class="col-xl-3 col-md-6 mb-xl-0 mb-4">
      <div class="card card-blog card-plain">
        <div class="position-relative">
          <a class="d-block shadow-xl border-radius-xl">
            <img
              src="/tsimbazaza.jpg"
              alt="img-blur-shadow"
              class="img-fluid shadow border-radius-xl"
              style={{ width: "100%", height: "150px" }}
            />
          </a>
        </div>
        <div class="card-body px-1 pb-0">
          <a href="#">
            <h5>Tsimbazaza</h5>
            <span class="text-gradient text-dark mb-2 text-sm">Antanarivo</span>
          </a>
          <p class="text-gradient text-dark mb-2 text-sm">1000 Ar</p>
          <p class="mb-4 text-sm">
            As Uber works through a huge amount of internal management.
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
