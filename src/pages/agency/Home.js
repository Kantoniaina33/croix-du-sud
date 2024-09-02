import Aside from "../../components/template/aside";
import CardH from "../../components/test/cardH";
import CardProgram from "../../components/test/cardProgram";
import Form from "../../components/test/form";
import SelectCustomers from "../../components/util/selectCustomers";
import SelectRoles from "../../components/util/selectRoles";

function Home() {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <CardProgram
        title="NOSY BE - ANKARANA"
        price="50 000 Ar"
        duration="2 h"
        distance="20 Km"
        description="Ceci est une description de l'article. Ceci est une description de l'article.Ceci est une description de l'article. Ceci est une description de l'article.Ceci est une description de l'article."
      />
    </div>
  );
}
export default Home;
