import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createMessage, fetchMessages} from "../../store/actions/messagesActions";
import {Button} from "@mui/material";

const Messages = () => {
    const dispatch = useDispatch();
    const globalStateMessages = useSelector(state => state.messagesCombine.messages);
    const loading = useSelector(state => state.messagesCombine.loading);

    const [message, setMessage] = useState({
        author: '',
        message: '',
    });

    useEffect(() => {
        dispatch(fetchMessages());
    }, [dispatch]);


    const onInputChange = (e) => {
        const {name, value} = e.target;

        setMessage(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        dispatch(createMessage(message));
    };

    return (
        <form onSubmit={onSubmitHandler}>
            <input
                type="text"
                className="Input"
                name="author"
                value={message.author}
                onChange={onInputChange}
                placeholder="Your Name"
            />
            <input
                type="text"
                className="Input"
                name="message"
                value={message.message}
                onChange={onInputChange}
                placeholder="Your message"
            />
            <Button variant='outlined' type='submit'>Create</Button>
        </form>
    );
};

export default Messages;