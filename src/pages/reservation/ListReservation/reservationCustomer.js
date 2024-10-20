import React, { useState, useEffect } from "react";
import TrReservation from "../../../components/reservation/trReservation";
import "../../../assets/css/soft-ui-dashboard.min.css";
import Aside from "../../../components/template/aside";
import MyPagination from "../../../components/util/myPagination";
import LogoutButton from "../../../components/util/logoutButton";
import MySearchBar from "../../../components/util/mySearchBar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Return from "../../../components/util/return";
import Header from "../../../components/template/header";

export default function ReservationCustomer() {
  const location = useLocation();
  const customerInfo = location.state;
  const { id } = useParams(); // customerId
  const [show, setShow] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [message, setMessage] = useState("");
  const [next, setNext] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("");
  const [sort, setSort] = useState("reservationDate");
  const [order, setOrder] = useState("desc");
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isNextModalOpen, setIsNextModalOpen] = useState(false);
  const [reservation, setReservation] = useState(null);
  const navigate = useNavigate();


  const limit = 8;
  const fetchReservations = async (
    nextDoc = null,
    sort = "reservationDate",
    order = "desc",
    search = "",
    searchField = ""
  ) => {
    setLoading(true);
    setMessage("");
    try {
      const url = `http://localhost:3030/customers/${id}/reservations?limit=${limit}&&next=${
        nextDoc || ""
      }&&orderBy=${sort}&&order=${order}&&searchField=${searchField}&&search=${search}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        setMessage("Failed to fetch reservations");
        return;
      }
      const data = await response.json();
      setReservations(data.reservations);
      setNext(data.next);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching reservations");
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (value) => {
    setCurrentPage(1);
    setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    setSort(value);
  };

  useEffect(() => {
    fetchReservations(null, sort, order, search, searchField);
  }, [sort, order, search, searchField]);

  const handlePageChange = (nextDoc) => {
    fetchReservations(nextDoc, sort, order, search, searchField);
    setCurrentPage((prevPage) => (nextDoc ? prevPage + 1 : 1));
  };

  const handleSearchReservation = (e) => {
    setSearchField("name");
    setSearch(e.target.value);
  };

  const handleClearSearch = (e) => {
    setSearchField("");
    setSearch("");
  };

  const handleNewReservation = (e) => {
    navigate(`/customers/${id}/reservation/circuit`);
  };

  return (
    <div>
      <Aside />
      <main
        id="listReservation"
        className="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
      >
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
          rel="stylesheet"
        />
        <Header
          pages="Clients"
          slash="Reservations"
          buttonText="Nouvelle reservation"
          handleOnClick={handleNewReservation}
        />
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <Return href={`/customers`} />
                <div className="card-header pb-0">
                  <h6>
                    Client: {customerInfo.firstName} {customerInfo.name}
                  </h6>
                  <h6>Liste des reservations</h6>
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
                  ) : reservations.length > 0 ? (
                    <div className="table-responsive p-0">
                      <table className="table align-items-center mb-0">
                        <thead>
                          <tr>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              REF
                            </th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                              Date de reservation
                            </th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                              Circuit
                            </th>
                            <th className="text-secondary opacity-7"></th>{" "}
                          </tr>
                        </thead>
                        <tbody>
                          {reservations.map((reservation) => (
                            <>
                              <TrReservation
                                key={reservation.id}
                                reservationRef={reservation.id}
                                reservationId={reservation.id}
                                reservationDate={reservation.reservationDate}
                                circuit={reservation.circuit.name}
                                circuitId={reservation.circuit.id}
                                customerId={id}
                                customerInfo={customerInfo}
                                totalPersons={
                                  reservation.total_travel_participants
                                }
                              />
                            </>
                          ))}
                        </tbody>
                      </table>
                      <div style={{ margin: "2% 0 0 2%" }}>
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
                    <p style={{ fontSize: "15px", marginLeft: "2.5%" }}>
                      Aucune reservation
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
