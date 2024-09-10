import React, { useState } from "react";
import "./util.css";
import { useNavigate } from "react-router-dom";

export default function LogoutButton(props) {
    const navigate = useNavigate();

    const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <a
      className="btn btn-outline-primary btn-sm mb-0 me-3"
      target="blank"
      onClick={handleLogout}
      style={{ backgroundColor: "white", borderColor: "grey", color: "grey" }}
    >
      <span>Se deconnecter</span>
    </a>
  );
}
