import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createMessage, fetchMessages} from "../../store/actions/messagesActions";
import {Button, Grid} from "@mui/material";
import Spinner from "../../components/UI/Spinner/Spinner";
import Message from "../../components/Message/Message";

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

    const onSubmitHandler = async e => {
        e.preventDefault();
        await dispatch(createMessage(message));

    };

    return (
        <>
            <Grid container direction="column" spacing={2}>
                {loading
                    ? <Spinner/>
                    : <Grid item container spacing={3}>
                        {globalStateMessages.map(m => (
                            <Message
                                key={m.id}
                                author={m.author}
                                message={m.message}
                            />
                        ))}
                    </Grid>
                }
            </Grid>
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
        </>
    );
};

export default Messages;