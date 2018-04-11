import {
    TRIP_TYPE_SELECTED
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TRIP_TYPE_SELECTED:
            return action.payload;
        default:
            return state;
    }
};

