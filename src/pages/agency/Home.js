import { useState } from "react";
import Testmap from "../../components/geo/testmap";
import TrMealPlanning from "../../components/meal/trMealPlanning";
import { Coffee02Icon } from "hugeicons-react";
import ListExcursionToAdd from "../../components/excursion/listExcursionToAdd";
import TrExcursionPlanning from "../../components/excursion/trExcursionPlanning";
import Return from "../../components/util/return";
import Aside from "../../components/template/aside";
import Header from "../../components/template/header";
import Aside2 from "../../components/template/aside copy";

function Home() {
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
        <Header
          pages="Prestataires"
          slash="Liste"
          searchPlaceholder="Rechercher un prestataire"
          search={"search"}
          setSearch={"setSearch"}
          buttonText="Nouveau prestataire"
          handleOnClick={"handleShowMap"}
        />
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4" style={{position:"inherit"}}>
                <Return />
                <>
                  <TrExcursionPlanning
                    place_name={"excursion.place_name"}
                    price={"excursion.price"}
                  />
                </>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
