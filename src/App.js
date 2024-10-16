import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/agency/Signup";
import InfoAgency from "./pages/agency/Signup/infoAgency";
import Login from "./pages/agency/Login";
import Home from "./pages/agency/Home";
import ListHotel from "./pages/hotel/ListHotel";
import ListRoom from "./pages/room/ListRoom";
import ListMeal from "./pages/meal/ListMeal";
import ListExcursion from "./pages/excursion/ListExcursion";
import ListProgram from "./pages/program/ListProgram";
import ListCircuit from "./pages/circuit/ListCircuit";
import ListRole from "./pages/role/ListRole";
import ListEmployee from "./pages/employee/ListEmployee";
import ListEmployeeByRole from "./pages/employee/ListEmployee/listEmployeeByRole";
import Register from "./pages/customer/Register";
import NewReservation from "./pages/reservation/NewReservation";
import OneCircuit from "./pages/circuit/OneCircuit";
import CircuitPrograms from "./pages/circuit/circuitPrograms";
import ProgramDetails from "./pages/program/ProgramDetails";
import GroupDetails from "./pages/reservation/NewReservation/groupDetails";
import TablePlanning from "./pages/program/PlanningProgram/tablePlanning";
import PlanningDetails from "./pages/program/PlanningProgram/planningDetails";
import ListCustomer from "./pages/customer/ListCustomer";
import ReservationCustomer from "./pages/reservation/ListReservation/reservationCustomer";
import SheetExcursionPage from "./pages/excursion/ListExcursion/sheetExcursionPage";
import SheetHotelPage from "./pages/hotel/ListHotel/sheetHotelPage";
import ChooseProgram from "./pages/circuit/OneCircuit/chooseProgram";
import ConfProgramCircuit from "./pages/circuit/OneCircuit/confProgramCircuit";
import ListProvider from "./pages/provider/ListProvider";
import ListOfferingType from "./pages/offering/ListOfferingType";
import ListOfferingOption from "./pages/offering/ListOfferingOption";
import SheetProvider from "./components/provider/sheetProvider";
import SheetProviderPage from "./pages/provider/ListProvider/sheetProviderPage";
import ListOffering from "./pages/provider/ListOffering";
import ListOfferingDetail from "./pages/offering/ListOfferingDetail";
import ListTransfer from "./pages/transfer/ListTransfer";
import ChooseCircuit from "./pages/reservation/NewReservation/chooseCircuit";
import ProgramDetailReservation from "./pages/program/ProgramDetails/programDetailReservation";
import NewUser from "./pages/user";

function App() {
  return (
    <Router>
      <div className="App">
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
          rel="stylesheet"
        />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/info" element={<InfoAgency />} />
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/providers" element={<ListProvider />} />
          <Route path="/offerings/types" element={<ListOfferingType />} />
          <Route
            path="/offerings/types/:typeId/options"
            element={<ListOfferingOption />}
          />
          <Route path="/transfers" element={<ListTransfer />} />
          <Route path="/hotels" element={<ListHotel />} />
          <Route path="/hotels/:id" element={<SheetHotelPage />} />
          <Route path="/providers/:id/offerings" element={<ListOffering />} />
          <Route
            path="/providers/:providerId/types/:offering_typeId/offerings/:offeringId/details"
            element={<ListOfferingDetail />}
          />
          <Route path="/providers/:id" element={<SheetProviderPage />} />
          <Route path="/hotels/:hotelId/rooms" element={<ListRoom />} />
          <Route path="/hotels/:hotelId/meals" element={<ListMeal />} />
          <Route path="/excursions" element={<ListExcursion />} />
          <Route path="/excursions/:id" element={<SheetExcursionPage />} />
          <Route path="/programs" element={<ListProgram />} />
          <Route
            path="customers/:id/reservations/:reservationId/planning"
            element={<TablePlanning />}
          />
          <Route
            path="customers/:id/reservation/circuit"
            element={<ChooseCircuit />}
          />
          <Route
            path="customers/:id/reservations/:reservationId/planning/:planningId/details"
            element={<PlanningDetails />}
          />
          <Route path="/circuits" element={<ListCircuit />} />
          <Route path="/roles" element={<ListRole />} />
          <Route
            path="/roles/:roleId/employees"
            element={<ListEmployeeByRole />}
          />
          <Route path="/employees" element={<ListEmployee />} />
          <Route path="/customers" element={<ListCustomer />} />
          <Route path="/customers/register" element={<Register />} />
          <Route
            path="/customers/:id/reservation/informations"
            element={<NewReservation />}
          />
          <Route
            path="/customers/:id/reservations"
            element={<ReservationCustomer />}
          />
          <Route
            path="/customers/:id/reservation/group_details"
            element={<GroupDetails />}
          />
          <Route path="/circuits/:id/programs" element={<CircuitPrograms />} />
          <Route
            path="/circuits/:id/programs/new"
            element={<ChooseProgram />}
          />
          <Route
            path="/circuits/:id/programs/configuration"
            element={<ConfProgramCircuit />}
          />
          <Route
            path="/circuits/:id/programs/all"
            element={<CircuitPrograms />}
          />
          <Route path="/programs/:programId" element={<ProgramDetails />} />
          <Route
            path="/reservations/:reservationId/programs/:programId/"
            element={<ProgramDetailReservation />}
          />
          <Route
            path="/users/new"
            element={<NewUser />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
