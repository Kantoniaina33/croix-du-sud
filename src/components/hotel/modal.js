import React from "react";
import "./modal.css";

export default function Modal({ isOpen, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      {children}
    </div>
  );
}
