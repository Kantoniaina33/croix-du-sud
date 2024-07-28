import React, { useState } from "react";
import MyInput from "../../util/MyInput";
import "./style.css";
import { Container, Button } from "@mui/material";
import MyHeader from "../../util/MyHeader";
import { useNavigate } from "react-router-dom";

export default function LoginComponent(props) {
  const { url } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("loogggg");
    const response = await fetch(`${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      navigate("/home");
    } else {
      // Gérez les erreurs de connexion ici
    }
  };

  const buttonStyle = {
    background: "linear-gradient(to right, #e8cbc0, #636fa4)",
  };

  return (
    <div>
      <MyHeader />
      <Container maxWidth="sm" className="cont">
        <div id="back">
          <div id="login">
            <p className="title">CONNEXION</p>
            <form onSubmit={handleLogin}>
              <div className="input">
                <MyInput
                  id="email"
                  label="Adresse email"
                  type="text"
                  width="250px"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Correction ici
                />
              </div>
              <div className="input">
                <MyInput
                  id="password"
                  label="Mot de passe"
                  type="password"
                  width="250px"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Correction ici
                />
              </div>
              <div id="button">
                <Button
                  variant="contained"
                  sx={{ width: "250px" }}
                  style={buttonStyle}
                  type="submit"
                >
                  Se connecter
                </Button>
              </div>
            </form>
            <br />
            <div>
              <a href="/signup" style={{ color: "grey" }}>
                Ouvrir un compte
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
