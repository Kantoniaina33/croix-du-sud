// Home.js
import { useState } from "react";
import FormHotel2 from "../../components/hotel/formHotel2";
import Modal from "../../components/hotel/modal";
import FormExcursion2 from "../../components/excursion/formExcursion2";
import FormRoom2 from "../../components/room/formRoom2";
import FormEmployee from "../../components/employee/formEmployee";
import FormEmployee2 from "../../components/employee/formEmployee2";
import FormRole2 from "../../components/role/formRole2";
import MapItinerary from "../../components/geo/mapItinerary";
import FormRoleEmployee from "../../components/employee/formRoleEmployee";
import FormCircuit2 from "../../components/circuit/formCircuit2";
import MiniCardProgram from "../../components/program/miniCardProgram";

function Home() {
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const handleShowMap = () => setIsMapModalOpen(true);
  const handleCloseMap = () => setIsMapModalOpen(false);

  return (
    <div className="card card-plain mt-1">
      {/* <button
        type="button"
        className="btn btn-secondary w-100"
        onClick={handleShowMap}
      >
        Ouvrir le formulaire
      </button>
      <Modal isOpen={isMapModalOpen}>
        <FormCircuit2
          isOpen={isMapModalOpen}
          // onClose={handleCloseMap}
        />
      </Modal> */}
      <MiniCardProgram
        key={"id"}
        programId={"id"}
        departure={"departure"}
        arrival={"arrival"}
        distance={"12"}
        duration={"2"}
        description={"description"}
      />
    </div>
  );
}

export default Home;
