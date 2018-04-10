import {
    DEPARTURE_DATE_SELECTED
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DEPARTURE_DATE_SELECTED:
            console.log(action.payload);
            return action.payload;
        default:
            return state;
    }
};

