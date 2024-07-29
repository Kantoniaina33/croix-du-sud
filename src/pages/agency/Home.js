import LoginComponent from "../../components/agency/Login/LoginComponent";
import MyHeader from "../../components/util/MyHeader";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div>
      <MyHeader />
      <div>Hello</div>
      <div>
        <button onClick={handleLogout} style={{ color: "grey" }}>
          Deconnexion
        </button>
      </div>
    </div>
  );
}
export default Login;
