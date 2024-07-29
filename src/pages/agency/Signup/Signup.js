import { Button, Container, TextField } from "@mui/material";
import React, { useState } from "react";
import MyInput from "../../../components/util/MyInput";
import MyButton from "../../../components/util/MyButton";
import MyHeader from "../../../components/util/MyHeader";
import "./style.css";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:3030/agency/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, description, password }),
      });

      if (!response.ok) {
          setMessage("Signup failed");
        return;
      }

      navigate('/Home');
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const buttonStyle = {
    background: "linear-gradient(to right, #e8cbc0, #636fa4)",
  };
  return (
    <div>
      <MyHeader />
      <Container maxWidth="sm" className="contS">
        <div id="back">
          <div id="signup" variant="outlined">
            <p className="title">INSCRIPTION</p>
            <form onSubmit={handleSignup}>
              <div className="inputS">
                <MyInput
                  id="name"
                  label="Nom"
                  type="text"
                  width="250px"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={true}
                />
              </div>
              <div className="inputS">
                <MyInput
                  id="email"
                  label="Adresse email"
                  type="email"
                  width="250px"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required={true}
                />
              </div>
              <div className="inputS">
                <MyInput
                  id="phone"
                  label="Telephone"
                  type="number"
                  width="250px"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required={true}
                />
              </div>
              <div className="inputS">
                <TextField
                  id="description"
                  label="Description"
                  multiline
                  rows={1}
                  sx={{ width: 250 }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required={false}
                />
              </div>
              <div className="inputS">
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
                  S'inscrire
                </Button>
              </div>
            </form>
            <br />
            <div>
              <a href="/" style={{ color: "grey" }}>
                Se connecter
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
