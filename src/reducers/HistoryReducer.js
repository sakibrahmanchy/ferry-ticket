import {
    HISTORY_FETCH_SUCCESS,
    TICKET_LIST_FETCH_SUCCESS,
    TICKET_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
   historyList: null,
   ticketList: null,
   ticket: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case HISTORY_FETCH_SUCCESS:
            return { ...state, historyList: action.payload };  
        case TICKET_LIST_FETCH_SUCCESS:
            console.log(action.payload);
            return { ...state, ticketList: action.payload }; 
        case TICKET_FETCH_SUCCESS:
            console.log(action.payload);
            return { ...state, ticket: action.payload }; 
        default:
            return state;
    }
};
