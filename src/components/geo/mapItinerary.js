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
      const { onClose } = props;
      const markerRef = useRef([]);
      const [markerPositions, setMarkerPositions] = useState([]);
      const [routeDetails, setRouteDetails] = useState(null);

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

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          minZoom: 6,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        map.on("click", function (e) {
          if (markerRef.current.length >= 2) {
            // Si 2 marqueurs existent déjà, les supprimer
            markerRef.current.forEach((marker) => map.removeLayer(marker));
            markerRef.current = [];
            setMarkerPositions([]);
            setRouteDetails(null);
          }

          // Ajouter un nouveau marqueur à l'emplacement cliqué
          const newMarker = L.marker(e.latlng, { icon: DefaultIcon }).addTo(
            map
          );
          markerRef.current.push(newMarker);
          setMarkerPositions((prevPositions) => [...prevPositions, e.latlng]);

          // Si deux positions sont sélectionnées, calculer la route
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
            createMarker: () => null, // Ne pas ajouter de marqueurs supplémentaires
            routeWhileDragging: false,
            show: false,
            addWaypoints: false,
            router: L.Routing.osrmv1({
              serviceUrl: `https://router.project-osrm.org/route/v1`,
            }),
          }).addTo(map);

          routingControl.on("routesfound", function (e) {
            const route = e.routes[0];
            const distance = route.summary.totalDistance / 1000; // en kilomètres
            const duration = route.summary.totalTime / 60; // en minutes
            setRouteDetails({ distance, duration });
          });
        };

        return () => {
          map.remove();
        };
      }, []);

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
            {routeDetails && (
              <div style={{ marginTop: "1%" }}>
                <p>
                  <b>Distance:</b> {routeDetails.distance.toFixed(2)} km
                </p>
                <p>
                  <b>Durée:</b> {routeDetails.duration.toFixed(2)} minutes
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    export default MapItinerary;
