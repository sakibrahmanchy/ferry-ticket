import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import AppIntro from './components/AppIntroduction';
import TicketSearch from './components/TicketSearch';
import AutoCompleteListView from './components/AutoCompleteListView';
import AvailableTrips from './components/AvailableTrips';
import PassengerDetails from './components/PassengerDetail';
import PassengerForm from './components/PassengerForm';

const RouterComponent = () => {
    return (
        <Router>
            <Scene 
                key="appIntro"
                duration={0}
            >
                <Scene key="appIntroduction" component={AppIntro} hideNavBar />
                <Scene 
                    key="ticketSearch" 
                    component={TicketSearch} 
                    title="Search Tickets" 
                    navTransparent
                    hideNavBar
                    titleStyle={{ color: 'white', fontSize: 18 }}
                    panHandlers={null}
                    initial
                />
                <Scene
                    key="autoCompleteListView" 
                    component={AutoCompleteListView}
                    panHandlers={null} 
                />
                <Scene
                    key="avialableTrips"
                    component={AvailableTrips}
                    hideNavBar
                    panHandlers={null}
                />
                <Scene
                    key="passengerDetails"
                    component={PassengerDetails}
                    hideNavBar
                    panHandlers={null}
                />
                <Scene
                    key="passengerForm"
                    component={PassengerForm}
                    hideNavBar
                    panHandlers={null}
                />
            </Scene>
        </Router>
    );
};

export default RouterComponent;
