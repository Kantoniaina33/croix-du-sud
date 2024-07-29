import LoginComponent from "../../components/agency/Login/LoginComponent";

function Login(){
    return (
        <div>
            <LoginComponent
                urlLogin='http://localhost:3030/agency/login'
                home='Home'
            />
        </div>
    )
}
export default Login;

