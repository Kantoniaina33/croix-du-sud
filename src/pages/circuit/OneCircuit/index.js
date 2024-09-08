import React, { useState, useEffect } from "react";
import TrCircuit from "../../../components/circuit/trCircuit";
import "../../../assets/css/soft-ui-dashboard.min.css";
import "./style.css";
import Aside from "../../../components/template/aside";
import ProgramsCircuit from "../../../components/circuit/programsCircuit";
import ProgramsToAdd from "../../../components/program/programsToAdd";
import FormCircuit2 from "../../../components/circuit/formCircuit2";
import Modal from "../../../components/hotel/modal";
import { useParams } from "react-router-dom";

export default function OneCircuit() {
  const { id } = useParams();
  return (
    <div>
      <Aside />
      <main
        id="listCircuit"
        className="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
      >
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
          rel="stylesheet"
        />
        <nav
          className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
          id="navbarBlur"
          navbar-scroll="true"
        >
          <div className="container-fluid py-1 px-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                <li className="breadcrumb-item text-sm">
                  <span>Circuits</span>
                </li>
                <li
                  className="breadcrumb-item text-sm text-dark active"
                  aria-current="page"
                >
                  Liste
                </li>
              </ol>
              <h6 className="font-weight-bolder mb-0">Tables</h6>
            </nav>
            <div
              className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
              id="navbar"
            >
              <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                <div className="input-group">
                  <span className="input-group-text text-body">
                    <i className="fas fa-search" aria-hidden="true"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Rechercher un circuit..."
                  />
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <ProgramsCircuit circuitId={id} />
                <ProgramsToAdd circuitId={id} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
