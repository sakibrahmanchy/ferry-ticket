import {
    DESTINATION_PORT_SELECTED
} from '../actions/types';

const INITIAL_STATE = '';

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DESTINATION_PORT_SELECTED:
            return action.payload;
        default:
            return state;
    }
};

