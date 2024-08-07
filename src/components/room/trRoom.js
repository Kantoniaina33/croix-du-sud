import React from "react";
import {
  Delete02Icon,
  Edit02Icon
} from "hugeicons-react";

export default function TrRoom(props) {
  const { type, capacity, price_category, price, total } = props;
  return (
    <tr>
      <td>
        <div className="d-flex px-2">
          <div className="my-auto">
            <h6 className="mb-0 text-sm">{type}</h6>
          </div>
        </div>
      </td>
      <td className="align-middle text-center">
        <span className="text-sm font-weight-bold mb-0">{capacity} </span>
      </td>
      <td className="align-middle text-center">
        <p className="text-sm font-weight-bold mb-0">{price_category}</p>
      </td>
      <td className="align-middle text-center">
        <p className="text-sm font-weight-bold mb-0">{price}</p>
      </td>
      <td className="align-middle text-center">
        <p className="text-sm font-weight-bold mb-0">{total}</p>
      </td>
      <td className="align-middle text-center">
        <span className="text-secondary text-xs font-weight-bold">
          <a href="#">
            <Edit02Icon color="blue" size={20} />
          </a>
        </span>
      </td>
      <td className="align-middle text-center">
        <span className="text-secondary text-xs font-weight-bold">
          <a href="#">
            <Delete02Icon color="red" size={23} />
          </a>
        </span>
      </td>
    </tr>
  );
}
