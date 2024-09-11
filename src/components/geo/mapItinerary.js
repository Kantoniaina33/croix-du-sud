import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder";
import "leaflet-routing-machine"; // Importer le module de calcul d'itinéraire
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

function MapItinerary(props) {
  const { onClose, onSetCoordinates, initialCoordinates } = props;

  const [markers, setMarkers] = useState([]);
  const [route, setRoute] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);

  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) return; // Éviter la réinitialisation si la carte a déjà été initialisée

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

    const geocoder = L.Control.geocoder({
      defaultMarkGeocode: false,
      geocoder: new L.Control.Geocoder.Nominatim({
        geocodingQueryParams: {
          countrycodes: "MG",
        },
      }),
    })
      .on("markgeocode", function (e) {
        if (markers.length < 2) {
          const newMarker = L.marker(e.geocode.center, {
            icon: DefaultIcon,
          }).addTo(map);

          newMarker
            .bindPopup(
              `<b>${
                e.geocode.name
              }</b><br>Latitude: ${e.geocode.center.lat.toFixed(
                6
              )}<br>Longitude: ${e.geocode.center.lng.toFixed(6)}`
            )
            .openPopup();

          setMarkers((prevMarkers) => {
            const updatedMarkers = [...prevMarkers, newMarker];
            if (updatedMarkers.length === 2) {
              updateRoute(updatedMarkers.map((marker) => marker.getLatLng()));
            }
            return updatedMarkers;
          });
        }
      })
      .addTo(map);

    map.on("click", function (e) {
      if (markers.length < 2) {
        const newMarker = L.marker(e.latlng, { icon: DefaultIcon }).addTo(map);

        newMarker
          .bindPopup(
            `<b>Emplacement</b><br>Latitude: ${e.latlng.lat.toFixed(
              6
            )}<br>Longitude: ${e.latlng.lng.toFixed(6)}`
          )
          .openPopup();

        setMarkers((prevMarkers) => {
          const updatedMarkers = [...prevMarkers, newMarker];
          if (updatedMarkers.length === 2) {
            updateRoute(updatedMarkers.map((marker) => marker.getLatLng()));
          }
          return updatedMarkers;
        });
      }
    });

    const updateRoute = (latlngs) => {
      if (route) {
        map.removeControl(route);
      }

      const newRoute = L.Routing.control({
        waypoints: latlngs,
        router: L.Routing.mapbox("your_mapbox_access_token"), // Remplacez par votre clé API Mapbox ou un autre service
        createMarker: () => null,
      }).addTo(map);

      newRoute.on("routesfound", (e) => {
        const { routes } = e;
        setDistance(routes[0].summary.totalDistance);
        setDuration(routes[0].summary.totalTime);
      });

      setRoute(newRoute);
    };

    if (initialCoordinates && initialCoordinates.length === 2) {
      initialCoordinates.forEach((coord) => {
        const newMarker = L.marker([coord.lat, coord.lng], {
          icon: DefaultIcon,
        }).addTo(map);

        newMarker
          .bindPopup(
            `<b>${
              coord.name || "Emplacement"
            }: </b><br>Latitude: ${coord.lat.toFixed(
              6
            )}<br>Longitude: ${coord.lng.toFixed(6)}`
          )
          .openPopup();
      });

      updateRoute(
        initialCoordinates.map((coord) => L.latLng(coord.lat, coord.lng))
      );
    }

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [initialCoordinates]); // Dépendances réduites aux coordonnées initiales uniquement

  const handleReset = () => {
    if (markers.length) {
      markers.forEach((marker) => marker.remove());
      setMarkers([]);
      if (route) {
        route.remove();
        setRoute(null);
      }
      setDistance(null);
      setDuration(null);
    }
  };

  const handleSave = () => {
    if (markers.length === 2 && onSetCoordinates) {
      const [marker1, marker2] = markers;
      onSetCoordinates({
        startCoords: {
          lat: marker1.getLatLng().lat,
          lng: marker1.getLatLng().lng,
        },
        endCoords: {
          lat: marker2.getLatLng().lat,
          lng: marker2.getLatLng().lng,
        },
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
      <div id="map" style={{ height: "80%", width: "100%" }} />
      <div
        style={{
          height: "10%",
          width: "100%",
          padding: "10px",
          textAlign: "center",
        }}
      >
        {distance !== null && duration !== null && (
          <div>
            <p>Distance: {(distance / 1000).toFixed(2)} km</p>
            <p>Duration: {(duration / 60).toFixed(2)} min</p>
          </div>
        )}
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <button
          type="button"
          className="btn btn-outline-secondary"
          style={{
            borderRadius: "20px",
            marginTop: "1%",
          }}
          onClick={handleReset}
        >
          Réinitialiser
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
      </div>
    </div>
  );
}

export default MapItinerary;
