import { 
    DEPARTURE_TRIP_SELECTED,
    RETURN_TRIP_SELECTED
} from '../actions/types';

const INITIAL_STATE = {
    departureTrip: null, 
    returnTrip: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DEPARTURE_TRIP_SELECTED:
            return { ...state, departureTrip: action.payload };
        case RETURN_TRIP_SELECTED:
            return { ...state, returnTrip: action.payload };
        default:
            return state;
    }
};
