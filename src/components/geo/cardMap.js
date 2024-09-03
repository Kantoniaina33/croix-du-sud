// Home.js
import { useState } from "react";
import FormHotel2 from "../../components/hotel/formHotel2";
import Modal from "../../components/hotel/modal";
import MyMap from "../../components/geo/myMap";

function CardMap(props) {
  const { onClose } = props;

  return (
    <div
      className="card p-1 shadow-lg rounded-3"
      style={{ width: "50%" }}
    >
      <MyMap onClose={onClose}/>
    </div>
  );
}

export default CardMap;
