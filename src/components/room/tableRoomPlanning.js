import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowUpDownIcon, BedDoubleIcon, Moon02Icon } from "hugeicons-react";
import TrRoomPlanning from "./trRoomPlanning";
import Modal from "../util/modal";
import FormRoomPlanning from "./formRoomPlanning";

export default function TableRoomPlanning() {
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const handleCloseModal = () => setIsMapModalOpen(false);
  const handleShowForm = () => setIsMapModalOpen(true);

  return (
    <div
      className="card-body px-0 pt-0 pb-2"
      style={{
        backgroundColor: "white",
        borderRadius: "10px",
      }}
    >
      <div className="card-header pb-0 d-flex justify-content-between align-items-center">
        <h6>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            class="bi bi-lamp"
            viewBox="0 0 16 16"
            style={{ marginBottom: "3%" }}
          >
            <path
              fill-rule="evenodd"
              d="M5.04.303A.5.5 0 0 1 5.5 0h5c.2 0 .38.12.46.303l3 7a.5.5 0 0 1-.363.687h-.002q-.225.044-.45.081a33 33 0 0 1-4.645.425V13.5a.5.5 0 1 1-1 0V8.495a33 33 0 0 1-4.645-.425q-.225-.036-.45-.08h-.003a.5.5 0 0 1-.362-.688l3-7ZM3.21 7.116A31 31 0 0 0 8 7.5a31 31 0 0 0 4.791-.384L10.171 1H5.83z"
            />
            <path d="M6.493 12.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.3 1.3 0 0 0-.37.265.3.3 0 0 0-.052.075l-.001.004-.004.01V14l.002.008.016.033a.6.6 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.6.6 0 0 0 .146-.15l.015-.033L12 14v-.004a.3.3 0 0 0-.057-.09 1.3 1.3 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465s-2.462-.172-3.34-.465c-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411" />
          </svg>
          CHAMBRES
        </h6>
        <div
          className="btn btn-outline-primary btn-sm mb-0 me-3"
          style={{ marginLeft: "3%" }}
        >
          <a onClick={handleShowForm}>Ajouter une chambre</a>
        </div>
        <Modal isOpen={isMapModalOpen}>
          <FormRoomPlanning
            isOpen={isMapModalOpen}
            method="POST"
            onCancel={handleCloseModal}
          />
        </Modal>
      </div>
      <div className="card-body px-0 pt-0 pb-2">
        {/* {loading ? (
          <div
            className="spinner-border spinner-border-sm"
            role="status"
            style={{ marginLeft: "3%" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : rooms.length > 0 ? ( */}
        <div className="table-responsive p-0">
          <table className="table align-items-center mb-0">
            <thead>
              <tr>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                  Chambres
                </th>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                  Categorie de prix
                </th>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                  Nombre
                </th>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                  Tarif par nuit
                </th>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                  Prix total
                </th>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                  Occupants
                </th>
                <th className="text-secondary opacity-7"></th>
              </tr>
            </thead>
            <tbody>
              {/* {rooms.map((room) => ( */}
              <TrRoomPlanning
                room_type={"Double"}
                price_category={"Premier"}
                quantity={3}
                price={1000}
                occupant={"Couple 1"}
              />
              <TrRoomPlanning
                room_type={"Double"}
                price_category={"Premier"}
                quantity={3}
                price={1000}
                occupant={"Famille (5) 1"}
              />
              {/* ))} */}
            </tbody>
          </table>
        </div>
        {/* ) : (
          <p style={{ fontSize: "15px", marginLeft: "2.5%" }}>Aucune chambre</p>
        )} */}
      </div>
    </div>
  );
}
