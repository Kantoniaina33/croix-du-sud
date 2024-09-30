// Home.js
import { useState } from "react";
import Modal from "../util/modal";
import MyMap from "../../components/geo/myMap";

function CardMap(props) {
  const { onClose, onSetCoordinates, initialCoordinates } = props;

  return (
    <div className="card p-1 shadow-lg rounded-3" style={{ width: "50%" }}>
      <MyMap
        onClose={onClose}
        onSetCoordinates={onSetCoordinates}
        initialCoordinates={initialCoordinates}
      />
    </div>
  );
}

export default CardMap;
