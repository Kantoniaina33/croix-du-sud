import { TextField } from '@mui/material';
import React from 'react';

export default function MyInput(props){
    const {id,label,type,placeholder,width,onChange} = props
    return (
        <TextField
          id={id}
          label={label}
          type={type}
          size='small'
          // InputLabelProps={{
          //   shrink: true,
          // }}
          placeholder={placeholder}
          sx={{width: width}}
          onChange={onChange}
        />
    );
}
