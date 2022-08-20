import React from 'react';
import {Paper, Typography} from "@mui/material";

const Message = (props) => {
    return (
        <Paper elevation={3} square sx={{padding: "15px"}}>
            <Typography variant="h5">{props.author}</Typography>
            <Typography variant="body2">{props.message}</Typography>
        </Paper>
    );
};

export default Message;