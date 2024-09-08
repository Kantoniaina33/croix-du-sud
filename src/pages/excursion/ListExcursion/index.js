import "../../../assets/css/soft-ui-dashboard.min.css";
import Aside from "../../../components/template/aside";
import { useState, useEffect } from "react";
import FormExcursion from "../../../components/excursion/formExcursion";
import MyPagination from "../../../components/util/myPagination";
import SelectCities from "../../../components/util/selectCities";
import CardExcursion from "../../../components/excursion/cardExcursion";
import { SpartanHelmetIcon } from "hugeicons-react";
import Modal from "../../../components/hotel/modal";
import FormExcursion2 from "../../../components/excursion/formExcursion2";

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

  const fetchExcursions = async (
    nextDoc = null,
    search = "",
    searchField = ""
  ) => {
    setLoading(true);
    setMessage("");
    try {
      const url = `http://localhost:3030/excursions?next=${
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
        <nav
          className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
          id="navbarBlur"
          navbar-scroll="true"
        >
          <div className="container-fluid py-1 px-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                <li className="breadcrumb-item text-sm">
                  <span>Excursion</span>
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
              <div className="ms-md-auto pe-md-3 d-flex align-items-center w-35">
                <div className="input-group">
                  <span className="input-group-text text-body">
                    <i className="fas fa-search" aria-hidden="true"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Rechercher une excursion..."
                  />
                </div>
              </div>
              <ul className="navbar-nav  justify-content-end">
                <li className="nav-item d-flex align-items-center">
                  <a
                    className="btn btn-outline-primary btn-sm mb-0 me-3"
                    onClick={handleShowMap}
                  >
                    Nouvelle excursion
                  </a>
                  <Modal isOpen={isMapModalOpen}>
                    <FormExcursion2
                      method="POST"
                      isOpen={isMapModalOpen}
                      title="AJOUTER UNE EXCURSION"
                      onCancel={handleCloseModal}
                    />
                  </Modal>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div
          className="card-body px-0 pt-0 pb-2"
          style={{
            backgroundColor: "white",
            width: "90%",
            margin: "2% 0 0 4%",
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
              <span style={{ marginLeft: "1%" }}>Listes des excursions</span>
            </div>
            <div className="col-md-2">
              <SelectCities
                disabledOption="Filtrer par ville"
                onChange={handleSelectCity}
                specificOption="Toutes les villes"
                specificOptionValue=""
              />
            </div>
          </div>
          <br />
          <div className="row gx-4" style={{ padding: "2% 0 0 3%" }}>
            {loading ? (
              <p>Loading...</p>
            ) : excursions.length > 0 ? (
              excursions.map((excursion) => (
                <div className="custom-col mb-4" key={excursion.id}>
                  <CardExcursion
                    excursionId={excursion.id}
                    logo={excursion.image}
                    place_name={excursion.place_name}
                    city={excursion.city}
                    price={excursion.price}
                    description={excursion.description}
                  />
                </div>
              ))
            ) : (
              <p style={{ marginLeft: "2.5%" }}>Aucune excursion</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
