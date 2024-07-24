import { Card, Container, TextField } from '@mui/material';
import React from 'react';
import MyInput from '../../util/MyInput';
import MyButton from '../../util/MyButton';
import "./style.css";


export default function SignupComponent(){
    return (
        <div>
            <Container maxWidth="sm" className='cont'>
            <Card id='signup' variant="outlined">
                <h3>INSCRIPTION</h3>
                <div className='input'>
                    <MyInput
                        id="nom"
                        label="Nom"
                        type="text"
                        width="250px"
                    />
                </div>
                <div className='input'>
                    <MyInput
                        id="email"
                        label="Adresse email"
                        type="email"
                        width="250px"
                    />
                </div>
                <div className='input'>
                    <MyInput
                        id="telephone"
                        label="Telephone"
                        type="number"
                        width="250px"
                    />
                </div>
                <div className='input'>
                    <TextField
                        id="description"
                        label="Description"
                        multiline
                        rows={2}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{width: 250}}
                        // onChange={onChange}
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
                            label="S'inscrire"
                        />
                    </div>
                {/* <div id='foot'>
                    <a href='#'>Se connecter</a>
                </div> */}
            </Card>
        </Container>
        </div>
    );
}


