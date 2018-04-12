import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import {
    PORT_FETCH_SUCCESS,
    DEPARTURE_PORT_SELECTED,
    DESTINATION_PORT_SELECTED,
    DEPARTURE_DATE_SELECTED,
    RETURN_DATE_SELECTED,
    NUMBER_OF_PASSENGERS_SELECTED,
    TRIP_TYPE_SELECTED,
    AVAILABLE_TRIPS_FETCH_SUCCESS
} from './types';

export const portsFetch = (searchText) => {
    //console.log(searchText);
    const url = 'http://www.bvigrimscloud.com/ferry/public/api/port/all?port_name=' + searchText;

    return (dispatch) => {
        axios.get(url)
            .then((response) => {
                dispatch({ type: PORT_FETCH_SUCCESS, payload: response.data });
            });
    };
};

export const selectDeparture = (port) => {
    return (dispatch) => {
        dispatch({ type: DEPARTURE_PORT_SELECTED, payload: port });
        Actions.pop();
    };
};


export const selectDestination = (port) => {
    return (dispatch) => {
        dispatch({ type: DESTINATION_PORT_SELECTED, payload: port });
        Actions.pop();
    };
};

export const selectDeapartureDate = (date) => {
    return (dispatch) => {
        dispatch({ type: DEPARTURE_DATE_SELECTED, payload: date });
    };
};

export const selectReturnDate = (date) => {
    return (dispatch) => {
        dispatch({ type: RETURN_DATE_SELECTED, payload: date });
    };
};

export const selectNumberOfPassengers = (noOfPassengers) => {
    return (dispatch) => {
        dispatch({ type: NUMBER_OF_PASSENGERS_SELECTED, payload: noOfPassengers });
    };
};


export const selectTripType = (type) => {
    return (dispatch) => {
        dispatch({ type: TRIP_TYPE_SELECTED, payload: type });
    };
};


export const searchForTrips = (searchParams) => {
    let url = 'http://www.bvigrimscloud.com/ferry/public/api/trip/search';
    url = bindParamsToUrl(url, searchParams);
    return (dispatch) => {
        axios.get(url)
            .then((response) => {
                dispatch({ type: AVAILABLE_TRIPS_FETCH_SUCCESS, payload: response.data });
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

