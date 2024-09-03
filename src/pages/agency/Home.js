// Home.js
import { useState } from "react";
import FormHotel2 from "../../components/hotel/formHotel2";
import Modal from "../../components/hotel/modal";

function Home() {
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const handleShowMap = () => setIsMapModalOpen(true);
  const handleCloseMap = () => setIsMapModalOpen(false);

  return (
    <>
      <button
        type="button"
        className="btn btn-secondary w-100"
        onClick={handleShowMap}
      >
        Ouvrir le formulaire
      </button>
      <Modal isOpen={isMapModalOpen} /*nClose={handleCloseMap}*/>
        <FormHotel2
          isOpen={isMapModalOpen}
          // onClose={handleCloseMap}
        />
      </Modal>
    </>
  );
}

export default Home;
