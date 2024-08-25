import "../../../assets/css/soft-ui-dashboard.min.css";
import "./style.css";
import Aside from "../../../components/template/aside";
import { Coffee02Icon, NoodlesIcon, SpoonAndKnifeIcon } from "hugeicons-react";
import TrMeal from "../../../components/meal/trMeal";
import HeadHotel from "../../../components/hotel/headHotel";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ListRoom() {
  const { hotelId } = useParams();
  const [meals, setMeals] = useState([]);
  const icons = [Coffee02Icon, SpoonAndKnifeIcon, NoodlesIcon];
  const [message, setMessage] = useState("");

  const fetchMeals = async () => {
    setMessage("");
    try {
      const response = await fetch(
        `http://localhost:3030/hotels/${hotelId}/meals`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        setMessage("Failed to fetch meals");
        return;
      }

      const data = await response.json();
      const mealsArray = Object.keys(data).map((key) => ({
        ...data[key],
      }));
      setMeals(mealsArray);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error fetching meals");
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);
  return (
    <div>
      <Aside></Aside>
      <main
        id="listHotel"
        className="main-content position-relative max-height-vh-100 h-100 border-radius-lg "
      >
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
          rel="stylesheet"
        />
        <nav className="navbar navbar-main navbar-expand-lg bg-transparent shadow-none position-absolute px-4 w-100 z-index-2">
          <div className="container-fluid py-1">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 ps-2 me-sm-6 me-5">
                <li className="breadcrumb-item text-sm">
                  <span style={{ color: "white" }}>Pages</span>
                </li>
                <li
                  className="font-weight-bold breadcrumb-item text-sm text-white active"
                  aria-current="page"
                >
                  Chambres
                </li>
              </ol>
            </nav>
            <div
              className="collapse navbar-collapse me-md-0 me-sm-4 mt-sm-0 mt-2"
              id="navbar"
            ></div>
          </div>
        </nav>
        <div className="container-fluid">
          <div
            className="page-header border-radius-xl mt-4"
            style={{ minHeight: "150px" }}
          >
            <span className="mask opacity-6" id="background"></span>
          </div>
          <HeadHotel />
        </div>
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-0">
                  <h6>Tarif repas</h6>
                </div>
                <div className="card-body px-0 pt-0 pb-2">
                  <div className="table-responsive p-0">
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-secondary opacity-7"></th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Repas
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Prix
                          </th>
                          <th className="text-secondary opacity-7"></th>
                        </tr>
                      </thead>
                      {meals.map((meal, index) => (
                        <TrMeal
                          id={meal.id}
                          icon={icons[index % icons.length]}
                          meal={meal.meal}
                          price={meal.price}
                        />
                      ))}
                    </table>
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
