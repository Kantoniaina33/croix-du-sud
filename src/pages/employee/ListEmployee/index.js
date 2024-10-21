import React, { useState, useEffect } from "react";
import TrEmployee from "../../../components/employee/trEmployee";
import "../../../assets/css/soft-ui-dashboard.min.css";
import "./style.css";
import Aside from "../../../components/template/aside";
import MyPagination from "../../../components/util/myPagination";
import SelectCities from "../../../components/util/selectCities";
import { ArrowUpDownIcon } from "hugeicons-react";
import FormEmployee from "../../../components/employee/formEmployee";
import { useParams } from "react-router-dom";
import Modal from "../../../components/util/modal";
import FormRoleEmployee from "../../../components/employee/formRoleEmployee";
import LogoutButton from "../../../components/util/logoutButton";
import MySearchBar from "../../../components/util/mySearchBar";
import Header from "../../../components/template/header";

export default function ListEmployee() {
  const [show, setShow] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState("");
  const [next, setNext] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("");
  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState("asc");
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isNextModalOpen, setIsNextModalOpen] = useState(false);
  const [employee, setEmployee] = useState(null);

  const limit = 10;
  const fetchEmployees = async (
    nextDoc = null,
    sort = "name",
    order = "asc",
    search = "",
    searchField = ""
  ) => {
    setLoading(true);
    setMessage("");
    try {
      const url = `http://localhost:3030/employees?limit=${limit}&&next=${
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
        setMessage("Failed to fetch employees");
        return;
      }
      const data = await response.json();
      setEmployees(data.employees);
      setNext(data.next);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching employees");
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
    fetchEmployees(null, sort, order, search, searchField);
  }, [sort, order, search, searchField]);

  const handlePageChange = (nextDoc) => {
    fetchEmployees(nextDoc, sort, order, search, searchField);
    setCurrentPage((prevPage) => (nextDoc ? prevPage + 1 : 1));
  };

  const handleCloseModal = () => setIsMapModalOpen(false);
  const handleShowMap = () => setIsMapModalOpen(true);
  const handleCloseNextModal = () => setIsNextModalOpen(false);

  const handleNext = (dataEmployee) => {
    setEmployee(dataEmployee);
    setIsMapModalOpen(false);
    setIsNextModalOpen(true);
  };

  const handleSearchEmployee = (e) => {
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
        id="listEmployee"
        className="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
      >
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
          rel="stylesheet"
        />
        <Header
          pages="Employes"
          slash="Liste"
          searchPlaceholder="Rechercher un employe ..."
          search={search}
          setSearch={setSearch}
          handleClearSearch={handleClearSearch}
          handleSearch={handleSearchEmployee}
          buttonText="Nouvel employe"
          handleOnClick={handleShowMap}
        />
        <Modal isOpen={isMapModalOpen}>
          <FormEmployee
            method="POST"
            title="NOUVEL EMPLOYE"
            handleCloseModal={handleCloseModal}
            onCancel={handleCloseModal}
            onClose={handleNext}
          />
        </Modal>
        <Modal isOpen={isNextModalOpen}>
          <FormRoleEmployee
            onCancel={handleCloseNextModal}
            employee={employee}
            method="POST"
          />
        </Modal>
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4" style={{ position: "inherit" }}>
                <div className="card-header pb-0 d-flex justify-content-between align-items-center">
                  <h6>Liste des employés</h6>
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
                  ) : employees.length > 0 ? (
                    <div className="table-responsive p-0">
                      <table className="table align-items-center mb-0">
                        <thead>
                          <tr>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Nom
                            </th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                              Prenom
                            </th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                              Genre
                            </th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                              Contact
                            </th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                              Poste
                            </th>
                            <th className="text-secondary opacity-7"></th>
                            <th className="text-secondary opacity-7"></th>
                            <th className="text-secondary opacity-7"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {employees.map((employee) => (
                            <>
                              <TrEmployee
                                key={employee.id}
                                employeeId={employee.id}
                                firstName={employee.firstName}
                                name={employee.name}
                                birthDate={employee.birthDate}
                                genre={employee.genre}
                                email={employee.email}
                                phone={employee.phone}
                                role={employee.role.name}
                                roleId={employee.role.id}
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
                      Aucun employé
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
