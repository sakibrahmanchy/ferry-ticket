import { Actions } from 'react-native-router-flux';
import {
    DONE_BUTTON_CLICKED
} from '../actions/types';

export const doneButtonClicked = () => {
    Actions.ticketSearch();
    return {
        type: DONE_BUTTON_CLICKED,
    };
};
