import React from 'react';
import {Paper, Typography} from "@mui/material";
import './Message.css';

const Message = (props) => {
    return (
        <Paper className='box-message' elevation={3} square>
            <Typography variant="body2" className='text'><b>Author</b>: {props.author}</Typography>
            <Typography variant="body2" className='text'><b>Message</b>: {props.message}</Typography>
        </Paper>
    );
};

export default Message;