import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import AppIntro from './components/AppIntroduction';
import TicketSearch from './components/TicketSearch';
import AutoCompleteListView from './components/AutoCompleteListView';
import SlideDemo from './components/AvailableTrips';

const RouterComponent = () => {
    return (
        <Router>
            <Scene key="appIntro">
                <Scene key="appIntroduction" component={AppIntro} hideNavBar  />
                <Scene 
                    key="ticketSearch" 
                    component={TicketSearch} 
                    title="Search Tickets" 
                    navTransparent
                    hideNavBar
                    titleStyle={{ color: 'white', fontSize: 18 }}
                    
                />
                <Scene
                    key="autoCompleteListView" 
                    component={AutoCompleteListView} 
                />
                <Scene
                    key="avialableTrips"
                    component={SlideDemo}
                    initial
                />
            </Scene>
        </Router>
    );
};

export default RouterComponent;
