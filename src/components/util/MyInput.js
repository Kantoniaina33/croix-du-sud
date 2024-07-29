import { TextField, InputAdornment } from '@mui/material';
import AlternateEmailTwoToneIcon from '@mui/icons-material/AlternateEmailTwoTone';

import { AccountCircle } from '@mui/icons-material'; 
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
        variant="standard"
        onChange={onChange}
        required={required}
        // InputProps={{
        //   startAdornment: (
        //     <InputAdornment position="start">
        //       <AlternateEmailTwoToneIcon />
        //     </InputAdornment>
        //   ),
        // }}
      />
    );
}
