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
import SelectedTrips from './selectedTripReducer';
import TripBookReducer from './TripBookReducer';
import PassengerFormReducer from './PassengerFormReducer';
import PassengerListReducer from './PassengerListReducer';
import TicketCollectorInfoReducer from './TicketCollectorInfoReducer';
import SeatPlanReducer from './SeatPlanReducer';
import PaymentFormReducer from './PaymentFormReducer';
import authReducer from './AuthReducer';
import historyReducer from './HistoryReducer';

export default combineReducers({
    appIntroduction: AppIntoductionReducer,
    ports: PortReducer,
    selecteDeparturePort: DeparturePortReducer,
    selecteDestinationPort: DestinationPortReducer,
    selectedDepartureDate: DepartureDateReducer,
    selectedReturnDate: ReturnDateReducer,
    selectedNumberOfPassengers: PassengerReducer,
    selectedTripType: TripTypeReducer,
    tripSearchResult: TripSearchReducer,
    selectedTrips: SelectedTrips,
    tripInfo: TripBookReducer,
    currentPassengerInfo: PassengerFormReducer,
    passengers: PassengerListReducer,
    ticketCollector: TicketCollectorInfoReducer,
    seatPlan: SeatPlanReducer,
    payment: PaymentFormReducer,
    auth: authReducer,
    history: historyReducer
});

