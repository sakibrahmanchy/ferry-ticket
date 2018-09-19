import BottomNavigation, {
    FullTab
} from 'react-native-material-bottom-navigation';

import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import TicketSearch from './TicketSearch';
import UserProfile from './UserProfile';
import HistoryComponent from './HistoryComponent';

export default class Dashboard extends Component {
    tabs = [
        {
            key: 'home',
            icon: 'home',
            label: 'Home',
            barColor: 'black',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
            key: 'trips',
            icon: 'card-travel',
            label: 'Trips',
            barColor: '#07327C',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
            key: 'account',
            icon: 'account-circle',
            label: 'My Account',
            barColor: '#0026FF',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        }
    ]

    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'home' 
        };
    }

    renderIcon = icon => ({ isActive }) => (
        <Icon size={24} color="white" name={icon} />
    )

    renderTab = ({ tab, isActive }) => (
        <FullTab
            isActive={isActive}
            key={tab.key}
            label={tab.label}
            renderIcon={this.renderIcon(tab.icon)}
        />
    )

    decideContent() {
       const activeTab = this.state.activeTab;
       switch (activeTab) {
           case 'home':
            return (<TicketSearch />);
           case 'account':
            return (<UserProfile />);
           case 'trips':
            return (<HistoryComponent />);
           default:
            return null;
       } 
    }

    render() {
        return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
            {/* Your screen contents depending on current tab. */}
            {this.decideContent()}
            </View>
            <BottomNavigation
            onTabPress={ newTab =>  { this.setState({ activeTab: newTab.key }); }}
            renderTab={this.renderTab}
            tabs={this.tabs}
            />
        </View>
        );
    }

}
