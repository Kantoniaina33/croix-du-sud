import React from 'react';
import MyInput from '../../util/MyInput';
import MyButton from '../../util/MyButton';
import "./style.css";
import { Container } from '@mui/material';

export default function LoginComponent(){
    const buttonStyle = {
        background:'linear-gradient(to right, #e8cbc0, #636fa4)'
    };
    return (
        <Container maxWidth="sm" className='cont'>
            <div id='back'>
                <div id='login'>
                    <p className='title'>CONNEXION</p>
                    <div className='input'>
                        <MyInput
                            id="email"
                            label="Adresse email"
                            type="text"
                            placeholder="nom@exemple.com"
                            width="250px"
                        />
                    </div>
                    <div className='input'>
                        <MyInput
                            id="password"
                            label="Mot de passe"
                            type="password"
                            width="250px"
                        />
                    </div>
                        <div id='button'>
                            <MyButton
                                width="250px"
                                label="Se connecter"
                                style={buttonStyle}
                            />
                        </div>
                    {/* <div id='foot'>
                        <a href='#'>S'inscrire</a>
                    </div> */}
                </div>
            </div>
        </Container>
    );
}