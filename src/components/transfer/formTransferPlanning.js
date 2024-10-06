import React, { useEffect } from "react";
import { Hotel01Icon } from "hugeicons-react";
import { useState } from "react";
import ListTransferToAdd from "./listTransferToAdd";

export default function FormTransferPlanning(props) {
  const { onCancel, programId } = props;

  const [transfers, setTransfers] = useState([]);
  const [transfersId, setTransfersId] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchTransfers = async () => {
    setLoading(true);
    setMessage("");
    try {
      const url = `http://localhost:3030/transfers`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        setMessage("Failed to fetch transfers");
        return;
      }
      const data = await response.json();
      setTransfers(data);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching transfers");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");
    
    try {
      const response = await fetch(
        `http://localhost:3030/programs/${programId}/transfers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ transfersId }),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          setMessage("Problem");
        } else {
          setMessage("Failed");
        }
        return;
      }
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchTransfers();
  }, []);

  return (
    <div className="card p-4 shadow-lg rounded-3" style={{ width: "50%" }}>
      <div
        className="card-header d-flex justify-content-between align-items-center"
        style={{ marginBottom: "1%", height: "50px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flex: 1,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            class="bi bi-tree"
            viewBox="0 0 16 16"
          >
            <path d="M8.416.223a.5.5 0 0 0-.832 0l-3 4.5A.5.5 0 0 0 5 5.5h.098L3.076 8.735A.5.5 0 0 0 3.5 9.5h.191l-1.638 3.276a.5.5 0 0 0 .447.724H7V16h2v-2.5h4.5a.5.5 0 0 0 .447-.724L12.31 9.5h.191a.5.5 0 0 0 .424-.765L10.902 5.5H11a.5.5 0 0 0 .416-.777zM6.437 4.758A.5.5 0 0 0 6 4.5h-.066L8 1.401 10.066 4.5H10a.5.5 0 0 0-.424.765L11.598 8.5H11.5a.5.5 0 0 0-.447.724L12.69 12.5H3.309l1.638-3.276A.5.5 0 0 0 4.5 8.5h-.098l2.022-3.235a.5.5 0 0 0 .013-.507" />
          </svg>
          <span
            style={{ marginLeft: "2%", fontSize: "25px", color: "#273385" }}
          >
            Transfert
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <button
            className="modal-close-button"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            onClick={onCancel}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-x-circle"
              viewBox="0 0 16 16"
              color="#273385"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          </button>
        </div>
      </div>
      <div className="card-body" style={{ marginBottom: "-3%" }}>
        {loading ? (
          <div
            className="spinner-border spinner-border-sm"
            role="status"
            style={{ marginLeft: "3%" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : transfers.length > 0 ? (
          <form
            id="myForm"
            autocomplete="off"
            style={{ marginTop: "-3%" }}
            onSubmit={handleSave}
          >
            <table className="table align-items-center mb-0">
              <tbody>
                {transfers.slice(0, 3).map((transfer) => (
                  <ListTransferToAdd
                    key={transfer.id}
                    transfer={transfer.departure + " - " + transfer.arrival}
                    price={transfer.price}
                    setTransfersId={setTransfersId}
                    transferId={transfer.id}
                  />
                ))}
              </tbody>
            </table>
            <br />
            <div className="d-flex justify-content-between align-items-center">
              <button
                type="button"
                className="btn"
                style={{
                  float: "right",
                  borderRadius: "20px",
                  marginTop: "1%",
                  border: "solid 1px rgb(231, 231, 231)",
                }}
                onClick={onCancel}
              >
                Annuler
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  float: "right",
                  borderRadius: "20px",
                  marginTop: "1%",
                }}
              >
                Valider
              </button>
            </div>
          </form>
        ) : (
          <div>Aucun tranfert.</div>
        )}
      </div>
    </div>
  );
}
