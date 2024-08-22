import React, { useState, useEffect } from "react";
import TrHotel from "../../../components/hotel/trHotel";
import "../../../assets/css/soft-ui-dashboard.min.css";
import "./style.css";
import Aside from "../../../components/template/aside";
import FormHotel from "../../../components/hotel/formHotel";
import { Modal } from "react-bootstrap";
import MyPagination from "../../../components/util/myPagination";

export default function ListHotel() {
  const [show, setShow] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [message, setMessage] = useState("");
  const [next, setNext] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("name");

  const fetchHotels = async (nextDoc = null, sort = "name") => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(
        //
        `http://localhost:3030/hotels?next=${nextDoc || ""}&&orderBy=${sort}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

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

  useEffect(() => {
    fetchHotels(null, sort);
  }, [sort]);

  const handlePageChange = (nextDoc) => {
    fetchHotels(nextDoc, sort);
    setCurrentPage((prevPage) => (nextDoc ? prevPage + 1 : 1));
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSort = (value) => {
    setSort(value);
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
                  <span>Hotels</span>
                </li>
                <li
                  className="breadcrumb-item text-sm text-dark active"
                  aria-current="page"
                >
                  Liste
                </li>
              </ol>
              <h6 className="font-weight-bolder mb-0">Tables</h6>
            </nav>
            <div
              className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
              id="navbar"
            >
              <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                <div className="input-group">
                  <span className="input-group-text text-body">
                    <i className="fas fa-search" aria-hidden="true"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Rechercher un hotel..."
                  />
                </div>
              </div>
              <ul className="navbar-nav justify-content-end">
                <li className="nav-item d-flex align-items-center">
                  <a
                    className="btn btn-outline-primary btn-sm mb-0 me-3"
                    target="blank"
                    onClick={handleShow}
                  >
                    Ajouter un nouvel hotel
                  </a>
                  <Modal show={show} onHide={handleClose}>
                    <FormHotel method="POST" title="AJOUTER UN NOUVEL HOTEL" />
                  </Modal>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-0 d-flex justify-content-between align-items-center">
                  <h6>Liste d'hôtels</h6>
                  <div className="col-md-2">
                    <select
                    style={{color:"grey"}}
                      className="form-select"
                      // value={formValues.room_type}
                      // onChange={handleChange}
                      name="room_type"
                    >
                      <option value="" disabled selected>Filtrer par ville</option>
                      <option value="Twin">Twin</option>
                    </select>
                  </div>
                </div>

                <div className="card-body px-0 pt-0 pb-2">
                  {loading ? (
                    <p>Loading...</p>
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
                            <th
                              className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                              onClick={() => handleSort("star")}
                            >
                              Etoiles
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
                              {/* <p>{hotel.id}</p> */}
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
                              />
                            </>
                          ))}
                        </tbody>
                      </table>
                      <div style={{ margin: "2% 0 0 2%" }}>
                        <MyPagination
                          onPageChange={handlePageChange}
                          lastVisible={next}
                          currentPage={currentPage}
                        />
                      </div>
                    </div>
                  ) : (
                    <p style={{ marginLeft: "2.5%" }}>Aucun hotel</p>
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
