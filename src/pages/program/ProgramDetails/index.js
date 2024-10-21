import React, { useState, useEffect } from "react";
import Aside from "../../../components/template/aside";
import Modal from "../../../components/util/modal";
import { useParams } from "react-router-dom";
import SheetProgram from "../../../components/program/sheetProgram";
import OfferingPlanning from "../../../components/offering/offeringPlanning";
import TableExcursionPlanning from "../../../components/excursion/tableExcursionPlanning";
import TableTransferPlanning from "../../../components/transfer/tableTransferPlanning";
import ChooseOffering from "../../../components/offering/ChooseOffering";
import ChooseOfferingType from "../../../components/offeringType/chooseOfferingType";
import FormHotelPlanning from "../../../components/hotel/formHotelPlanning";
import ListOfferingPlanning from "../../../components/program/listOfferingPlanning";
import AddPorter from "../../../components/program/addPorter";
import AddGuide from "../../../components/program/addGuide";
import { UserListIcon } from "hugeicons-react";
import TableStaffPlanning from "../../../components/role/tableStaffPlanning";
import Header from "../../../components/template/header";

export default function ProgramDetails() {
  const [program, setProgram] = useState([]);
  const { programId } = useParams();
  const [message, setMessage] = useState("");
  const [offeringTypeId, setOfferingTypeId] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isNextModalOpen, setIsNextModalOpen] = useState(false);

  const fetchProgram = async () => {
    setLoading(true);
    setMessage("");
    try {
      const url = `http://localhost:3030/programs/${programId}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        setMessage("Failed to fetch program");
        return;
      }
      const data = await response.json();
      setProgram(data);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching program");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgram();
  }, []);

  const handleCloseModal = () => setIsMapModalOpen(false);
  const handleShowMap = () => setIsMapModalOpen(true);
  const handleCloseNextModal = () => setIsNextModalOpen(false);

  const handleNext = (offering_typeId) => {
    setOfferingTypeId(offering_typeId);
    setIsMapModalOpen(false);
    setIsNextModalOpen(true);
  };

  return (
    <div>
      <Aside />
      <main
        id="listHotel"
        className="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
      >
        <Header
          pages="Programmes"
          slash="Details"
          buttonText="Ajouter une prestation"
          handleOnClick={handleShowMap}
        />
        <Modal isOpen={isMapModalOpen}>
          <ChooseOfferingType
            method="POST"
            onCancel={handleCloseModal}
            onClose={handleNext}
          />
        </Modal>
        <Modal isOpen={isNextModalOpen}>
          <ChooseOffering
            urlSave={`http://localhost:3030/programs/${programId}/offerings`}
            onCancel={handleCloseNextModal}
            offering_typeId={offeringTypeId}
            programId={programId}
            method="POST"
          />
        </Modal>
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4" style={{ position: "inherit" }}>
                {loading ? (
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                    style={{ marginLeft: "3%" }}
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : program && program.departureCoordinates ? (
                  <SheetProgram
                    programId={program.id}
                    departure={program.departure}
                    arrival={program.arrival}
                    distance={program.distance}
                    duration={program.duration}
                    description={program.description}
                    departureLatitude={program.departureCoordinates.latitude}
                    departureLongitude={program.departureCoordinates.longitude}
                    arrivalLatitude={program.arrivalCoordinates.latitude}
                    arrivalLongitude={program.arrivalCoordinates.longitude}
                  />
                ) : (
                  <p>Oups</p>
                )}
                <hr className="custom-hr" />
                <TableStaffPlanning programId={programId} />
                <hr className="custom-hr" />
                <ListOfferingPlanning programId={programId} />
                <TableExcursionPlanning programId={programId} />
                <hr className="custom-hr" />
                <TableTransferPlanning programId={programId} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
