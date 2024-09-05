// Home.js
import { useState } from "react";
import FormHotel2 from "../../components/hotel/formHotel2";
import Modal from "../../components/hotel/modal";
import MyMap from "../../components/geo/myMap";
import MapItinerary from "./mapItinerary";

function CardMapItinerary(props) {
  const { onClose } = props;

  return (
    <div
      className="card p-1 shadow-lg rounded-3"
      style={{ width: "50%" }}
    >
      <MapItinerary onClose={onClose}/>
    </div>
  );
}

export default CardMapItinerary;
