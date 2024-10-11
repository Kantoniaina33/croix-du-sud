import React from "react";
import {
  Delete02Icon,
  DollarCircleIcon,
  Edit02Icon,
  Location01Icon,
} from "hugeicons-react";
import { useState } from "react";

export default function TrRoleReservation(props) {
  const { roleId, roleName, number, price, programId, totalPersons } = props;
  const [message, setMessage] = useState("");

  return (
    <tr>
      <td>
        <div className="d-flex px-3 py-1">
          <div
            className="d-flex flex-column justify-content-center"
            style={{ marginLeft: "3%" }}
          >
            <h6 className="mb-0 text-sm">{roleName}</h6>
          </div>
        </div>
      </td>
      <td>
        <h6 className="mb-0 text-sm">{number}</h6>
      </td>
      <td>
        <h6 className="mb-0 text-sm">{price} Ar</h6>
      </td>
      <td>
        <h6 className="mb-0 text-sm">{price/totalPersons} Ar</h6>
      </td>
    </tr>
  );
}
