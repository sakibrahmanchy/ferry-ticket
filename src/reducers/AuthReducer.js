import { 
    USER_NAME_CHANGED,
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    PASSWORD_CONFIRMATION_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    REGISTER_USER,
    REGISTER_USER_FAIL,
    REGISTER_USER_SUCCESS,
    LOGOUT
} from '../actions/types';
import { AsyncStorage } from 'react-native';

const INITIAL_STATE = {
    name: '',
    email: '', 
    password: '',
    password_confirmation: '',
    token: null,
    error: '',
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_NAME_CHANGED:
        return { ...state, name: action.payload };
        case EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case PASSWORD_CONFIRMATION_CHANGED:
             return { ...state, password_confirmation: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case LOGIN_USER:
            return { ...state, loading: true, error: '' };
        case LOGIN_USER_SUCCESS:
        if (action.payload.token) {
            AsyncStorage.setItem('token', action.payload.token);
            AsyncStorage.setItem('name', action.payload.name);
            AsyncStorage.setItem('email', action.payload.email);
        }
            return { 
                ...state, 
                ...INITIAL_STATE,
                name: action.payload.name,
                email: action.payload.email,
                token: action.payload.token
            };
        case LOGIN_USER_FAIL:
            return { ...state, error: action.payload, password: '', loading: false };
        case REGISTER_USER:
            return { ...state, loading: true, error: '' };
        case REGISTER_USER_SUCCESS: 
            return { 
                ...state, 
                ...INITIAL_STATE
            };
        case REGISTER_USER_FAIL: 
            return { ...state, error: action.payload, password: '', password_confirmation: '', loading: false };
        case LOGOUT:
            AsyncStorage.clear();
            return { 
                ...state, 
                ...INITIAL_STATE
            };  
        default:
            return state;
    }
};
