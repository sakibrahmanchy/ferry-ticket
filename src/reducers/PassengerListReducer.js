import {
    ADD_NEW_PASSENGER
} from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_NEW_PASSENGER:
            return [...state, action.payload];
        default:
            return state;
    }
};
