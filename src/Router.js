import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import AppIntro from './components/AppIntroduction';
import TicketSearch from './components/TicketSearch';
import AutoCompleteListView from './components/AutoCompleteListView';

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
                    initial
                />
                <Scene
                    key="autoCompleteListView" 
                    component={AutoCompleteListView} 
                />
            </Scene>
        </Router>
    );
};

export default RouterComponent;
