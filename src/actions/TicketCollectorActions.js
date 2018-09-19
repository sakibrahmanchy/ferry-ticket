import {    
    TICKET_COLLECTOR_EMAIL_CHANGED,
    TICKET_COLLECTOR_PHONE_CHANGED
} from './types';


export const onChangeTicketCollectorEmail = (email) => {
    return (dispatch) => {
        dispatch({ type: TICKET_COLLECTOR_EMAIL_CHANGED, payload: email });
    };
}


export const onChangeTicketCollectorPhone = (phone) => {
    return (dispatch) => {
        dispatch({ type: TICKET_COLLECTOR_PHONE_CHANGED, payload: phone });
    };
}
