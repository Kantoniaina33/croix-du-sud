import React, { useState, useEffect } from "react";
import TrOfferingOption from "../../../components/offeringOption/trOfferingOption";
import "../../../assets/css/soft-ui-dashboard.min.css";
import "./style.css";
import Aside from "../../../components/template/aside";
import FormOfferingOption from "../../../components/offeringOption/formOfferingOption";
import MyPagination from "../../../components/util/myPagination";
import SelectCities from "../../../components/util/selectCities";
import { ArrowUpDownIcon } from "hugeicons-react";
import Modal from "../../../components/util/modal";
import LogoutButton from "../../../components/util/logoutButton";
import MySearchBar from "../../../components/util/mySearchBar";
import { useParams } from "react-router-dom";
import Header from "../../../components/template/header";

export default function ListOfferingOption() {
  const [show, setShow] = useState(false);
  const [offeringOptions, setOfferingOptions] = useState([]);
  const [message, setMessage] = useState("");
  const [next, setNext] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("");
  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState("asc");
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const limit = 10;
  const { typeId } = useParams();
  const fetchOfferingOptions = async () => {
    setLoading(true);
    setMessage("");
    try {
      const url = `http://localhost:3030/offerings/types/${typeId}/options`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        setMessage("Failed to fetch offering options");
        return;
      }
      const data = await response.json();
      setOfferingOptions(data);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching offering options");
    } finally {
      setLoading(false);
    }
  };

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
    fetchOfferingOptions();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowMap = () => setIsMapModalOpen(true);
  const handleCloseModal = () => setIsMapModalOpen(false);

  const handleSearchOfferingOption = (e) => {
    setSearchField("name");
    setSearch(e.target.value);
  };

  const handleClearSearch = (e) => {
    setSearchField("");
    setSearch("");
  };

  return (
    <div>
      <Aside />
      <main
        id="listOfferingOption"
        className="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
      >
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
          rel="stylesheet"
        />
        <Header
          pages="Options de prestation"
          slash="Liste"
          searchPlaceholder="Rechercher une option ..."
          search={search}
          setSearch={setSearch}
          handleClearSearch={handleClearSearch}
          handleSearch={handleSearchOfferingOption}
          buttonText="Nouvelle option de prestation"
          handleOnClick={handleShowMap}
        />
        <Modal isOpen={isMapModalOpen}>
          <FormOfferingOption
            typeId={typeId}
            method="POST"
            onCancel={handleCloseModal}
          />
        </Modal>
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4" style={{ position: "inherit" }}>
                <div className="card-header pb-0 d-flex justify-content-between align-items-center">
                  <h6>Liste des options spécifiques par type de prestations</h6>
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
                  ) : offeringOptions.length > 0 ? (
                    <div className="table-responsive p-0">
                      <table className="table align-items-center mb-0">
                        <thead>
                          <tr>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Nom
                            </th>
                            <th className="text-secondary opacity-7"></th>
                            <th className="text-secondary opacity-7"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {offeringOptions.map((offeringOption) => (
                            <>
                              <TrOfferingOption
                                key={offeringOption.id}
                                offeringOptionId={offeringOption.id}
                                name={offeringOption.option_name}
                              />
                            </>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p style={{ fontSize: "15px", marginLeft: "2.5%" }}>
                      Aucun option de prestation
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
