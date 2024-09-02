import React from "react";
import "./style.css";
import { Delete02Icon, Edit02Icon } from "hugeicons-react";

export default function CardH({ imageUrl, title, city, price, description }) {
  return (
    <div className="card-horizontal">
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
        rel="stylesheet"
      />
      <div className="card-image">
        <img src={imageUrl} alt="Image" />
      </div>
      <div className="card-body">
        <div className="card-header">
          <div>
            <h5 className="card-title">{title}</h5>
            <span>{city}</span>
          </div>
          <span className="card-price">{price}</span>
        </div>
        <p className="card-description">{description}</p>
        <div className="card-actions">
          <button
            style={{
              backgroundColor: "white",
              border: "transparent",
            }}
          >
            <Edit02Icon color="#273385" size={23} />
          </button>
          <button
            style={{
              backgroundColor: "white",
              border: "transparent",
            }}
          >
            <Delete02Icon color="rgb(219, 1, 1)" size={23} />
          </button>
        </div>
      </div>
    </div>
  );
}
