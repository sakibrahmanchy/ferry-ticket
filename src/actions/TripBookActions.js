import axios from 'axios';
import {
    GET_PASSENGER_INFO
} from './types';
import { BASE_API } from '../api';

export const getPassengerTicketInfo = (searchParams) => {
    let url = `${BASE_API}/booking/passenger-details`;
    url = bindParamsToUrl(url, searchParams);  
    return (dispatch) => {
        axios.get(url)
        .then((response) => {
            dispatch({ type: GET_PASSENGER_INFO, payload: response.data });
        });
    };
};

const bindParamsToUrl = (url, params) => {
    let urlToChange = url;
    urlToChange += '?';
    Object.keys(params).forEach((key) => {
        urlToChange += key;
        urlToChange += '=';
        urlToChange += params[key];
        urlToChange += '&';
    });
    return urlToChange;
};

