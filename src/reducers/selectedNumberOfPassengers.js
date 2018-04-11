import {
    NUMBER_OF_PASSENGERS_SELECTED
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case NUMBER_OF_PASSENGERS_SELECTED:
            return action.payload;
        default:
            return state;
    }
};

