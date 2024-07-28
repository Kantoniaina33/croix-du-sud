import { Container, TextField } from "@mui/material";
import React from "react";
import MyInput from "../../util/MyInput";
import MyButton from "../../util/MyButton";
import "./style.css";
import MyHeader from "../../util/MyHeader";

export default function SignupComponent() {
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
            <div className="inputS">
              <MyInput id="nom" label="Nom" type="text" width="250px" />
            </div>
            <div className="inputS">
              <MyInput
                id="email"
                label="Adresse email"
                type="email"
                width="250px"
              />
            </div>
            <div className="inputS">
              <MyInput
                id="telephone"
                label="Telephone"
                type="number"
                width="250px"
              />
            </div>
            <div className="inputS">
              <TextField
                id="description"
                label="Description"
                multiline
                rows={1}
                sx={{ width: 250 }}
                // onChange={onChange}
              />
            </div>
            <div className="inputS">
              <MyInput
                id="password"
                label="Mot de passe"
                type="password"
                width="250px"
              />
            </div>
            <div id="button">
              <MyButton width="250px" label="S'inscrire" style={buttonStyle} />
            </div>
            <br/>
            <div>
              <a href="#" style={{ color: "grey" }}>
                Se connecter
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
