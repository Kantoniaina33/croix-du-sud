import "../../../assets/css/soft-ui-dashboard.min.css";
import Aside from "../../../components/template/aside";
import { useState, useEffect } from "react";
import FormExcursion from "../../../components/excursion/formExcursion";
import MyPagination from "../../../components/util/myPagination";
import SelectCities from "../../../components/util/selectCities";
import CardExcursion from "../../../components/excursion/cardExcursion";
import { SpartanHelmetIcon } from "hugeicons-react";
import Modal from "../../../components/util/modal";
import LogoutButton from "../../../components/util/logoutButton";
import MySearchBar from "../../../components/util/mySearchBar";
import Header from "../../../components/template/header";

export default function ListExcursion() {
  const [show, setShow] = useState(false);
  const [excursions, setExcursions] = useState([]);
  const [message, setMessage] = useState("");
  const [next, setNext] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("");
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const limit = 4;
  const fetchExcursions = async (
    nextDoc = null,
    search = "",
    searchField = ""
  ) => {
    setLoading(true);
    setMessage("");
    try {
      const url = `http://localhost:3030/excursions?limit=${limit}&&next=${
        nextDoc || ""
      }&&searchField=${searchField}&&search=${search}`;

      console.log(url);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        setMessage("Failed to fetch excursions");
        return;
      }
      const data = await response.json();
      setExcursions(data.excursions);
      setNext(data.next);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching excursions");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowMap = () => setIsMapModalOpen(true);
  const handleCloseModal = () => setIsMapModalOpen(false);

  const handleSelectCity = (e) => {
    setSearchField("city");
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchExcursions(null, search, searchField);
  }, [search, searchField]);

  const handlePageChange = (nextDoc) => {
    fetchExcursions(nextDoc, search, searchField);
    setCurrentPage((prevPage) => (nextDoc ? prevPage + 1 : 1));
  };

  const handleSearchExcursion = (e) => {
    setSearchField("place_name");
    setSearch(e.target.value);
  };

  const handleClearSearch = (e) => {
    setSearchField("");
    setSearch("");
  };

  return (
    <div>
      <Aside></Aside>
      <main
        id="listHotel"
        className="main-content position-relative max-height-vh-100 h-100 border-radius-lg "
      >
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
          rel="stylesheet"
        />
        <Header
          pages="Excursions"
          slash="Liste"
          searchPlaceholder="Rechercher un excursion ..."
          search={search}
          setSearch={setSearch}
          handleClearSearch={handleClearSearch}
          handleSearch={handleSearchExcursion}
          buttonText="Nouvelle excursion"
          handleOnClick={handleShowMap}
        />
        <Modal isOpen={isMapModalOpen}>
          <FormExcursion
            method="POST"
            isOpen={isMapModalOpen}
            title="AJOUTER UNE EXCURSION"
            onCancel={handleCloseModal}
          />
        </Modal>

        <div
          className="card-body px-0 pt-0 pb-2"
          style={{
            backgroundColor: "white",
            width: "96%",
            margin: "2% 0 0 2%",
            borderRadius: "10px",
          }}
        >
          <div className="card-header pb-0 d-flex justify-content-between align-items-center p-4">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flex: 1,
                color: "#273385",
              }}
            >
              <h6 style={{ marginLeft: "1%" }}>Liste des excursions</h6>
            </div>
            <div className="col-md-2">
              <SelectCities
                disabledOption="Filtrer par ville"
                onChange={handleSelectCity}
                specificOption="Tout"
                specificOptionValue=""
              />
            </div>
          </div>
          <br />
          {loading ? (
            <div
              className="spinner-border spinner-border-sm"
              role="status"
              style={{ marginLeft: "3%" }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <div className="row gx-4" style={{ padding: "2% 0 0 3%" }}>
              {excursions.length > 0 ? (
                excursions.map((excursion) => (
                  <div className="custom-col mb-4" key={excursion.id}>
                    <CardExcursion
                      excursionId={excursion.id}
                      image={excursion.image}
                      place_name={excursion.place_name}
                      city={excursion.city}
                      price={excursion.price}
                      description={excursion.description}
                      location={excursion.coordinates.location}
                      latitude={excursion.coordinates.latitude}
                      longitude={excursion.coordinates.longitude}
                    />
                  </div>
                ))
              ) : (
                <p style={{ fontSize: "15px" }}>Aucune excursion</p>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
