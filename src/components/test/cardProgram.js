import React from "react";
import "./style.css";
import { Delete02Icon, Edit02Icon, MapsLocation01Icon } from "hugeicons-react";

export default function CardProgram({
  title,
  distance,
  duration,
  description,
}) {
  return (
    <div className="card-horizontal">
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
        rel="stylesheet"
      />
      <div className="card-body">
        <div className="card-header">
          <div>
            <h5 className="card-title">
              <MapsLocation01Icon
                size={25}
                color={"#344767"}
                variant={"stroke"}
                // style={{ margin: "3px 0 0 5px" }}
              />
              <span style={{marginLeft:"2%"}}>{title}</span>
            </h5>
          </div>
          <span className="card-price">
            {distance} | {duration}
          </span>
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
