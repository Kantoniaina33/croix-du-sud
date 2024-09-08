import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// Importer l'icône par défaut du marqueur
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

function MapItinerary(props) {
  const { onClose, onRouteCalculated } = props;
  const markerRef = useRef([]);
  const polygonRef = useRef(null);
  const [markerPositions, setMarkerPositions] = useState([]);
  const [routeDetails, setRouteDetails] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);
  const routingControlRef = useRef(null);

  useEffect(() => {
    const DefaultIcon = L.icon({
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
    });

    L.Marker.prototype.options.icon = DefaultIcon;

    const madagascarBounds = L.latLngBounds([-25.6, 43.2], [-11.9, 50.5]);

    const map = L.map("map", {
      maxBounds: madagascarBounds,
      maxBoundsViscosity: 1.0,
    }).setView([-18.8792, 47.5079], 6);

    setMapInstance(map);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      minZoom: 6,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const geocoder = L.Control.Geocoder.nominatim();
    const searchControl = L.Control.geocoder({
      geocoder: geocoder,
      defaultMarkGeocode: false,
    })
      .on("markgeocode", function (e) {
        const latlng = e.geocode.center;

        if (polygonRef.current) {
          map.removeLayer(polygonRef.current);
          polygonRef.current = null;
        }

        const polygon = L.polygon([
          [latlng.lat + 0.01, latlng.lng + 0.01],
          [latlng.lat + 0.01, latlng.lng - 0.01],
          [latlng.lat - 0.01, latlng.lng - 0.01],
          [latlng.lat - 0.01, latlng.lng + 0.01],
        ]).addTo(map);

        polygonRef.current = polygon;

        map.setView(latlng, 13);
      })
      .addTo(map);

    map.on("click", function (e) {
      if (markerRef.current.length >= 2) {
        return;
      }

      const newMarker = L.marker(e.latlng, { icon: DefaultIcon }).addTo(map);
      markerRef.current.push(newMarker);
      setMarkerPositions((prevPositions) => [...prevPositions, e.latlng]);

      if (markerRef.current.length === 2) {
        calculateRoute(
          markerRef.current[0].getLatLng(),
          markerRef.current[1].getLatLng()
        );
      }
    });

    const calculateRoute = (start, end) => {
      const routingControl = L.Routing.control({
        waypoints: [start, end],
        createMarker: () => null,
        routeWhileDragging: false,
        show: false,
        addWaypoints: false,
        router: L.Routing.osrmv1({
          serviceUrl: `https://router.project-osrm.org/route/v1`,
        }),
      }).addTo(map);

      routingControlRef.current = routingControl;

      routingControl.on("routesfound", function (e) {
        const route = e.routes[0];
        const distance = route.summary.totalDistance / 1000; // en kilomètres
        const duration = route.summary.totalTime / 60; // en minutes

        setRouteDetails({
          distance,
          duration,
          startCoords: start,
          endCoords: end,
        });
      });
    };

    return () => {
      map.remove();
    };
  }, []);

  const handleReset = () => {
    if (mapInstance) {
      markerRef.current.forEach((marker) => mapInstance.removeLayer(marker));
      markerRef.current = [];
      setMarkerPositions([]);

      if (polygonRef.current) {
        mapInstance.removeLayer(polygonRef.current);
        polygonRef.current = null;
      }

      if (routingControlRef.current) {
        mapInstance.removeControl(routingControlRef.current);
        routingControlRef.current = null;
      }

      setRouteDetails(null);
    }
  };

  const handleSave = () => {
    if (routeDetails && onRouteCalculated) {
      onRouteCalculated(routeDetails);
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
          Annuler
        </button>

        <button
          type="button"
          className="btn btn-outline-danger"
          style={{
            borderRadius: "20px",
            marginTop: "1%",
          }}
          onClick={handleReset}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-counterclockwise"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z"
            />
            <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466" />
          </svg>
        </button>

        <button
          type="submit"
          className="btn btn-primary"
          style={{
            borderRadius: "20px",
            marginTop: "1%",
          }}
          onClick={handleSave} // Envoi des détails de la route après avoir cliqué sur "Enregistrer"
        >
          Enregistrer
        </button>
      </div>
    </div>
  );
}

export default MapItinerary;
