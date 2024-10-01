import React, { useEffect, useState } from "react";
import {
  StarIcon,
  Call02Icon,
  Mail01Icon,
} from "hugeicons-react";
import { useParams } from "react-router-dom";

export default function HeadProvider(props) {
  const { providerId } = props;
  const [provider, setProvider] = useState([]);

  const fetchProvider = async () => {
    try {
      const response = await fetch(
        `http://localhost:3030/providers/${providerId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setProvider(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchProvider();
  }, []);
  
  return (
    <div className="card card-body blur shadow-blur mx-4 mt-n6 overflow-hidden">
      <div className="row gx-4">
        <div className="col-auto">
          <div className="avatar avatar-xl position-relative">
            <img
              id="imageProvider"
              src={provider.image}
              alt="profile_image"
              className="w-100 border-radius-lg shadow-sm"
            />
          </div>
        </div>
        <div className="col-auto my-auto">
          <div className="h-100">
            <h5 className="mb-1">{provider.name}</h5>
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
                <span className="ms-1">{provider.phone}</span>
              </li>
              <li className="nav-item">
                <Mail01Icon size={24} color="grey" variant={"stroke"} />
                <span className="ms-1">{provider.email}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
