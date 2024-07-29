import React, { useState } from "react";
import MyInput from "../../util/MyInput";
import "./style.css";
import { Container, Button } from "@mui/material";
import MyHeader from "../../util/MyHeader";
import { useNavigate } from "react-router-dom";

export default function LoginComponent(props) {
  const { urlLogin, home } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(`${urlLogin}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setMessage("Email ou mot de passe invalide");
        } else {
          setMessage("Login failed");
        }
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      navigate(`/${home}`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const buttonStyle = {
    background: "linear-gradient(to right, #e8cbc0, #636fa4)",
    height:'40px'
  };

  return (
    <div>
      <MyHeader />
      <Container maxWidth="sm" className="cont">
        <div id="back">
          <div id="login">
            <p className="title">CONNEXION</p>
            {message && <span className="error">{message}</span>}
            <form onSubmit={handleLogin}>
              <div className="input">
                <MyInput
                  id="email"
                  label="Adresse email"
                  type="text"
                  width="250px"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required={true}
                />
              </div>
              <div className="input">
                <MyInput
                  id="password"
                  label="Mot de passe"
                  type="password"
                  width="250px"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required={true}
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
