import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createMessage, fetchMessages} from "../../store/actions/messagesActions";
import {Button, Grid} from "@mui/material";
import Spinner from "../../components/UI/Spinner/Spinner";
import Message from "../../components/Message/Message";
import Error from "../../components/Error/Error";

const Messages = () => {
    const dispatch = useDispatch();
    const globalStateMessages = useSelector(state => state.messagesCombine.messages);
    const datetime = useSelector(state => state.messagesCombine.datetime);
    const error = useSelector(state => state.messagesCombine.error);
    const loading = useSelector(state => state.messagesCombine.loading);


    const [message, setMessage] = useState({
        author: '',
        message: '',
    });

    useEffect(() => {
        console.log(error);
        setInterval( async () => {
            await dispatch(fetchMessages(datetime));
        }, 6000);
    }, [dispatch, error]);


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

    return globalStateMessages && (
        <>
            <Grid container direction="column" spacing={2}>
                <Grid item container spacing={3}>
                        {globalStateMessages.map(m => (
                            <Message
                                key={m.id}
                                author={m.author}
                                message={m.message}
                            />
                        ))}
                    </Grid>

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
                {error ? <p></p> : null}
                <Button variant='outlined' type='submit'>Create</Button>
            </form>
            {error ? (<Error error={error}/>) : (<Error error={null}/>)}
        </>
    );
};

export default Messages;