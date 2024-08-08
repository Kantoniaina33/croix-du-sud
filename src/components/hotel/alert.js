import React from 'react';

export default function ConfirmDeleteButton() {
  const handleDeleteClick = () => {
    const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cet élément ?");
    if (confirmed) {
      console.log("Élément supprimé !");
    } else {
      console.log("Suppression annulée.");
    }
  };

  return (
    <button onClick={handleDeleteClick} className="btn btn-danger">
      Supprimer
    </button>
  );
}
