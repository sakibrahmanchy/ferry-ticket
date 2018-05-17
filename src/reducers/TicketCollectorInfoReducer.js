import {
    TICKET_COLLECTOR_EMAIL_CHANGED,
    TICKET_COLLECTOR_PHONE_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
                        email:'',
                        phone: '' 
                      };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TICKET_COLLECTOR_EMAIL_CHANGED:
            return {...state, email: action.payload};
        case TICKET_COLLECTOR_PHONE_CHANGED:
            return {...state, phone: action.payload};
        default:
            return state;
    }
};
