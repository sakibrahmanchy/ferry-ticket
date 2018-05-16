import {
    PASSENGER_NAME_CHANGED,
    PASSENGER_PASSPORT_NUMBER_CHANGED,
    PASSENGER_BIRTHDATE_CHANGED,
    PASSENGER_PASSPORT_EXPIRY_DATE_CHANGED,
    PASSENGER_GENDER_CHANGED,
    PASSENGER_NATIONALITY_CHANGED,
    PASSENGER_TYPE_CHANGED
} from './types';

export const changePassengerName = (name) => {
    return (dispatch) => {
        dispatch({ type: PASSENGER_NAME_CHANGED, payload: name });
    };
};

export const changePassengerPassportNumber = (passportNumber) => {
    return (dispatch) => {
        dispatch({ type: PASSENGER_PASSPORT_NUMBER_CHANGED, payload: passportNumber });
    };
};

export const changePassengerBirthDate = (birthDate) => {
    return (dispatch) => {
        dispatch({ type: PASSENGER_BIRTHDATE_CHANGED, payload: birthDate });
    };
};

export const changePassengePassportExpiryDate = (expiryDate) => {
    console.log(expiryDate);
    return (dispatch) => {
        dispatch({ type: PASSENGER_PASSPORT_EXPIRY_DATE_CHANGED, payload: expiryDate });
    };
};

export const changePassengerGender = (gender) => {
    return (dispatch) => {
        dispatch({ type: PASSENGER_GENDER_CHANGED, payload: gender });
    };
};

export const changePassengerNationality = (nationality) => {
    return (dispatch) => {
        dispatch({ type: PASSENGER_NATIONALITY_CHANGED, payload: nationality });
    };
};

export const changePassengerType = (type) => {
    return (dispatch) => {
        dispatch({ type: PASSENGER_TYPE_CHANGED, payload: type });
    };
};
