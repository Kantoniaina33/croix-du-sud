import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Aside from "../../../components/template/aside";
import Return from "../../../components/util/return";
import SheetProvider from "../../../components/provider/sheetProvider";

export default function SheetProviderPage() {
  const { id } = useParams();
  const [provider, setProvider] = useState(null); 
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProvider = async () => {
    setLoading(true);
    setMessage("");
    try {
      const url = `http://localhost:3030/providers/${id}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        setMessage("Failed to fetch provider");
        return;
      }
      const data = await response.json();
      setProvider(data);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching provider");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProvider();
  }, []);

  return (
    <div>
      <Aside />
      <main
        id="listProvider"
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
                  <span>Prestataires</span>
                </li>
                <li
                  className="breadcrumb-item text-sm text-dark active"
                  aria-current="page"
                >
                  Fiche
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
              ) : provider ? (
                <p></p>
                // <SheetProvider
                //   key={provider.id}
                //   providerId={provider.id}
                //   name={provider.name}
                //   address={provider.address}
                //   email={provider.email}
                //   phone={provider.phone}
                //   city={provider.city}
                //   logo={provider.image}
                //   setMeals={provider.setMeals}
                //   latitude={provider.coordinates.latitude}
                //   longitude={provider.coordinates.longitude}
                //   location={provider.coordinates.location}
                // />
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
