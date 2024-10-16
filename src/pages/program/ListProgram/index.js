import React, { useState, useEffect } from "react";
import "../../../assets/css/soft-ui-dashboard.min.css";
import "./style.css";
import Aside from "../../../components/template/aside";
import FormProgram from "../../../components/program/formProgram";
import MyPagination from "../../../components/util/myPagination";
import SelectCities from "../../../components/util/selectCities";
import { ArrowUpDownIcon } from "hugeicons-react";
import CardProgram from "../../../components/program/cardProgram";
import Modal from "../../../components/util/modal";
import LogoutButton from "../../../components/util/logoutButton";

export default function ListProgram() {
  const [show, setShow] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [message, setMessage] = useState("");
  const [next, setNext] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("");
  const [sort, setSort] = useState("departure");
  const [order, setOrder] = useState("asc");
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const limit = 4;
  const fetchPrograms = async (
    nextDoc = null,
    sort = "departure",
    order = "asc",
    search = "",
    searchField = ""
  ) => {
    setLoading(true);
    setMessage("");
    try {
      const url = `http://localhost:3030/programs?limit=${limit}&&next=${
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
        setMessage("Failed to fetch programs");
        return;
      }
      const data = await response.json();
      setPrograms(data.programs);
      setNext(data.next);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching programs");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowMap = () => setIsMapModalOpen(true);

  const handleSort = (value) => {
    setCurrentPage(1);
    setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    setSort(value);
  };

  const handleSelectCity = (e) => {
    setSearchField("city");
    setSearch(e.target.value);
  };

  useEffect(() => {
    fetchPrograms(null, sort, order, search, searchField);
  }, [sort, order, search, searchField]);

  const handlePageChange = (nextDoc) => {
    fetchPrograms(nextDoc, sort, order, search, searchField);
    setCurrentPage((prevPage) => (nextDoc ? prevPage + 1 : 1));
  };

  const handleCloseModal = () => setIsMapModalOpen(false);

  return (
    <div>
      <Aside />
      <main
        id="listProgram"
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
                  <span>Programmes</span>
                </li>
                <li
                  className="breadcrumb-item text-sm text-dark active"
                  aria-current="page"
                >
                  Liste
                </li>
              </ol>
              {/* <h6 className="font-weight-bolder mb-0">Tables</h6> */}
            </nav>
            <div
              className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
              id="navbar"
            >
              <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                {/* <MySearchBar
                  placeholder="Rechercher une excursion..."
                  search={search}
                  setSearch={setSearch}
                  handleClearSearch={handleClearSearch}
                  handleSearch={handleSearchExcursion}
                /> */}
              </div>
              <ul className="navbar-nav justify-content-end">
                <li className="nav-item d-flex align-items-center">
                  <a
                    className="btn btn-outline-primary btn-sm mb-0 me-3"
                    target="blank"
                    onClick={handleShowMap}
                  >
                    Nouveau programme
                  </a>
                  <Modal isOpen={isMapModalOpen}>
                    <FormProgram
                      isOpen={isMapModalOpen}
                      method="POST"
                      title="NOUVEAU PROGRAMME"
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
        <div
          className="card-body px-0 pt-0 pb-2"
          style={{
            backgroundColor: "white",
            width: "96%",
            margin: "2% 0 0 2%",
            borderRadius: "10px",
          }}
        >
          <div className="row" style={{ padding: "2% 3%" }}>
            <h6>Liste des programmes</h6>
            <br />
            <br />
            <div className="col-12">
              {loading ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : programs.length > 0 ? (
                <>
                  {programs.map((program) => (
                    <div key={program.id}>
                      <CardProgram
                        programId={program.id}
                        departure={program.departure}
                        arrival={program.arrival}
                        distance={program.distance}
                        duration={program.duration}
                        description={program.description}
                        departureLatitude={
                          program.departureCoordinates.latitude
                        }
                        departureLongitude={
                          program.departureCoordinates.longitude
                        }
                        arrivalLatitude={program.arrivalCoordinates.latitude}
                        arrivalLongitude={program.arrivalCoordinates.longitude}
                        price={program.price}
                      />
                      <br />
                    </div>
                  ))}
                  <div style={{ margin: "2% 0 0 40%" }}>
                    {(next != null || currentPage !== 1) && (
                      <MyPagination
                        onPageChange={handlePageChange}
                        lastVisible={next}
                        currentPage={currentPage}
                      />
                    )}
                  </div>
                </>
              ) : (
                <p style={{ fontSize: "15px" }}>Aucun programme</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
