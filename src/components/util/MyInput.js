import { TextField } from '@mui/material';
import React from 'react';

export default function MyInput(props){
    const {id,label,type,placeholder,width,onChange,required} = props
    return (
      <TextField
        id={id}
        label={label}
        type={type}
        size="small"
        placeholder={placeholder}
        sx={{
          width: width,
          height: "40px", 
          "& .MuiInputBase-root": {
            height: "100%",
          },
        }}
        onChange={onChange}
        required={required}
      />
    );
}
