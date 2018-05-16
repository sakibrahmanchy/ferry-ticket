import {
    GET_PASSENGER_INFO
} from '../actions/types';

const INITIAL_STATE = {
    tripInfo: null, 
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_PASSENGER_INFO:
            return { ...state, tripInfo: action.payload };
        default:
            return state;
    }
};
