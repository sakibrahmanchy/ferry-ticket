
import {
    CUSTOMER_NAME_CHANGED,
    CARD_NUMBER_CHANGED,
    EXPIRE_DATE_CHANGED,
    CV_CODE_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
    name: '',
    cardNumber: '',
    expireDate: '',
    cvCode: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CUSTOMER_NAME_CHANGED:
            return { ...state, name: action.payload };  
        case CARD_NUMBER_CHANGED:
            return { ...state, cardNumber: action.payload };
        case EXPIRE_DATE_CHANGED:
            return { ...state, expireDate: action.payload };
        case CV_CODE_CHANGED:
            return { ...state, cvCode: action.payload };
        default:
            return state;
    }
};
