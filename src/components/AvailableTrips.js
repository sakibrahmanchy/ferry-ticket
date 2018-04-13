import Drawer from 'react-native-drawer';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Button } from './common';
import TripItem from './TripItem';
import {
  searchForTrips
} from '../actions/TripSearchActions';

class AvailableTrips extends Component {  
  
  constructor(props) {
    super(props);
    this.state = { searchResults: this.props.tripSearchResult };
  }

  componentWillMount() { 
    this.searchTrips();
    this.setState({ searchResults: this.props.searchResults });
    console.log(this.state.searchResults);
  }

  searchTrips() {
    const searchParams = {
      trip_type: this.props.selectedTripType,
      departure_port_id: this.props.selectedDeparturePort.id,
      destination_port_id: this.props.selectedDestinationPort.id,
      departure_date: this.props.selectedDepartureDate,
      return_date: this.props.selectedReturnDate,
      pax: this.props.selectedNumberOfPassengers
    };
    console.log(this.state);
    if (!this.state.searchResults) {
      console.log(this.state.searchResults);
      this.props.searchForTrips(searchParams);
      this.setState({ searchResults: this.props.searchResults });
    }
    //console.log('here');
  }


  componentWillUpdate() {
    console.log(this.state);
    this.searchTrips();
  }

  closeControlPanel = () => {
    this._drawer.close();
  };
  
  openControlPanel = () => {
    this._drawer.open();
  };
  
  _renderItem = ({ item }) => (
    <TripItem 
      item={item}
    />
  );

  loadSpinner() {
    if (!this.state.searchResults) {
      while (!this.state.searchResults) {
        return (
          <ActivityIndicator size="large" color="#0000ff" />
        );
      }
    }
    
    console.log(this.state.searchResults);
    this.renderDrawer();  
  }

  renderDrawer() {
    return (
      <Drawer 
        type="overlay"
        ref={(ref) => this._drawer = ref}
        content={
         null
        }
        tapToClose
        openDrawerOffset={0.2} 
        panCloseMask={0.2}
        closedDrawerOffset={-2}
        styles={drawerStyles}
        tweenHandler={
          (ratio) => ({
              main: { opacity: (2 - ratio) / 2 }
          })
        } 
        acceptPan 
        side="right"
        disabled
      >
        <FlatList
          data={this.state.searchResults}
          extraData={this.state.searchResults}
          renderItem={this._renderItem}
          style={{ padding: 10 }}
          ListHeaderComponent={<Text>Departure</Text>}
        />
      </Drawer>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', backgroundColor: 'darkblue', padding: 10 }}>
            <TouchableOpacity onPress={this.backButtonPressed} style={{ flex: 0.15, alignItems: 'center', margin: 15 }} ><Text style={{ color: 'white' }}>Back</Text></TouchableOpacity>
            <View
                style={{  
                    marginLeft: 10,
                    marginRight: 10,
                    paddingRight: 5,
                    paddingLeft: 5, 
                    color: 'white',
                    flex: 0.85
                }}
            >
              <Text style={{ fontSize: 20, color: 'white' }}>Dhaka To Kolkata</Text>
              <Text style={{ fontSize: 12, color: 'white' }}>Depart 13 May - Return 02 May | 1 Adult</Text>
            </View>
        </View>
       
      </View>
    );
  }
}

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
  main: { paddingLeft: 3 },
};

const mapStateToProps = state => {
  return { 
      selectedDeparturePort: state.selecteDeparturePort,
      selectedDestinationPort: state.selecteDestinationPort,
      selectedDepartureDate: state.selectedDepartureDate,
      selectedReturnDate: state.selectedReturnDate,
      selectedTripType: state.selectedTripType,
      selectedNumberOfPassengers: state.selectedNumberOfPassengers,
      tripSearchResult: state.tripSearchResult
  };
};

export default connect(mapStateToProps, { searchForTrips })(AvailableTrips);
