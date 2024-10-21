import React, { useState, useEffect } from "react";
import TrHotel from "../../../components/hotel/trHotel";
import "../../../assets/css/soft-ui-dashboard.min.css";
import "./style.css";
import Aside from "../../../components/template/aside";
import MyPagination from "../../../components/util/myPagination";
import SelectCities from "../../../components/util/selectCities";
import { ArrowUpDownIcon } from "hugeicons-react";
import Modal from "../../../components/util/modal";
import LogoutButton from "../../../components/util/logoutButton";
import MySearchBar from "../../../components/util/mySearchBar";
import FormHotel from "../../../components/hotel/formHotel";

export default function ListHotel() {
  const [show, setShow] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [message, setMessage] = useState("");
  const [next, setNext] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("");
  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState("asc");
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const limit = 4;
  const fetchHotels = async (
    nextDoc = null,
    sort = "name",
    order = "asc",
    search = "",
    searchField = ""
  ) => {
    setLoading(true);
    setMessage("");
    try {
      const url = `http://localhost:3030/hotels?limit=${limit}&&next=${
        nextDoc || ""
      }&&orderBy=${sort}&&order=${order}&&searchField=${searchField}&&search=${search}`;
      console.log(url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        setMessage("Failed to fetch hotels");
        return;
      }
      const data = await response.json();
      setHotels(data.hotels);
      setNext(data.next);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching hotels");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowMap = () => setIsMapModalOpen(true);
  const handleCloseModal = () => setIsMapModalOpen(false);

  const handleSort = (value) => {
    setCurrentPage(1);
    setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    setSort(value);
  };

  const handleSelectCity = (e) => {
    setSearchField("city");
    setSearch(e.target.value);
  };

  const handleSearchHotel = (e) => {
    setSearchField("name");
    setSearch(e.target.value);
  };

  const handleClearSearch = (e) => {
    setSearchField("");
    setSearch("");
  };

  useEffect(() => {
    fetchHotels(null, sort, order, search, searchField);
  }, [sort, order, search, searchField]);

  const handlePageChange = (nextDoc) => {
    fetchHotels(nextDoc, sort, order, search, searchField);
    setCurrentPage((prevPage) => (nextDoc ? prevPage + 1 : 1));
  };

  return (
    <div>
      <Aside />
      <main
        id="listHotel"
        className="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
      >
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
          rel="stylesheet"
        />
        <nav
          className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
          id="navbarBlur"
          navbar-scroll="true"
        >
          <div className="container-fluid py-1 px-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                <li className="breadcrumb-item text-sm">
                  <span>Hôtels</span>
                </li>
                <li
                  className="breadcrumb-item text-sm text-dark active"
                  aria-current="page"
                >
                  Liste
                </li>
              </ol>
              {/* <h6 className="font-weight-bolder mb-0">Tabl  es</h6> */}
            </nav>
            <div
              className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
              id="navbar"
            >
              <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                <div className="input-group">
                  <MySearchBar
                    placeholder="Rechercher un hotel..."
                    search={search}
                    setSearch={setSearch}
                    handleClearSearch={handleClearSearch}
                    handleSearch={handleSearchHotel}
                  />
                </div>
              </div>
              <ul className="navbar-nav justify-content-end">
                <li className="nav-item d-flex align-items-center">
                  <a
                    className="btn btn-outline-primary btn-sm mb-0 me-3"
                    target="blank"
                    onClick={handleShowMap}
                  >
                    Nouvel hotel
                  </a>
                  <Modal isOpen={isMapModalOpen}>
                    <FormHotel
                      method="POST"
                      title="NOUVEL HOTEL"
                      isOpen={isMapModalOpen}
                      onCancel={handleCloseModal}
                    />
                  </Modal>
                </li>
                <li className="nav-item d-flex align-items-center">
                  <LogoutButton />
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4" style={{ position: "inherit" }}>
                <div className="card-header pb-0 d-flex justify-content-between align-items-center">
                  <h6>Liste des hôtels</h6>
                  <div className="col-md-2">
                    <SelectCities
                      disabledOption="Filtrer par ville"
                      onChange={handleSelectCity}
                      specificOption="Tout"
                      specificOptionValue=""
                    />
                  </div>
                </div>

                <div className="card-body px-0 pt-0 pb-2">
                  {loading ? (
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                      style={{ marginLeft: "3%" }}
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : hotels.length > 0 ? (
                    <div className="table-responsive p-0">
                      <table className="table align-items-center mb-0">
                        <thead>
                          <tr>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Hotel
                            </th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                              Contacts
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Etoiles
                              <a href="#">
                                <ArrowUpDownIcon
                                  id="sortIcon"
                                  size={18}
                                  onClick={() => handleSort("star")}
                                  style={{
                                    marginLeft: "5px",
                                    marginTop: "-5px",
                                  }}
                                />
                              </a>
                            </th>
                            <th className="text-secondary opacity-7"></th>
                            <th className="text-secondary opacity-7"></th>
                            <th className="text-secondary opacity-7"></th>
                            <th className="text-secondary opacity-7"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {hotels.map((hotel) => (
                            <>
                              <TrHotel
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
                            </>
                          ))}
                        </tbody>
                      </table>
                      <div style={{ margin: "2% 0 0 40%" }}>
                        {(next != null || currentPage != 1) && (
                          <MyPagination
                            onPageChange={handlePageChange}
                            lastVisible={next}
                            currentPage={currentPage}
                          />
                        )}
                      </div>
                    </div>
                  ) : (
                    <p style={{ marginLeft: "2.5%", fontSize: "15px" }}>
                      Aucun hôtel
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
