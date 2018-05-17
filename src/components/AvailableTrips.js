import Drawer from 'react-native-drawer';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Button } from './common';
import TripItem from './TripItem';
import moment from 'moment';
import {
  searchForTrips,
  selectDepartureTrip,
  selectReturnTrip
} from '../actions/TripSearchActions';

class AvailableTrips extends Component {  
  
  constructor(props) {
    super(props);
    this.state = { 
      dataFetched: false, 
      searchResults: {}, 
      refreshing: false,
      returnTripEnabled: false,
    };
  }

  componentDidMount() { 
    this.searchTrips();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tripSearchResult.success) {
      this.setState({ dataFetched: true, searchResults: nextProps.tripSearchResult, refreshing: false });
      this.props = nextProps;
      if (nextProps.tripSearchResult.data.return_trips.no_of_trips > 0) {
        this.setState({ returnTripEnabled: true });
      }
    }
    this.loadSpinner();
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
    
    this.props.searchForTrips(searchParams); 
    //console.log('here');
  }

  closeControlPanel = () => {
    this._drawer.close();
  };
  
  openControlPanel = () => {
    this._drawer.open();
  };
  
  _renderDepartureItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this.props.selectDepartureTrip(item.id)}>
        <TripItem 
          item={item}
          selectedTrip={item.id === this.props.selectedDepartureTrip}
        />
      </TouchableOpacity>
    );
  };

  _renderReturnItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this.props.selectReturnTrip(item.id)}>
        <TripItem 
          item={item}
          selectedTrip={item.id === this.props.selectedReturnTrip}
        />
      </TouchableOpacity>
    );
  };

  loadSpinner() {
    return (
      <ActivityIndicator size="large" color="#0000ff" />
    );
  }

  handleRefresh = () => {
    this.setState({
      refreshing: true
    }, () => {
      this.searchTrips();
    });
  }

  backButtonPressed() {
    Actions.pop();
  }

  validateTripBook() {
    switch (this.props.selectedTripType) {
      case 1: 
          if (this.props.selectedDepartureTrip === null) {
            Alert.alert(
                'Error',
                'Please select departure trip from list\n'
            );
          } else {
            Actions.passengerDetails();
          }
        break;
      case 2:
        if (this.props.selectedDepartureTrip === null || this.props.selectedReturnTrip === null) {
          Alert.alert(
              'Error',
              'Please select both departure and return trip from list\n'
          );
        } else {
          Actions.passengerDetails();
        }
      break;
      default:
          Alert.alert(
            'Error',
            'Please select both departure and return trip from list\n'
        );
      break;
    }
  }

  renderDrawerContent() {
    if (this.state.returnTripEnabled) {
      return (
        <View style={{ flex: 1, backgroundColor: 'white', borderLeftColor: 'lightgrey', borderLeftWidth: 5 }}>
          <FlatList
              data={this.state.searchResults.data.return_trips.trip_info}
              renderItem={this._renderReturnItem}
              ListHeaderComponent={<Text style={{ padding: 10 }}>Return</Text>}
              refreshing={this.state.refreshing}  
              onRefresh={this.handleRefresh}
              keyExtractor={this._keyExtractor}
          />
        </View>
      );
    } 
    return null;
  }

  renderDrawer() {
    return (
      <Drawer 
        type="overlay"
        ref={(ref) => this._drawer = ref}
        content={
          this.renderDrawerContent()
        }
        tapToClose
        openDrawerOffset={0.2} 
        panCloseMask={0.2}
        closedDrawerOffset={this.state.returnTripEnabled ? 0.2 : -2}
        styles={drawerStyles}
        tweenHandler={
          (ratio) => ({
              main: { opacity: (2 - ratio) / 2 }
          })
        } 
        acceptPan 
        side="right"
        disabled={!this.state.returnTripEnabled}
      >
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <FlatList
          data={this.state.searchResults.data.trips.trip_info}
          renderItem={this._renderDepartureItem}
          ListHeaderComponent={<Text style={{ padding: 10 }}>Departure</Text>}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        />
      </View>
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
                    flex: 0.85
                }}
            >
              <Text style={{ fontSize: 20, color: 'white' }}>{this.props.selectedDeparturePort.city_name} To {this.props.selectedDestinationPort.city_name }</Text>
              <Text style={{ fontSize: 12, color: 'white' }}>
            Depart {moment(this.props.selectedDepartureDate).date()} {moment(this.props.selectedDepartureDate).format('MMMM')}
            {this.state.returnTripEnabled ? "- Return "+moment(this.props.selectedReturnDate).date()+ " " +moment(this.props.selectedReturnDate).format('MMMM'): null} | {this.props.selectedNumberOfPassengers} Adult
              </Text>
            </View>
        </View>
          { this.state.dataFetched ? this.renderDrawer() : this.loadSpinner() }
          <Button 
            style={{ 
                marginTop: 20, 
                backgroundColor: 'darkblue', 
                height: 50, 
                borderColor: 'darkblue',
                margin: 20 
            }}
            propsTextStyle={{ color: 'white' }}
            onPress={() => this.validateTripBook()}
          >
            Book Now
        </Button>
      </View>
    );
  }
}

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0, shadowRadius: 3 },
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
      tripSearchResult: state.tripSearchResult,
      selectedDepartureTrip: state.selectedTrips.departureTrip,
      selectedReturnTrip: state.selectedTrips.returnTrip
  };
};

export default connect(mapStateToProps, 
  { searchForTrips, selectDepartureTrip, selectReturnTrip })(AvailableTrips);
