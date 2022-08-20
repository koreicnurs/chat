import axiosApi from "../../axiosApi";

export const FETCH_MESSAGES_REQUEST = 'FETCH_MESSAGES_REQUEST';
export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';
export const FETCH_MESSAGES_FAILURE = 'FETCH_MESSAGES_FAILURE';

export const CREATE_MESSAGE_REQUEST = 'CREATE_MESSAGE_REQUEST';
export const CREATE_MESSAGE_SUCCESS = 'CREATE_MESSAGE_SUCCESS';
export const CREATE_MESSAGE_FAILURE = 'CREATE_MESSAGE_FAILURE';

const fetchMessagesRequest = () => ({type: FETCH_MESSAGES_REQUEST});
const fetchMessagesSuccess = (messages, date) => ({type: FETCH_MESSAGES_SUCCESS, payload: {messages, date}});
const fetchMessagesFailure = error => ({type: FETCH_MESSAGES_FAILURE, payload: error});

const createMessageRequest = () => ({type: CREATE_MESSAGE_REQUEST});
const createMessageSuccess = () => ({type: CREATE_MESSAGE_SUCCESS});
const createMessageFailure = error => ({type: CREATE_MESSAGE_FAILURE, payload: error});

export const fetchMessages = (datetime) => {
    return async dispatch => {
        try {
            dispatch(fetchMessagesRequest());
            const response = await axiosApi(datetime === null ? '/messages' : `/messages?datetime=${datetime}`);
            if(datetime !== null) {
                let lastDatetime = response.data[response.data.length - 1].datetime;
                dispatch(fetchMessagesSuccess(response.data, lastDatetime));
            }
            dispatch(fetchMessagesSuccess(response.data, datetime));

        } catch (e) {
            dispatch(fetchMessagesFailure(e.message));
            throw e
        }
    }
};


export const createMessage = (messageData) => {
    return async dispatch => {
        try {
            dispatch(createMessageRequest());
            await axiosApi.post('/messages', messageData);
            dispatch(createMessageSuccess);
            // dispatch(createMessageSuccess(response.data));
        } catch (e) {
            dispatch(createMessageFailure(e.message));
            throw e;
        }
    }
};