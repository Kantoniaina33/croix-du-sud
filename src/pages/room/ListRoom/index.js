import "../../../assets/css/soft-ui-dashboard.min.css";
import "./style.css";
import Aside from "../../../components/template/aside";
import TrRoom from "../../../components/room/trRoom";
import HeadHotel from "../../../components/hotel/headHotel";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import FormRoom from "../../../components/room/formRoom";
import { useParams } from "react-router-dom";

export default function ListRoom() {
  const { hotelId } = useParams();
  const [show, setShow] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState("");

  const fetchRooms = async () => {
    setMessage("");
    try {
      const response = await fetch(
        `http://localhost:3030/hotels/${hotelId}/rooms`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
                  <span style={{ color: "white" }}>Hotel</span>
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
            ></div>
          </div>
        </nav>
        <div className="container-fluid">
          <div
            className="page-header border-radius-xl mt-4"
            style={{ minHeight: "150px" }}
          >
            <span className="mask opacity-6" id="background"></span>
          </div>
          <HeadHotel
            logo="/carlton.png"
            name="Carlton"
            email="carlton@gmail.com"
            phone="034 34 334 34"
            star="5"
            address="carlton adresse"
            city="Antananarivo"
          />
        </div>
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-0 d-flex justify-content-between align-items-center">
                  <h6>Liste de chambres</h6>
                  <a
                    className="btn btn-outline-primary btn-sm mb-0"
                    target="blank"
                    onClick={handleShow}
                  >
                    Ajouter des chambres
                  </a>
                  <Modal show={show} onHide={handleClose}>
                    <FormRoom method="POST" title="AJOUTER DES CHAMBRES" />
                  </Modal>
                </div>

                <div className="card-body px-0 pt-0 pb-2">
                  {rooms.length > 0 ? (
                    <div className="table-responsive p-0">
                      <table className="table align-items-center mb-0">
                        <thead>
                          <tr>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Type
                            </th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                              Capacite
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Categorie de prix
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Tarif par nuit
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Nombre total
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
                    <p style={{ marginLeft: "2.5%" }}>Aucune chambre</p>
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
