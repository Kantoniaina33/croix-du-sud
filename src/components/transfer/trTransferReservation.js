import React from "react";
import {
  Delete02Icon,
  DollarCircleIcon,
  Edit02Icon,
  Location01Icon,
} from "hugeicons-react";
import { useState } from "react";

export default function TrTransferReservation(props) {
  const { transferId, departure, arrival, price, totalPersons } = props;
  const [message, setMessage] = useState("");

  const handleDelete = async (e) => {
    e.preventDefault();
    setMessage("");

    // try {
    //   const response = await fetch(
    //     `http://localhost:3030/reservations/${"reservationId"}/program_plannings/${"planningId"}/transfers/${transferId}`,
    //     {
    //       method: "DELETE",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );

    //   if (!response.ok) {
    //     if (response.status === 401) {
    //       setMessage("Problem");
    //     } else {
    //       setMessage("Failed");
    //     }
    //     return;
    //   }

    //   window.location.reload();
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  };

  return (
    <tr>
      <td>
        <div className="d-flex py-1">
          <div
            className="d-flex flex-column justify-content-center"
            style={{ marginLeft: "5%" }}
          >
            <h6 className="text-uppercase mb-0 text-sm">
              {departure} - {arrival}
            </h6>
          </div>
        </div>
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
