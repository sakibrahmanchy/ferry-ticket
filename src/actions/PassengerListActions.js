import axios from 'axios';
import {
    ADD_NEW_PASSENGER,
    TICKET_COLLECTOR_EMAIL_CHANGED,
    TICKET_COLLECTOR_PHONE_CHANGED
} from './types';


export const addNewPassenger = (passenger) => {
    return (dispatch) => {
        dispatch({ type: ADD_NEW_PASSENGER, payload: passenger });
    };
};


