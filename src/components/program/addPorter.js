import React, { useState } from "react";
import "./program.css";

export default function AddPorter(props) {
  const { programId, roleId, selectedPorter, onPorterSelect } = props;

  return (
    <div className="addPorter">
      <h6 className="text-uppercase mb-0 text-sm">Porteurs</h6>
      <input
        type="checkbox"
        name="selectedPorter"
        value={roleId}
        checked={selectedPorter === roleId}
        onChange={() => onPorterSelect(roleId)}
      />
      {/* <div
        className="btn btn-outline-primary btn-sm mb-0 me-3"
        style={{ marginLeft: "3%" }}
      >
        <a onClick={"handleShowForm"}>Valider</a>
      </div> */}
    </div>
  );
}
