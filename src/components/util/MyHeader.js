import { Button } from '@mui/material';
import React from 'react';

export default function MyHeader(props){
    const {label,width,onClick} = props
    return (
        <Button 
            variant="contained"
            sx={{width:width}}
            onClick={onClick}
        >
            {label}
        </Button>
    );
}