import "../../../assets/css/soft-ui-dashboard.min.css";
import "./style.css";
import Aside from "../../../components/template/aside";
import TrRoom from "../../../components/room/trRoom";
import HeadHotel from "../../../components/hotel/headHotel";
import { useEffect, useState } from "react";
import FormRoom from "../../../components/room/formRoom";
import { useParams } from "react-router-dom";
import SelectPriceCategories from "../../../components/util/selectPriceCategories";
import SelectRoomTypes from "../../../components/util/selectRoomTypes";
import { ArrowUpDownIcon } from "hugeicons-react";
import Modal from "../../../components/util/modal";
import Return from "../../../components/util/return";

export default function ListRoom() {
  const { hotelId } = useParams();
  const [show, setShow] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState("");
  const [searchTypeField, setSearchTypeField] = useState("");
  const [searchPriceCat, setSearchPriceCat] = useState("");
  const [searchPriceCatField, setSearchPriceCatField] = useState("");
  const [sort, setSort] = useState("capacity");
  const [order, setOrder] = useState("asc");
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const fetchRooms = async (
    sort = "capacity",
    order = "asc",
    searchType = "",
    searchTypeField = "",
    searchPriceCat = "",
    searchPriceCatField = ""
  ) => {
    setLoading(true);
    setMessage("");
    try {
      const url = `http://localhost:3030/hotels/${hotelId}/rooms?orderBy=${sort}&&order=${order}&&searchTypeField=${searchTypeField}&&searchType=${searchType}&&searchPriceCatField=${searchPriceCatField}&&searchPriceCat=${searchPriceCat}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        setMessage("Failed to fetch rooms");
        return;
      }

      const data = await response.json();
      const roomsArray = Object.keys(data).map((key) => ({
        ...data[key],
      }));
      setRooms(roomsArray);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching rooms");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRoomType = (e) => {
    setSearchTypeField("room_type");
    setSearchType(e.target.value);
  };

  const handleSelectPriceCat = (e) => {
    setSearchPriceCatField("price_category");
    setSearchPriceCat(e.target.value);
  };

  const handleSort = (value) => {
    setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    setSort(value);
  };

  useEffect(() => {
    fetchRooms(
      sort,
      order,
      searchType,
      searchTypeField,
      searchPriceCat,
      searchPriceCatField
    );
  }, [
    sort,
    order,
    searchType,
    searchTypeField,
    searchPriceCat,
    searchPriceCatField,
  ]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseModal = () => setIsMapModalOpen(false);
  const handleShowMap = () => setIsMapModalOpen(true);

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
        <nav className="navbar navbar-main navbar-expand-lg bg-transparent shadow-none position-absolute px-4 w-100 z-index-2">
          <div className="container-fluid py-1">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 ps-2 me-sm-6 me-5">
                <li className="breadcrumb-item text-sm">
                  <span style={{ color: "white" }}>Hôtels</span>
                </li>
                <li
                  className="font-weight-bold breadcrumb-item text-sm text-white active"
                  aria-current="page"
                >
                  Chambres
                </li>
              </ol>
              <h6 className="text-white font-weight-bolder ms-2"></h6>
            </nav>
            <div
              className="collapse navbar-collapse me-md-0 me-sm-4 mt-sm-0 mt-2"
              id="navbar"
            >
              <ul className="navbar-nav ms-auto">
                <li className="nav-item d-flex align-items-center">
                  <a
                    className="btn btn-outline-primary btn-sm mb-0 me-3"
                    target="blank"
                    onClick={handleShowMap}
                    id="addRoom"
                  >
                    Ajouter des chambres
                  </a>
                  <Modal isOpen={isMapModalOpen}>
                    <FormRoom
                      isOpen={isMapModalOpen}
                      method="POST"
                      title="AJOUTER DES CHAMBRES"
                      onCancel={handleCloseModal}
                    />
                  </Modal>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container-fluid">
          <div
            className="page-header border-radius-xl mt-4"
            style={{ minHeight: "150px" }}
          >
            <span className="mask opacity-6" id="background"></span>
          </div>
          <HeadHotel />
        </div>
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <Return href="/hotels" />
                <div className="card-header pb-0 d-flex justify-content-between align-items-center">
                  <h6>Liste des chambres</h6>
                  <div className="w-55">
                    <div className="row">
                      <div className="col">
                        <SelectRoomTypes
                          disabledOption="Filtrer par type de chambre"
                          specificOption="Tout"
                          specificOptionValue=""
                          onChange={handleSelectRoomType}
                        />
                      </div>
                      <div className="col">
                        <SelectPriceCategories
                          disabledOption="Filtrer par catégorie de prix"
                          specificOption="Tout"
                          specificOptionValue=""
                          onChange={handleSelectPriceCat}
                        />
                      </div>
                    </div>
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
                  ) : rooms.length > 0 ? (
                    <div className="table-responsive p-0">
                      <br />
                      <table className="table align-items-center mb-0">
                        <thead>
                          <tr>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Type
                            </th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                              Capacite
                              <a href="#">
                                <ArrowUpDownIcon
                                  id="sortIcon"
                                  size={16}
                                  onClick={() => handleSort("capacity")}
                                  style={{
                                    marginLeft: "5px",
                                    marginTop: "-5px",
                                  }}
                                />
                              </a>
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Categorie de prix
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Tarif par nuit
                              <a href="#">
                                <ArrowUpDownIcon
                                  id="sortIcon"
                                  size={16}
                                  onClick={() => handleSort("price")}
                                  style={{
                                    marginLeft: "5px",
                                    marginTop: "-5px",
                                  }}
                                />
                              </a>
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Nombre total
                              <a href="#">
                                <ArrowUpDownIcon
                                  id="sortIcon"
                                  size={16}
                                  onClick={() => handleSort("number_of_rooms")}
                                  style={{
                                    marginLeft: "5px",
                                    marginTop: "-5px",
                                  }}
                                />
                              </a>
                            </th>
                            <th className="text-secondary opacity-7"></th>
                            <th className="text-secondary opacity-7"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {rooms.map((room) => (
                            <TrRoom
                              id={room.id}
                              room_type={room.room_type}
                              capacity={room.capacity}
                              price_category={room.price_category}
                              price={room.price}
                              total={room.number_of_rooms}
                            />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p style={{ fontSize: "15px", marginLeft: "2.5%" }}>
                      Aucune chambre
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
