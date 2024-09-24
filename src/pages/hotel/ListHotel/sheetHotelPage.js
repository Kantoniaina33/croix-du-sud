import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Aside from "../../../components/template/aside";
import Return from "../../../components/util/return";
import SheetHotel from "../../../components/hotel/sheetHotel";

export default function SheetHotelPage() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null); // Changement de tableau vide à null
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchHotel = async () => {
    setLoading(true);
    setMessage("");
    try {
      const url = `http://localhost:3030/hotels/${id}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        setMessage("Failed to fetch hotel");
        return;
      }
      const data = await response.json();
      setHotel(data);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching hotel");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotel();
  }, []);

  return (
    <div>
      <Aside />
      <main
        id="listHotel"
        className="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
      >
        <nav
          className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
          id="navbarBlur"
          navbar-scroll="true"
        >
          <div className="container-fluid py-1 px-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                <li className="breadcrumb-item text-sm">
                  <span>Programmes</span>
                </li>
                <li
                  className="breadcrumb-item text-sm text-dark active"
                  aria-current="page"
                >
                  Détails
                </li>
              </ol>
            </nav>
          </div>
        </nav>
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              {loading ? (
                <div
                  className="spinner-border spinner-border-sm"
                  role="status"
                  style={{ marginLeft: "3%" }}
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : hotel ? (
                <SheetHotel
                  key={hotel.id}
                  hotelId={hotel.id}
                  name={hotel.name}
                  address={hotel.address}
                  email={hotel.email}
                  phone={hotel.phone}
                  city={hotel.city}
                  star={hotel.star}
                  logo={hotel.image}
                  setMeals={hotel.setMeals}
                  latitude={hotel.coordinates.latitude}
                  longitude={hotel.coordinates.longitude}
                  location={hotel.coordinates.location}
                />
              ) : (
                <p>Oups</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
