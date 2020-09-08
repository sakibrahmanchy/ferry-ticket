import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import {
    HISTORY_FETCH_SUCCESS,
    TICKET_LIST_FETCH_SUCCESS,
    TICKET_FETCH_SUCCESS
} from './types';
import { BASE_API } from '../api';

export const fetchHistory = (tripType, authToken) => {
    
    const url = `${BASE_API}/passenger/trips/${tripType}` ;

    return (dispatch) => {
        axios.get(url, { headers: { Authorization: authToken } })
            .then((response) => {
                dispatch({ type: HISTORY_FETCH_SUCCESS, payload: response.data });
            }).catch((err) => {
                console.log(err.response);
            });
    };
};

export const fetchTicketList = (orderId, tripId, authToken) => {

    const url = `${BASE_API}/order/passengers/${orderId}${tripId}`;

    return (dispatch) => {
        axios.get(url, { headers: { Authorization: authToken } })
        .then((response) => {
            dispatch({ type: TICKET_LIST_FETCH_SUCCESS, payload: response.data });
        }).catch((err) => {
            console.log(err.response);
        });
    };
};

export const fetchTicket = (ticketId, authToken) => {

    const url = `${BASE_API}/trip/details/${ticketId}`;

    return (dispatch) => {
        axios.get(url, { headers: { Authorization: authToken } })
        .then((response) => {
            dispatch({ type: TICKET_FETCH_SUCCESS, payload: response.data });
        }).catch((err) => {
            console.log(err.response);
        });
    };
};
