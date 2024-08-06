import React from "react";
import { Coffee02Icon, Delete02Icon, Edit02Icon, NoodlesIcon, SpoonAndKnifeIcon } from "hugeicons-react";

export default function TrMeal(props) {
  const { breakfast_price, lunch_price, dinner_price } = props;
  return (
    <tbody>
      <tr>
        <td>
          <div className="d-flex px-2">
            <Coffee02Icon size={24} color={"#000000"} variant={"stroke"} />
          </div>
        </td>
        <td>
          <div className="d-flex px-2">
            <div className="my-auto">
              <h6 className="mb-0 text-sm">Petit déjeuner</h6>
            </div>
          </div>
        </td>
        <td>
          <div className="d-flex px-2">
            <div className="my-auto">
              <h6 className="mb-0 text-sm">{breakfast_price}</h6>
            </div>
          </div>
        </td>
        <td class="align-middle text-center">
          <span class="text-secondary text-xs font-weight-bold">
            <a href="#">
              <Edit02Icon color="blue" size={20} />
            </a>
          </span>
        </td>
      </tr>
      <tr>
        <td>
          <div className="d-flex px-2">
            <SpoonAndKnifeIcon size={24} color={"#000000"} variant={"stroke"} />
          </div>
        </td>
        <td>
          <div className="d-flex px-2">
            <div className="my-auto">
              <h6 className="mb-0 text-sm">Déjeuner</h6>
            </div>
          </div>
        </td>
        <td>
          <div className="d-flex px-2">
            <div className="my-auto">
              <h6 className="mb-0 text-sm">{lunch_price}</h6>
            </div>
          </div>
        </td>
        <td class="align-middle text-center">
          <span class="text-secondary text-xs font-weight-bold">
            <a href="#">
              <Edit02Icon color="blue" size={20} />
            </a>
          </span>
        </td>
      </tr>
      <tr>
        <td>
          <div className="d-flex px-2">
            <NoodlesIcon size={24} color={"#000000"} variant={"stroke"} />
          </div>
        </td>
        <td>
          <div className="d-flex px-2">
            <div className="my-auto">
              <h6 className="mb-0 text-sm">Dîner</h6>
            </div>
          </div>
        </td>
        <td>
          <div className="d-flex px-2">
            <div className="my-auto">
              <h6 className="mb-0 text-sm">{dinner_price}</h6>
            </div>
          </div>
        </td>
        <td class="align-middle text-center">
          <span class="text-secondary text-xs font-weight-bold">
            <a href="#">
              <Edit02Icon color="blue" size={20} />
            </a>
          </span>
        </td>
      </tr>
    </tbody>
  );
}
