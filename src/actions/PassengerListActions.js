import axios from 'axios';
import {
    ADD_NEW_PASSENGER
} from './types';


export const addNewPassenger = (passenger) => {
    return (dispatch) => {
        dispatch({ type: ADD_NEW_PASSENGER, payload: passenger });
    };
};
