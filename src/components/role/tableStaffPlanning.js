import { useEffect, useState } from "react";
import FormRolePlanning from "./formRolePlanning";
import TrRolePlanning from "./trRolePlanning";
import Modal from "../util/modal";
import { UserListIcon } from "hugeicons-react";

export default function TableStaffPlanning(props) {
  const { programId} = props;
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const handleCloseModal = () => setIsMapModalOpen(false);
  const handleShowForm = () => setIsMapModalOpen(true);
  const [programStaff, setProgramStaff] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchProgramStaff = async () => {
    setLoading(true);
    setMessage("");
    try {
      const url = `http://localhost:3030/programs/${programId}/staff`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        setMessage("Failed to fetch programStaff");
        return;
      }
      const data = await response.json();
      setProgramStaff(data);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching programStaff");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgramStaff();
    console.log(programStaff+ " jjjjjjjjjjjj");
    
  }, []);

  return (
    <div
      className="card-body px-0 pt-0 pb-2"
      style={{
        backgroundColor: "white",
        borderRadius: "10px",
        marginTop: "-2%",
      }}
    >
      <div className="card-header pb-0 d-flex justify-content-between align-items-center">
        <h6>
          <UserListIcon
            style={{ marginBottom: "0.5%" }}
            size={20}
            variant={"stroke"}
          />
          <span style={{ marginLeft: "1%" }}>PERSONNELS DE SERVICE</span>
        </h6>
        <div
          className="btn btn-outline-primary btn-sm mb-0 me-3"
          style={{ marginLeft: "3%" }}
        >
          <a onClick={handleShowForm}>Ajouter</a>
        </div>
        <Modal isOpen={isMapModalOpen}>
          <FormRolePlanning onCancel={handleCloseModal} programId={programId} />
        </Modal>
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
        ) : programStaff.length > 0 ? (
          <div className="table-responsive p-0">
            <table className="table align-items-center mb-0">
              <thead>
                <tr>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    Role
                  </th>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                    Nombre
                  </th>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                    Tarif
                  </th>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                    Total
                  </th>
                  <th className="text-secondary opacity-7"></th>
                  <th className="text-secondary opacity-7"></th>
                </tr>
              </thead>
              <tbody>
                {programStaff.map((programStaff) => (
                  <TrRolePlanning
                    roleId={programStaff.role.id}
                    roleName={programStaff.role.name}
                    number={programStaff.number}
                    price={programStaff.role.hourlyWage}
                    programId={programId}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ marginLeft: "2.5%", fontSize: "15px" }}>Aucun role.</p>
        )}
      </div>
    </div>
  );
}
