import React, { useState } from "react";
import { Edit02Icon, Tick02Icon } from "hugeicons-react";
import { useParams } from "react-router-dom";

export default function TrRestaurationReservation(props) {
  const { meal, price, programId, totalPersons } = props;

  const [message, setMessage] = useState("");

  return (
    <tr>
      <td>
        <div className="d-flex px-4">
          <div className="my-auto">
            <h6 className="mb-0 text-sm">{meal}</h6>
          </div>
        </div>
      </td>
      <td>
        <div className="d-flex px-2">
          <div className="my-auto">
            <h6 className="mb-0 text-sm">{price} Ar</h6>
          </div>
        </div>
      </td>
      <td>
        <div className="d-flex px-2">
          <div className="my-auto">
            <h6 className="mb-0 text-sm">{price * totalPersons} Ar</h6>
          </div>
        </div>
      </td>
    </tr>
  );
}
