import "../../../assets/css/soft-ui-dashboard.min.css";
import Aside from "../../../components/template/aside";
import { useState, useEffect } from "react";
import LogoutButton from "../../../components/util/logoutButton";

import { useParams } from "react-router-dom";
import TableOffering from "../../../components/offering/tableOffering";
import HeadProvider from "../../../components/provider/headProvider";
import Modal from "../../../components/util/modal";
import FormOffering from "../../../components/offering/formOffering";
import Return from "../../../components/util/return";

export default function ListOffering(props) {
  const { id, reservationId } = useParams();
  const [offering_types, setOffering_types] = useState([]);
  const [message, setMessage] = useState("");
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const fetchOffersetOffering_types = async () => {
    setMessage("");
    try {
      const url = `http://localhost:3030/offerings/types`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        setMessage("Failed to fetch offering_types");
        return;
      }
      const data = await response.json();
      setOffering_types(data);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching offering_types");
    }
  };

  useEffect(() => {
    fetchOffersetOffering_types();
  }, []);

  const handleCloseModal = () => setIsMapModalOpen(false);
  const handleShowMap = () => setIsMapModalOpen(true);

  return (
    <div>
      <Aside></Aside>
      <main
        id="listHotel"
        className="main-content position-relative max-height-vh-100 h-100 border-radius-lg "
      >
        <nav className="navbar navbar-main navbar-expand-lg bg-transparent shadow-none position-absolute px-4 w-100 z-index-2">
          <div className="container-fluid py-1">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 ps-2 me-sm-6 me-5">
                <li className="breadcrumb-item text-sm">
                  <span style={{ color: "white" }}>Prestataires</span>
                </li>
                <li
                  className="font-weight-bold breadcrumb-item text-sm text-white active"
                  aria-current="page"
                >
                  Prestations
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
                    href="/offerings/types"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-gear"
                      viewBox="0 0 16 16"
                      style={{ margin: "-1% 0 0 0" }}
                    >
                      <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
                      <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z" />
                    </svg>
                    <span> Type de prestation</span>
                  </a>
                  <Modal isOpen={isMapModalOpen}>
                    <FormOffering
                      method="POST"
                      isOpen={isMapModalOpen}
                      onCancel={handleCloseModal}
                      providerId={id}
                    />
                  </Modal>
                </li>
                <li className="nav-item d-flex align-items-center">
                  <a
                    className="btn btn-outline-primary btn-sm mb-0 me-3"
                    target="blank"
                    onClick={handleShowMap}
                    id="addRoom"
                  >
                    Nouvelle prestation
                  </a>
                  <Modal isOpen={isMapModalOpen}>
                    <FormOffering
                      method="POST"
                      isOpen={isMapModalOpen}
                      onCancel={handleCloseModal}
                      providerId={id}
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
          <HeadProvider providerId={id} />
        </div>
        <div className="container-fluid py-4">
          <div className="row" style={{ height: "80vh" }}>
            <div className="col-12">
              <div className="card mb-4" style={{ position: "inherit" }}>
                <Return href={"/providers"} />
                {offering_types &&
                  offering_types.map((offering_type, index) => (
                    <>
                      <TableOffering
                        providerId={id}
                        offering_typeId={offering_type.id}
                        offering_type={offering_type.name}
                      />
                    </>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
