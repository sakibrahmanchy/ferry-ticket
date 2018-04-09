import {
    DONE_BUTTON_CLICKED
} from '../actions/types';

const INITIAL_STATE = { finished: false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DONE_BUTTON_CLICKED:
            return { ...state, finished: true };
        default:
            return state;
    }
};
