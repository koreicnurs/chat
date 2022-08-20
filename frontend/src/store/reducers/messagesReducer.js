import {
    CREATE_MESSAGE_FAILURE,
    CREATE_MESSAGE_REQUEST, CREATE_MESSAGE_SUCCESS,
    FETCH_MESSAGES_FAILURE,
    FETCH_MESSAGES_REQUEST,
    FETCH_MESSAGES_SUCCESS
} from "../actions/messagesActions";


const initialState = {
    messages: [],
    datetime: null,
    loading: false,
    error: null,
};

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MESSAGES_REQUEST:
            return {...state, loading: true};
        case FETCH_MESSAGES_SUCCESS:
            return {...state, loading: false, messages: action.payload.messages, datetime: action.payload.datetime};
        case FETCH_MESSAGES_FAILURE:
            return {...state, loading: false, error: action.payload};

        case CREATE_MESSAGE_REQUEST:
            return {...state, loading: true};
        case CREATE_MESSAGE_SUCCESS:
            return {...state, loading: false};
        case CREATE_MESSAGE_FAILURE:
            return {...state, loading: false, error: action.payload};

        default:
            return state;
    }
};

export default messagesReducer;