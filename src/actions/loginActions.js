import axios from 'axios';
import {
    USER_NAME_CHANGED,
    EMAIL_CHANGED, 
    PASSWORD_CHANGED,
    PASSWORD_CONFIRMATION_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    REGISTER_USER_FAIL,
    REGISTER_USER_SUCCESS,
    REGISTER_USER,
    LOGOUT
} from './types';

export const userNameChanged = (text) => {
    return {
        type: USER_NAME_CHANGED,
        payload: text
    };
};

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};


export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const confirmPasswordChanged = (text) => {
    return {
        type: PASSWORD_CONFIRMATION_CHANGED,
        payload: text
    };
};


export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });
        
        //Add code for user login
        axios.post('http://www.bvigrimscloud.com/ferry/public/api/login', {
            email,
            password 
        }).then((response) => {
          if (response.data.success) {
            console.log(response.data);
            loginUserSuccess(dispatch, response.data);
          } else {
            loginUserFail(dispatch);
          }
        }).catch((error) => {
            loginUserFail(dispatch, error.response.data.message);
        });
    };
};


export const logoutUser = () => {
    return (dispatch) => {
        dispatch({ type: LOGOUT });
    };
};

const loginUserSuccess = (dispatch, user) => {
    dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
    //Actions.ticketSearch();
};

const loginUserFail = (dispatch, error) => {
    dispatch({ type: LOGIN_USER_FAIL, payload: error });
};

export const registerUser = ({ name, email, password, password_confirmation }) => {
    return (dispatch) => {
        
        dispatch({ type: REGISTER_USER });
        
        //Add code for user login
        axios.post('http://www.bvigrimscloud.com/ferry/public/api/customer/add', {
            name,
            email,
            password,
            password_confirmation 
        }).then((response) => {
          if (response.data.success) {
            registerUserSuccess(dispatch);
          } else {
            registerUserFail(dispatch);
          }
        }).catch((error) => {
            registerUserFail(dispatch, error.response.data.message);
        });
    };
};

const registerUserSuccess = (dispatch) => {
    dispatch({ type: REGISTER_USER_SUCCESS });
    //Actions.ticketSearch();
};

const registerUserFail = (dispatch, error) => {
    dispatch({ type: REGISTER_USER_FAIL, payload: error });
};
