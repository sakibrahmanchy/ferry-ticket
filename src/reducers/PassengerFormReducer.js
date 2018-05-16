import { 
    PASSENGER_NAME_CHANGED,
    PASSENGER_PASSPORT_NUMBER_CHANGED,
    PASSENGER_BIRTHDATE_CHANGED,
    PASSENGER_PASSPORT_EXPIRY_DATE_CHANGED,
    PASSENGER_GENDER_CHANGED,
    PASSENGER_NATIONALITY_CHANGED,
    PASSENGER_TYPE_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
    name: '', 
    passsportNumber: '',
    birthDate: '',
    pasportExpiryDate: '',
    gender: '',
    nationality: '',
    type: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PASSENGER_NAME_CHANGED:
            return { ...state, name: action.payload };
        case PASSENGER_PASSPORT_NUMBER_CHANGED:
            return { ...state, passsportNumber: action.payload };
        case PASSENGER_BIRTHDATE_CHANGED:
            return { ...state, birthDate: action.payload };
        case PASSENGER_PASSPORT_EXPIRY_DATE_CHANGED:
            return { ...state, pasportExpiryDate: action.payload };
        case PASSENGER_GENDER_CHANGED:
            return { ...state, gender: action.payload };
        case PASSENGER_NATIONALITY_CHANGED:
            return { ...state, nationality: action.payload };
        case PASSENGER_TYPE_CHANGED:
            return { ...state, type: action.payload };
        default:
            return state;
    }
};
