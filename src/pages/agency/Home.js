import TrHotel from "../../components/hotel/trHotel";
import Aside from "../../components/template/aside";
import Main from "../../components/template/main";
import MyPagination from "../../components/util/myPagination";
function Home() {
  return (
    <div>
      <Aside />
      <MyPagination></MyPagination>
    </div>
  );
}
export default Home;
