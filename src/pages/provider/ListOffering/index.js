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
          <div className="row" style={{ overflowY: "auto", height: "80vh" }}>
            <div className="col-12">
              <div className="card mb-4">
                <Return href={"/providers"} />
                <div
                  className="card-header pb-0"
                  style={{ marginBottom: "-2%" }}
                >
                  <h6>Prestations</h6>
                </div>
                {offering_types &&
                  offering_types.map((offering_type, index) => (
                    <>
                      <TableOffering
                        providerId={id}
                        offering_typeId={offering_type.id}
                        offering_type={offering_type.name}
                      />
                      {offering_types.length > 1 &&
                        index != offering_types.length - 1 && (
                          <hr className="custom-hr" />
                        )}
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
