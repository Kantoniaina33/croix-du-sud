import { useState } from "react";
import Testmap from "../../components/geo/testmap";
import TrMealPlanning from "../../components/meal/trMealPlanning";
import { Coffee02Icon } from "hugeicons-react";
import ListExcursionToAdd from "../../components/excursion/listExcursionToAdd";
import TrExcursionPlanning from "../../components/excursion/trExcursionPlanning";

function Home() {
  return (
    <div className="card card-plain mt-1">
      {/* <TrMealPlanning icon={Coffee02Icon} meal={"Meal"} price={1000} /> */}
      <TrExcursionPlanning
        place_name={"excursion.place_name"}
        price={"excursion.price"}
      />
    </div>
  );
}

export default Home;
