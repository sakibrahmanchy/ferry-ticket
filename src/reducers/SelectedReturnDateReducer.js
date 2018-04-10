import {
    RETURN_DATE_SELECTED
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RETURN_DATE_SELECTED:
            return action.payload;
        default:
            return state;
    }
};

