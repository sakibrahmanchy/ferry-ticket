import {
    CUSTOMER_NAME_CHANGED,
    CARD_NUMBER_CHANGED,
    EXPIRE_DATE_CHANGED,
    CV_CODE_CHANGED
} from './types';

export const changeCustomerName = (name) => {
    return (dispatch) => {
        dispatch({ type: CUSTOMER_NAME_CHANGED, payload: name });
    };
};

export const changeCardNumber = (cardNumber) => {
    return (dispatch) => {
        dispatch({ type: CARD_NUMBER_CHANGED, payload: cardNumber });
    };
};

export const changeExpireDate = (expireDate) => {
    return (dispatch) => {
        dispatch({ type: EXPIRE_DATE_CHANGED, payload: expireDate });
    };
};

export const changeCVCode = (cvCode) => {
    return (dispatch) => {
        dispatch({ type: CV_CODE_CHANGED, payload: cvCode });
    };
};
