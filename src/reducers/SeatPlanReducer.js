import {
    DEPARTURE_SEAT_SELECTED,
    RETURN_SEAT_SELECTED,
    DEPARTURE_SEAT_GRID_SELECTED,
    RETURN_SEAT_GRID_SELECTED,
    DEPARTURE_SEAT_REMOVED,
    RETURN_SEAT_REMOVED
} from '../actions/types';

const INITIAL_STATE = {
    departureSeatRows: [],
    departureSeatColumns: [],
    returnSeatRows: [],
    returnSeatColumns: [],
    departureSeatGrid: null,
    returnSeatGrid: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DEPARTURE_SEAT_SELECTED:
            return {
                ...state,
                departureSeatRows: [...state.departureSeatRows, action.payload.row],
                departureSeatColumns: [...state.departureSeatColumns, action.payload.column]
            };
        case RETURN_SEAT_SELECTED:
            return {
                ...state,
                returnSeatRows: [...state.returnSeatRows, action.payload.row],
                returnSeatColumns: [...state.returnSeatColumns, action.payload.column],
            };
        case DEPARTURE_SEAT_REMOVED:
            return {
                ...state,
                departureSeatRows: [...state.departureSeatRows.slice(0, action.payload),
                ...state.departureSeatRows.slice(action.payload + 1)
                ],
                departureSeatColumns: [...state.departureSeatColumns.slice(0, action.payload),
                ...state.departureSeatColumns.slice(action.payload + 1)
                ]
            };
        case RETURN_SEAT_REMOVED:
            return {
                ...state,
                returnSeatRows: [...state.returnSeatRows.slice(0, action.payload),
                ...state.returnSeatRows.slice(action.payload + 1)
                ],
                returnSeatColumns: [...state.returnSeatColumns.slice(0, action.payload),
                ...state.returnSeatColumns.slice(action.payload + 1)
                ]
            };
        case DEPARTURE_SEAT_GRID_SELECTED:
            return { ...state, departureSeatGrid: action.payload };
        case RETURN_SEAT_GRID_SELECTED:
            return { ...state, returnSeatGrid: action.payload };
        default:
            return state;
    }
};
