import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import {
    PORT_FETCH_SUCCESS,
    DEPARTURE_PORT_SELECTED,
    DESTINATION_PORT_SELECTED,
    DEPARTURE_DATE_SELECTED,
    RETURN_DATE_SELECTED
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
        dispatch({ type: DESTINATION_PORT_SELECTED, payload: port });
        Actions.pop();
    };
};


export const selectDestination = (port) => {
    return (dispatch) => {
        dispatch({ type: DEPARTURE_PORT_SELECTED, payload: port });
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

