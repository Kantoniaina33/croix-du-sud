import React from "react";
import {
  Delete02Icon,
  Edit02Icon,
  StarIcon,
  LinkSquare02Icon,
} from "hugeicons-react";

export default function TrHotel(props) {
  const { logo, name, address, city, phone, email, star } = props;
  const starsArray = Array.from({ length: 5 }, (v, i) =>
    i < star ? "#ffc400" : "grey"
  );
  return (
    <tr>
      <td>
        <div class="d-flex px-2 py-1">
          <div>
            <img
              src={logo}
              alt="logo"
              style={{ width: "60px", height: "60px" }}
            />
          </div>
          <div
            class="d-flex flex-column justify-content-center"
            style={{ marginLeft: "3%" }}
          >
            <h6 class="mb-0 text-sm">{name}</h6>
            <p class="text-xs text-secondary mb-0">{address}</p>
            <p class="text-xs text-secondary mb-0">{city}</p>
          </div>
        </div>
      </td>
      <td>
        <p class="text-sm font-weight-bold mb-0">{phone}</p>
        <p class="text-sm text-secondary mb-0">{email}</p>
      </td>
      <td class="align-middle text-center text-sm">
        <span>
          {starsArray.map((color, index) => (
            <StarIcon
              key={index}
              color={color}
              size={17}
              style={{ margin: "1%" }}
            />
          ))}
        </span>
      </td>
      <td class="align-middle text-center">
        <span class="text-xs">
          <a href="/rooms">
            <span style={{ textDecoration: "underline" }}>Chambres</span>
            <LinkSquare02Icon size={15} style={{ marginLeft: "2%" }} />
          </a>
        </span>
      </td>
      <td class="align-middle text-center">
        <span class="text-xs">
          <a href="/meals">
            <span style={{ textDecoration: "underline" }}>Repas</span>
            <LinkSquare02Icon size={15} style={{ marginLeft: "3%" }} />
          </a>
        </span>
      </td>
      <td class="align-middle text-center">
        <span class="text-secondary text-xs font-weight-bold">
          <a href="#">
            <Edit02Icon color="blue" size={20} />
          </a>
        </span>
      </td>
      <td class="align-middle text-center">
        <span class="text-secondary text-xs font-weight-bold">
          <a href="#">
            <Delete02Icon color="red" size={23} />
          </a>
        </span>
      </td>
    </tr>
  );
}
