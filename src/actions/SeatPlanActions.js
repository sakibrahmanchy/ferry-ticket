import {
    DEPARTURE_SEAT_SELECTED,
    RETURN_SEAT_SELECTED,
    DEPARTURE_SEAT_GRID_SELECTED,
    RETURN_SEAT_GRID_SELECTED,
    DEPARTURE_SEAT_REMOVED,
    RETURN_SEAT_REMOVED
} from './types';


export const selectDepartureSeatGrid = (gridId) => {
    return (dispatch) => {
        dispatch({ type: DEPARTURE_SEAT_GRID_SELECTED, payload: gridId });
    };
};

export const selectReturnSeatGrid = (gridId) => {
    return (dispatch) => {
        dispatch({ type: RETURN_SEAT_GRID_SELECTED, payload: gridId });
    };
};

export const selectDepartureSeat = (row, column) => {
    const seat = {
        row,
        column
    };
    return (dispatch) => {
        dispatch({ type: DEPARTURE_SEAT_SELECTED, payload: seat });
    };
};

export const selectReturnSeat = (row, column) => {
    const seat = {
        row,
        column
    };
    return (dispatch) => {
        dispatch({ type: RETURN_SEAT_SELECTED, payload: seat });
    };
};

export const removeDepartureSeat = (index) => {
    return (dispatch) => {
        dispatch({ type: DEPARTURE_SEAT_REMOVED, payload: index });
    };
};

export const removeReturnSeat = (index) => {
    return (dispatch) => {
        dispatch({ type: RETURN_SEAT_REMOVED, payload: index });
    };
};
