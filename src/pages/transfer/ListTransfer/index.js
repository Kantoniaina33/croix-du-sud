import React, { useState, useEffect } from "react";
import TrTransfer from "../../../components/transfer/trTransfer";
import "../../../assets/css/soft-ui-dashboard.min.css";
import "./style.css";
import Aside from "../../../components/template/aside";
import FormTransfer from "../../../components/transfer/formTransfer";
import MyPagination from "../../../components/util/myPagination";
import SelectCities from "../../../components/util/selectCities";
import { ArrowUpDownIcon } from "hugeicons-react";
import Modal from "../../../components/util/modal";
import LogoutButton from "../../../components/util/logoutButton";
import MySearchBar from "../../../components/util/mySearchBar";
import Header from "../../../components/template/header";

export default function ListTransfer() {
  const [show, setShow] = useState(false);
  const [transfers, setTransfers] = useState([]);
  const [message, setMessage] = useState("");
  const [next, setNext] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("");
  const [sort, setSort] = useState("departure");
  const [order, setOrder] = useState("asc");
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const limit = 10;
  const fetchTransfers = async (
    nextDoc = null,
    sort = "departure",
    order = "asc",
    search = "",
    searchField = ""
  ) => {
    setLoading(true);
    setMessage("");
    try {
      const url = `http://localhost:3030/transfers/paginated?limit=${limit}&&next=${
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
        setMessage("Failed to fetch transfers");
        return;
      }
      const data = await response.json();
      setTransfers(data.transfers);
      setNext(data.next);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching transfers");
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
    fetchTransfers(null, sort, order, search, searchField);
  }, [sort, order, search, searchField]);

  const handlePageChange = (nextDoc) => {
    fetchTransfers(nextDoc, sort, order, search, searchField);
    setCurrentPage((prevPage) => (nextDoc ? prevPage + 1 : 1));
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowMap = () => setIsMapModalOpen(true);
  const handleCloseModal = () => setIsMapModalOpen(false);

  const handleSearchTransfer = (e) => {
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
        id="listTransfer"
        className="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
      >
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
          rel="stylesheet"
        />
        <Header
          pages="Transferts"
          slash="Liste"
          searchPlaceholder="Rechercher un transfert ..."
          search={search}
          setSearch={setSearch}
          handleClearSearch={handleClearSearch}
          handleSearch={handleSearchTransfer}
          buttonText="Nouveau transfert"
          handleOnClick={handleShowMap}
        />
        <Modal isOpen={isMapModalOpen}>
          <FormTransfer
            method="POST"
            title="NOUVEAU CIRCUIT"
            onCancel={handleCloseModal}
          />
        </Modal>
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4" style={{ position: "inherit" }}>
                <div className="card-header pb-0 d-flex justify-content-between align-items-center">
                  <h6>Liste des transferts</h6>
                  {/* <div className="col-md-2">
                    <SelectCities
                      disabledOption="Filtrer par ville"
                      onChange={handleSelectCity}
                      specificOption="Toutes les villes"
                      specificOptionValue=""
                    />
                  </div> */}
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
                  ) : transfers.length > 0 ? (
                    <div className="table-responsive p-0">
                      <table className="table align-items-center mb-0">
                        <thead>
                          <tr>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Transfert
                            </th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                              Prix
                            </th>
                            <th className="text-secondary opacity-7"></th>
                            <th className="text-secondary opacity-7"></th>
                            <th className="text-secondary opacity-7"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {transfers.map((transfer) => (
                            <>
                              <TrTransfer
                                key={transfer.id}
                                transferId={transfer.id}
                                departure={transfer.departure}
                                arrival={transfer.arrival}
                                price={transfer.price}
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
                      Aucun transfert
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
