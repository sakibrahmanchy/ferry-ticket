import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import AppIntro from './components/AppIntroduction';
import TicketSearch from './components/TicketSearch';
import AutoCompleteListView from './components/AutoCompleteListView';
import AvailableTrips from './components/AvailableTrips';
import PassengerDetails from './components/PassengerDetail';
import PassengerForm from './components/PassengerForm';
import TicketBookStatus from './components/TicketBookStatus';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard  from './components/Dashboard';
import UserProfile from './components/UserProfile';
import HistoryComponent from './components/HistoryComponent';
import CustomerTicketListComponent from './components/CustomerTicketListComponent';
import CustomerTicketComponent from './components/CustomerTicketComponent';


const RouterComponent = () => {
    return (
        <Router>
            <Scene 
                key="appIntro"
                duration={0}
            >
                <Scene key="appIntroduction" component={AppIntro} hideNavBar  />
                <Scene key="loginForm" component={LoginForm} hideNavBar />
                <Scene key="registerForm" component={RegisterForm} hideNavBar />
                <Scene key="dashboard" component={Dashboard} hideNavBar initial />
                <Scene key="profile" component={UserProfile} hideNavBar  />
                <Scene key="history" component={HistoryComponent} hideNavBar  />
                <Scene key="ticketList" component={CustomerTicketListComponent} hideNavBar />
                <Scene key="ticket" component={CustomerTicketComponent} hideNavBar />
                <Scene
                    key="ticketSearch" 
                    component={TicketSearch} 
                    title="Search Tickets" 
                    navTransparent
                    hideNavBar
                    titleStyle={{ color: 'white', fontSize: 18 }}
                    panHandlers={null}
                    
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
                <Scene
                    key="ticketBookStatus"
                    component={TicketBookStatus}
                    hideNavBar
                    panHandlers={null}
                />
            </Scene>
        </Router>
    );
};


const styles = {
    tabBarStyle: {
           backgroundColor: '#eeeeee',
   },
   indicatorStyle:{
       backgroundColor:'#de1d3e'
     },
   };

   
export default RouterComponent;
