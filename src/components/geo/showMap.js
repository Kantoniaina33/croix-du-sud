import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder";

// Importer l'icône par défaut du marqueur
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
function ShowMap(props) {
  const { onClose, onSetCoordinates, initialCoordinates } = props;

  // Référence pour stocker le marqueur
  const markerRef = useRef(null);
  // État pour stocker les coordonnées du marqueur
  // const [markerPosition, setMarkerPosition] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(
    initialCoordinates || null
  );
  const [namePosition, setNamePosition] = useState(
    initialCoordinates.name || "Emplacement"
  );

  useEffect(() => {
    // Correction du chemin de l'icône du marqueur
    const DefaultIcon = L.icon({
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
    });

    L.Marker.prototype.options.icon = DefaultIcon;

    // Définir les limites de la carte pour Madagascar
    const madagascarBounds = L.latLngBounds([-25.6, 43.2], [-11.9, 50.5]);

    // Initialiser la carte centrée sur Madagascar avec des limites
    const map = L.map("map", {
      maxBounds: madagascarBounds, // Limite les déplacements de la carte à Madagascar
      maxBoundsViscosity: 1.0, // Évite de dépasser les limites
    }).setView([-18.8792, 47.5079], 6); // Centré sur Antananarivo

    // Ajouter un fond de carte (tiles)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      minZoom: 6,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    
    if (
      initialCoordinates &&
      initialCoordinates.lat != 0 &&
      initialCoordinates.long != 0
    ) {
      markerRef.current = L.marker(initialCoordinates, {
        icon: DefaultIcon,
      }).addTo(map);
      markerRef.current
        .bindPopup(
          `<b>${initialCoordinates.name}: </b><br>Latitude: ${initialCoordinates.lat.toFixed(
            6
          )}<br>Longitude: ${initialCoordinates.lng.toFixed(6)}`
        )
        .openPopup();

      map.setView(initialCoordinates, 14);
    }

    return () => {
      // Nettoyer la carte à la désactivation du composant
      map.remove();
    };
  }, [initialCoordinates]);

  const handleSave = () => {
    if (namePosition && markerPosition && onSetCoordinates) {
      onSetCoordinates({
        name: namePosition,
        lat: markerPosition.lat,
        lng: markerPosition.lng,
      });
    }
    onClose();
  };

  return (
    <div
      style={{
        position: "relative",
        height: "480px",
        width: "100%",
      }}
    >
      <div id="map" style={{ height: "90%", width: "100%" }} />
    </div>
  );
}
export default ShowMap;
