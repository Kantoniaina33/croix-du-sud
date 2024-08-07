import React from "react";
import {
  DollarCircleIcon,
} from "hugeicons-react";

export default function OneExcursion(props) {
  const { logo, name, address, city, phone, email, star } = props;
  const starsArray = Array.from({ length: 5 }, (v, i) =>
    i < star ? "#ffc400" : "grey"
  );
  return (
    <div classN="col-xl-3 col-md-6 mb-xl-0 mb-4">
      <div classN="card card-blog card-plain">
        <div classN="position-relative">
          <a classN="d-block shadow-xl border-radius-xl">
            <img
              src="/tsimbazaza.jpg"
              alt="img-blur-shadow"
              classN="img-fluid shadow border-radius-xl"
              style={{ width: "100%", height: "150px" }}
            />
          </a>
        </div>
        <div classN="card-body px-1 pb-0">
          <a href="#">
            <h5 style={{ marginBottom: -8 }}>Tsimbazaza</h5>
            <span classN="text-gradient text-dark mb-2 text-sm">Antanarivo</span>
          </a>
          <p classN="font-weight-bold  mb-2 text-md">
            <span>
              <DollarCircleIcon size={20} color="blue" variant={"stroke"} />
            </span>
            <span style={{ color: "blue", margin: "5px" }}>1000 Ar</span>
          </p>
          <p classN="mb-4 text-sm">
            As Uber works through a huge amount of internal management.
          </p>
          <div classN="d-flex align-items-center justify-content-between">
            <button type="button" classN="btn btn-outline-primary btn-sm mb-0">
              Modifier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
