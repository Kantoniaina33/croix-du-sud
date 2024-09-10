import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder";

// Importer l'icône par défaut du marqueur
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
function MyMap(props) {
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

    // Ajouter le contrôle Geocoder (barre de recherche) avec restrictions
    const geocoder = L.Control.geocoder({
      defaultMarkGeocode: false,
      geocoder: new L.Control.Geocoder.Nominatim({
        geocodingQueryParams: {
          countrycodes: "MG", // Limite la recherche aux résultats à Madagascar
        },
      }),
    })
      .on("markgeocode", function (e) {
        // Si un marqueur existe déjà, le supprimer
        // if (markerRef.current) {
        //   map.removeLayer(markerRef.current);
        // }

        // Ajouter un marqueur au résultat de la recherche
        markerRef.current = L.marker(e.geocode.center, {
          icon: DefaultIcon,
        }).addTo(map);
        markerRef.current
          .bindPopup(
            `<b>${
              e.geocode.name
            }</b><br>Latitude: ${e.geocode.center.lat.toFixed(
              6
            )}<br>Longitude: ${e.geocode.center.lng.toFixed(6)}`
          )
          .openPopup();

        // Zoomer sur le résultat de la recherche
        map.setView(e.geocode.center, 14);

        // Mettre à jour l'état avec la position du marqueur
        setMarkerPosition(e.geocode.center);
        setNamePosition(e.geocode.name);
      })
      .addTo(map);

    // Ajouter un événement de clic sur la carte
    map.on("click", function (e) {
      // Si un marqueur existe déjà, le supprimer
      if (markerRef.current) {
        map.removeLayer(markerRef.current);
      }

      // Ajouter un nouveau marqueur à l'emplacement cliqué
      markerRef.current = L.marker(e.latlng, { icon: DefaultIcon }).addTo(map);
      markerRef.current
        .bindPopup(
          `<b>Emplacement</b><br>Latitude: ${e.latlng.lat.toFixed(
            6
          )}<br>Longitude: ${e.latlng.lng.toFixed(6)}`
        )
        .openPopup();

      // Mettre à jour l'état avec la position du marqueur
      setMarkerPosition(e.latlng);
    });

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
        height: "550px",
        width: "100%",
      }}
    >
      <div id="map" style={{ height: "90%", width: "100%" }} />
      <div className="d-flex justify-content-between align-items-center">
        <button
          type="button"
          className="btn btn-outline-secondary"
          style={{
            borderRadius: "20px",
            marginTop: "1%",
          }}
          onClick={onClose}
        >
          Fermer
        </button>
        <button
          onClick={handleSave}
          type="submit"
          className="btn btn-primary"
          style={{
            borderRadius: "20px",
            marginTop: "1%",
          }}
        >
          Enregistrer
        </button>
      </div>
    </div>
  );
}
// Ajouter le marqueur initial si disponible
// if (initialCoordinates) {
//   markerRef.current = L.marker(initialCoordinates, { icon: DefaultIcon }).addTo(map);
//   map.setView(initialCoordinates, 14);
// }
export default MyMap;
