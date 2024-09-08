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
import ProgramsCircuit from "../../components/circuit/programsCircuit";
import FormCustomer2 from "../../components/customer/formCustomer2";
import FormReservation2 from "../../components/reservation/formReservation2";
import FormProgram2 from "../../components/program/formProgram2";

function Home() {
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const handleCloseModal = () => setIsMapModalOpen(false);
  const handleShowMap = () => setIsMapModalOpen(false);

  return (
    <div className="card card-plain mt-1">
      <FormCustomer2/>
      
      {/* <ProgramsCircuit/> */}
    </div>
  );
}

export default Home;
