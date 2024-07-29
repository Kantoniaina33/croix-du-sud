import React from "react";

export default function MyHeader() {
  const style = {
    backgroundColor: "white",
    padding: "1% 2%",
    boxShadow: "8px 8px 8px rgba(214, 214, 214, 0.5)",
    display: "flex",
    alignItems: "center",
  };
  const logo = {
    display: "flex",
    alignItems: "center",
  };
  return (
    <nav style={style}>
      <div style={logo}>
        <img style={{ width: 40, height: 40 }} src="/logo.png" alt="logo" />
        <span style={{ marginLeft: 10 }}>CROIX DU SUD</span>
      </div>
    </nav>
  );
}
