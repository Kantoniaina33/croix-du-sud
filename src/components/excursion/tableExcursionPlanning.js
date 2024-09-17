import { useState } from "react";
import Modal from "../hotel/modal";
import AddExcursionPlanning from "./addExcursionPlanning";
import TrExcursionPlanning from "./trExcursionPlanning";

export default function TableExcursionPlanning() {
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const handleCloseModal = () => setIsMapModalOpen(false);
  const handleShowForm = () => setIsMapModalOpen(true);

  return (
    <div
      className="card-body px-0 pt-0 pb-2"
      style={{
        backgroundColor: "white",
        // width: "q0%",
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
            class="bi bi-tree"
            viewBox="0 0 16 16"
            style={{ marginBottom: "3%" }}
          >
            <path d="M8.416.223a.5.5 0 0 0-.832 0l-3 4.5A.5.5 0 0 0 5 5.5h.098L3.076 8.735A.5.5 0 0 0 3.5 9.5h.191l-1.638 3.276a.5.5 0 0 0 .447.724H7V16h2v-2.5h4.5a.5.5 0 0 0 .447-.724L12.31 9.5h.191a.5.5 0 0 0 .424-.765L10.902 5.5H11a.5.5 0 0 0 .416-.777zM6.437 4.758A.5.5 0 0 0 6 4.5h-.066L8 1.401 10.066 4.5H10a.5.5 0 0 0-.424.765L11.598 8.5H11.5a.5.5 0 0 0-.447.724L12.69 12.5H3.309l1.638-3.276A.5.5 0 0 0 4.5 8.5h-.098l2.022-3.235a.5.5 0 0 0 .013-.507" />
          </svg>
          EXCURSIONS
        </h6>
        <div
          className="btn btn-outline-primary btn-sm mb-0 me-3"
          style={{ marginLeft: "3%" }}
        >
          <a onClick={handleShowForm}>Ajouter une excursion</a>
        </div>
        <Modal isOpen={isMapModalOpen}>
          <AddExcursionPlanning onCancel={handleCloseModal} />
        </Modal>
      </div>
      <div className="card-body px-0 pt-0 pb-2">
        {/* <a className="btn btn-outline-primary btn-sm mb-0 me-3" target="blank">
          Nouvel employe
        </a> */}
        {/* {loading ? ( */}
        {/* <div
          className="spinner-border spinner-border-sm"
          role="status"
          style={{ marginLeft: "3%" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div> */}
        {/* ) : hotels.length < 0 ? ( */}
        <div className="table-responsive p-0">
          <table className="table align-items-center mb-0">
            <thead>
              <tr>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                  Excursion
                </th>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                  Prix
                </th>
                <th className="text-secondary opacity-7"></th>
              </tr>
            </thead>
            <tbody>
              {/* {hotels.slice(0, 3).map((hotel) => ( */}
              <>
                <TrExcursionPlanning
                  image={"hotel.image"}
                  place_name={"hotel.place_name"}
                  price={"hotel.price"}
                />
                <TrExcursionPlanning
                  image={"hotel.image"}
                  place_name={"hotel.place_name"}
                  price={"hotel.price"}
                />
              </>
              {/* ))} */}
            </tbody>
          </table>
          {/* <a
            className="btn btn-outline-primary btn-sm mb-0 me-3"
            target="blank"
            //   onClick={handleShowMap}
          >
            Nouvel employe
          </a> */}
        </div>
        {/* ) : (
          <p style={{ marginLeft: "2.5%", fontSize: "15px" }}>
            Aucune excursion disponible
          </p>
        )} */}
      </div>
    </div>
  );
}
