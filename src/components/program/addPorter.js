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
      <button id="buttonValidate">Valider</button>
    </div>
  );
}
