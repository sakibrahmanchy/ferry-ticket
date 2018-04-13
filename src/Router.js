import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import AppIntro from './components/AppIntroduction';
import TicketSearch from './components/TicketSearch';
import AutoCompleteListView from './components/AutoCompleteListView';
import SlideDemo from './components/AvailableTrips';

const RouterComponent = () => {
    return (
        <Router>
            <Scene 
                key="appIntro"
                duration={0}
            >
                <Scene key="appIntroduction" component={AppIntro} hideNavBar  />
                <Scene 
                    key="ticketSearch" 
                    component={TicketSearch} 
                    title="Search Tickets" 
                    navTransparent
                    hideNavBar
                    titleStyle={{ color: 'white', fontSize: 18 }}
                    initial
                    panHandlers={null}
                />
                <Scene
                    key="autoCompleteListView" 
                    component={AutoCompleteListView}
                    panHandlers={null} 
                />
                <Scene
                    key="avialableTrips"
                    component={SlideDemo}
                    hideNavBar
                    panHandlers={null}
                />
            </Scene>
        </Router>
    );
};

export default RouterComponent;
