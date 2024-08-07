import React from "react";
import {
  StarIcon,
  Call02Icon,
  Mail01Icon,
} from "hugeicons-react";

export default function HeadHotel(props) {
  const { logo, name, address, city, phone, email, star } = props;
   const starsArray = Array.from({ length: star }, (v, i) =>
     i < star ? "#ffc400" : "grey"
   );
  return (
    <div className="card card-body blur shadow-blur mx-4 mt-n6 overflow-hidden">
      <div className="row gx-4">
        <div className="col-auto">
          <div className="avatar avatar-xl position-relative">
            <img
              src={logo}
              alt="profile_image"
              className="w-100 border-radius-lg shadow-sm"
            />
          </div>
        </div>
        <div className="col-auto my-auto">
          <div className="h-100">
            <h5 className="mb-1">{name}</h5>
            <p className="mb-0 font-weight-bold text-xs">
              {address} | {city}
            </p>
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
          </div>
        </div>
        <div className="col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3">
          <div className="nav-wrapper position-relative end-0">
            <ul
              className="nav nav-pills nav-fill p-1 bg-transparent"
              role="tablist"
            >
              <li className="nav-item">
                <Call02Icon size={24} color="grey" variant={"stroke"} />
                <span className="ms-1">{phone}</span>
              </li>
              <li className="nav-item">
                <Mail01Icon size={24} color="grey" variant={"stroke"} />
                <span className="ms-1">{email}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
