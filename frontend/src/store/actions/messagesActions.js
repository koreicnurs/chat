import axiosApi from "../../axiosApi";

export const FETCH_MESSAGES_REQUEST = 'FETCH_MESSAGES_REQUEST';
export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';
export const FETCH_MESSAGES_FAILURE = 'FETCH_MESSAGES_FAILURE';

export const CREATE_MESSAGE_REQUEST = 'CREATE_MESSAGE_REQUEST';
export const CREATE_MESSAGE_SUCCESS = 'CREATE_MESSAGE_SUCCESS';
export const ERROR = 'ERROR';

const fetchMessagesRequest = () => ({type: FETCH_MESSAGES_REQUEST});
const fetchMessagesSuccess = (messages, date) => ({type: FETCH_MESSAGES_SUCCESS, payload: {messages, date}});
const fetchMessagesFailure = error => ({type: FETCH_MESSAGES_FAILURE, payload: error.response});

const createMessageRequest = () => ({type: CREATE_MESSAGE_REQUEST});
const createMessageSuccess = () => ({type: CREATE_MESSAGE_SUCCESS});

export const fetchMessages = (datetime) => {
    return async dispatch => {
        try {
            dispatch(fetchMessagesRequest());
            const {data} = await axiosApi(datetime === null ? '/messages' : `/messages?datetime=${datetime}`);
            const lastDatetime = data.length !== 0 ? data[data.length - 1].datetime : datetime;
            dispatch(fetchMessagesSuccess(data, lastDatetime));
        } catch (e) {
            dispatch(fetchMessagesFailure(e.message));
            throw e;
        }
    }
};

export const createMessage = (messageData) => {
    return async dispatch => {
        try {
            dispatch(createMessageRequest());
            await axiosApi.post('/messages', messageData);
            dispatch(createMessageSuccess);
        } catch (e) {
            dispatch({type: ERROR, payload: e.response.data.error});
            throw e;
        }
    }
};