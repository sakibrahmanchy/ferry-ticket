import { combineReducers } from 'redux';
import AppIntoductionReducer from './AppIntroductionReducer';
import PortReducer from './PortReducer';
import DeparturePortReducer from './selectedDeparturePortReducer';
import DestinationPortReducer from './selectedDestinationPortReducer';
import DepartureDateReducer from './SelectedDepartureDateReducer';
import ReturnDateReducer from './SelectedReturnDateReducer';
import PassengerReducer from './selectedNumberOfPassengers';
import TripTypeReducer from './selectedTripType';
import TripSearchReducer from './TripSearchReducer';

export default combineReducers({
    appIntroduction: AppIntoductionReducer,
    ports: PortReducer,
    selecteDeparturePort: DeparturePortReducer,
    selecteDestinationPort: DestinationPortReducer,
    selectedDepartureDate: DepartureDateReducer,
    selectedReturnDate: ReturnDateReducer,
    selectedNumberOfPassengers: PassengerReducer,
    selectedTripType: TripTypeReducer,
    tripSearchResult: TripSearchReducer
});

