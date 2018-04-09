import { combineReducers } from 'redux';
import AppIntoductionReducer from './AppIntroductionReducer';
import PortReducer from './PortReducer';
import DeparturePortReducer from './selectedDeparturePortReducer';
import DestinationPortReducer from './selectedDestinationPortReducer';

export default combineReducers({
    appIntroduction: AppIntoductionReducer,
    ports: PortReducer,
    selecteDeparturePort: DeparturePortReducer,
    selecteDestinationPort: DestinationPortReducer 
});

