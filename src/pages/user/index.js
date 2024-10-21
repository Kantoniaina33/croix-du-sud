import { useState } from "react";
import Testmap from "../../components/geo/testmap";
import TrMealPlanning from "../../components/meal/trMealPlanning";
import { Coffee02Icon } from "hugeicons-react";
import ListExcursionToAdd from "../../components/excursion/listExcursionToAdd";
import TrExcursionPlanning from "../../components/excursion/trExcursionPlanning";
import Return from "../../components/util/return";
import Aside from "../../components/template/aside";
import Header from "../../components/template/header";
import FormUser from "../../components/user/formUser";

export default function NewUser() {
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
        <Header />
        <div className="container-fluid py-4">
          <div className="col-xl-4 col-lg-5 col-md-7 mx-auto">
            <div className="card z-index-0">
              <div className="card-header text-center pt-4"></div>
              <div className="row">
                <div className="col-12">
                  <div className="card mb-4" style={{ position: "inherit" }}>
                    <Return />
                    <FormUser />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
