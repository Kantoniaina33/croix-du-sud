import React, { useState } from "react";
import "./provider.css";
import CardMap from "../geo/cardMap";
import MyMap from "../geo/myMap";
import ShowMap from "../geo/showMap";
import Return from "../util/return";
import AlertDelete from "../util/alertDelete";
import { Delete02Icon, Edit02Icon, StarIcon } from "hugeicons-react";
import FormProvider from "./formProvider";
import Modal from "../util/modal";

export default function SheetProvider(props) {
  const {
    providerId,
    logo,
    name,
    address,
    city,
    phone,
    email,
    setMeals,
    latitude,
    longitude,
    location,
  } = props;
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState(false);
  const [showSheet, setShowSheet] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const handleAlert = () => setAlert(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowSheet = () => setShowSheet(true);
  const handleShowMap = () => setIsMapModalOpen(true);
  const handleCloseModal = () => setIsMapModalOpen(false);

  return (
    <div className="sheetProvider">
      <div className="return">
        <Return href="/providers" />
      </div>
      <div className="providerDetails">
        <div className="card-image-left">
          <div>
            <img src={logo} alt="provider" />
          </div>
          <div className="card-content">
            <div className="d-flex justify-content-between align-items-center">
              <div className="title">
                <h6 className="card-title">{name}</h6>
              </div>
              <div className="card-actions">
                <button
                  style={{ backgroundColor: "white", border: "none" }}
                  onClick={handleShowMap}
                >
                  <Edit02Icon color="blue" size={20} />
                </button>
                <Modal isOpen={isMapModalOpen}>
                  <FormProvider
                    title="MODIFIER UN HOTEL"
                    method="PUT"
                    providerId={providerId}
                    logo={logo}
                    name={name}
                    address={address}
                    phone={phone}
                    email={email}
                    isOpen={isMapModalOpen}
                    onCancel={handleCloseModal}
                  />
                </Modal>
              </div>
            </div>
            <div className="info">
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-geo-alt"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                </svg>
              </p>
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-envelope"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                </svg>
                <span>{email}</span>
              </p>
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-telephone"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                </svg>
                <span>{phone}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="card-map-right z-index-2"></div>
      </div>
    </div>
  );
}
