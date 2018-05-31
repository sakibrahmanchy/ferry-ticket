import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator, 
  ScrollView, 
  KeyboardAvoidingView,
  FlatList,
  Alert
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Card, CardSection, Input } from './common';
import PassengerItem from './PassengerItem';
import SeatPlan from './SeatPlan';
import {
    getPassengerTicketInfo
} from '../actions/TripBookActions';

import {
  onChangeTicketCollectorEmail,
  onChangeTicketCollectorPhone
} from '../actions/TicketCollectorActions';

class PassengerDetail extends Component {  
  
  constructor(props) {
    super(props);
    this.state = { 
      dataFetched: false, 
      searchResults: {}, 
      refreshing: false,
      returnTripEnabled: false,
      totalTIcektPrice: 0,
      passengers: []
    };
  }

  componentDidMount() { 
    this.getAllPassengerDetails();
    //console.log(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
    if (nextProps.tripInfo.success) {
      this.setState({ 
        dataFetched: true,
        searchResults: nextProps.tripSearchResult, 
        refreshing: false, 
        passengers: this.props.passengers
      });
      this.props = nextProps;
      if (nextProps.tripSearchResult.data.return_trips.no_of_trips > 0) {
        this.setState({ returnTripEnabled: true });
      }
      this.getTotalTicketPrice();
    }
    //console.log(this.state);
    this.loadSpinner();
  }

  getAllPassengerDetails() {
    const searchParams = {
      trip_type: this.props.selectedTripType,
      one_way_trip_id: this.props.selectedDepartureTrip,
      return_trip_id: this.props.selectedReturnTrip,
      pax_no: this.props.selectedNumberOfPassengers
    };
    
    this.props.getPassengerTicketInfo(searchParams); 
  }
  
  getTotalTicketPrice() {
    const passengers = this.props.passengers;
    let ticketPrice = 0;
    const returnTripStatus =  ( this.props.selectedReturnTrip === null ? false : true);

    for (const passenger of passengers) {
      if (passenger.type_id === 1) {
        ticketPrice += this.props.tripInfo.data.departure_trip.passenger_type[0].price;
        if (returnTripStatus) {
          ticketPrice += this.props.tripInfo.data.return_trip.passenger_type[0].price;
        }
      } else {
        ticketPrice += this.props.tripInfo.data.departure_trip.passenger_type[1].price;
        if (returnTripStatus) {
          ticketPrice += this.props.tripInfo.data.return_trip.passenger_type[1].price;
        }
      }
    }
    this.setState({
      totalTIcektPrice: ticketPrice
    });
  }

  loadSpinner() {
    return (
      <ActivityIndicator size="large" color="#0000ff" />
    );
  }


  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
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

  _renderPassengerItem = ({ item }) => {
    return (
      // <TouchableOpacity onPress={() => this.props.selectDepartureTrip(item.id)}>
        <PassengerItem 
          item={item}
        />
      // </TouchableOpacity>
    );
  };

  bookTicket() {
    const name = [];
    const gender = [];
    const dob = [];
    const passport_no = [];
    const passport_exp = [];
    const nationality = [];
    const type_id = [];
    this.state.passengers.forEach((passenger) => {
        name.push(passenger.name);
        gender.push(passenger.gender);
        dob.push(passenger.dob);
        passport_no.push(passenger.passport_no);
        passport_exp.push(passenger.passport_exp);
        nationality.push(passenger.nationality);
        type_id.push(passenger.type_id);
    });
    const ValidticketCollectorEmail = this.validateEmail(this.props.ticketCollectorInfo.email);
    const validTicketCollectorPhone = !isNaN(this.props.ticketCollectorInfo.phone);
    let errormessage = '';
    if (!ValidticketCollectorEmail) {
      errormessage += 'Invalid email\n';
    }
    
    if (!validTicketCollectorPhone) {
      errormessage += 'Invalid Phone Number\n';
    }
      
    if (this.props.ticketCollectorInfo.phone === '') {
      errormessage += 'Invalid Phone Number\n';
    }
      
   if (!ValidticketCollectorEmail || !validTicketCollectorPhone
        || this.props.ticketCollectorInfo.phone === '') {
       Alert.alert(
         'Errror',
         errormessage
       );
    } else if (this.props.selectedNumberOfPassengers !== this.props.passengers.length) {
      Alert.alert(
        'Errror',
        'Add all passenger info'
      );
    } else {
      axios.post('http://bvigrimscloud.com/ferry/public/api/ticket/book', {
        return_trip: 0,
        no_of_passengers: this.state.pax_no,
        email: this.props.ticketCollectorInfo.email,
        contact_no: this.props.ticketCollectorInfo.phone,
        return_trip_id: ( this.props.selectedReturnTrip === null ?  0: this.props.selectedReturnTrip),
        trip_id: ( this.props.selectedDepartureTrip === null ?  0: this.props.selectedDepartureTrip  ),
        name,
        gender,
        dob,
        passport_no,
        passport_exp,
        nationality,
        type_id
      }).then((response) => {
          if (response.data.success) {
            Actions.ticketBookStatus({ data: response.data });
          } else {
            Alert(
              'Error',
              'Failed to book ticekt'
            );
          }
      }).catch((error) => {
          console.log(error.response);
      });
    } 
  }

  addNewPassenger() {
    const currentPassengersInserted = this.props.passengers.length;
    if (currentPassengersInserted < this.props.selectedNumberOfPassengers) {
      Actions.passengerForm();
    } else {
      Alert.alert(
        'Error',
        'Maximum number of passenger is added'
      );
    }
  }

  renderTripInfo(tripInfo, tripType) {
    return (
      <Card style={style.cardStyle}>
        <CardSection style={style.cardTitleStyle}>
            <Text style={{ fontSize: 18, color: 'white' }}>{tripType}</Text>
        </CardSection>
        <CardSection style={style.tripInfoStyle}>
          <Text style={style.boldTextStyle}>Departure Date</Text>
          <Text>{tripInfo.departure_date}</Text>
          <Text style={style.boldTextStyle}>Depart from</Text>
          <Text>{tripInfo.departure_port}</Text>
          <Text style={style.boldTextStyle}>Arrive At</Text>
          <Text>{tripInfo.destination_port}</Text>
          <Text style={style.boldTextStyle}>Ferry</Text>
          <Text>{tripInfo.ferry}</Text>
          <Text style={style.boldTextStyle}>Number Of Seats</Text>
          <Text>{tripInfo.no_of_seat}</Text>  
          <Text style={style.boldTextStyle}>Ticket Unit Price</Text>
          {this.renderTicketUnitPrice(tripInfo.passenger_type)}
        </CardSection>
      </Card>
    );
  }

  renderContent() {
    console.log(this.props.tripInfo.data.departure_trip);
    return (
      <View style={{ flex: 1, paddingBottom: 60 }}>
          {this.renderTripInfo(this.props.tripInfo.data.departure_trip, 'Departurting Info')}
          { this.props.tripInfo.data.return_trip === null 
            ? null : this.renderTripInfo(this.props.tripInfo.data.return_trip, 'Return Info')}
        <Card style={style.cardStyle}>
          <CardSection style={style.cardTitleStyle}>
              <Text style={{ fontSize: 18, color: 'white' }}>Ticket Collector Info</Text>
          </CardSection>
          <CardSection style={style.tripInfoStyle}>
             <Input
                label="Email"
                placeholder="Enter Email"
                onChangeText={(email) => {this.props.onChangeTicketCollectorEmail(email)}}
                value={this.props.ticketCollectorInfo.email}
              />
              <Input
                label="Phone"
                placeholder="Enter Phone"
                onChangeText={(phone) => { this.props.onChangeTicketCollectorPhone(phone); }}
                value={this.props.ticketCollectorInfo.phone}
              />
          </CardSection>
        </Card>
        <Card style={style.cardStyle}>
          <CardSection style={style.cardTitleStyle}>
              <Text style={{ fontSize: 18, color: 'white' }}>Travelers</Text>
          </CardSection>
          <CardSection style={style.tripInfoStyle}>
            <FlatList
                data={this.state.passengers}
                renderItem={this._renderPassengerItem}
                ListHeaderComponent={<Text style={{ padding: 10 }}>Passengers</Text>}
            />
          </CardSection>
          <CardSection style={style.tripInfoStyle}>
              <TouchableOpacity onPress={() => this.addNewPassenger()}>
                <Text style={{ color: 'darkblue' }}>+Add new passenger</Text>
              </TouchableOpacity>
          </CardSection>
        </Card>
        <Card style={style.cardStyle}>
            <CardSection style={style.cardTitleStyle}>
              <Text style={{ fontSize: 18, color: 'white' }}>Seat Plan</Text>
            </CardSection>
            <CardSection>
                <SeatPlan 
                  numCols={this.props.tripInfo.data.departure_trip.grid.row} 
                  numRows={this.props.tripInfo.data.departure_trip.grid.column}
                  bookedList={this.props.tripInfo.data.departure_trip.bookedSeatInfo}
                />
            </CardSection>
        </Card>
      </View>
    );
  }

  renderTicketUnitPrice(ticketPriceList) {
    const items = [];
    
    for (const aTicket of ticketPriceList) {
      items.push(<Text key={aTicket.id}>{aTicket.name}: {aTicket.price}</Text>);
    }
    return items;
  }

  renderBookButton() {
    return (
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 30, flexDirection: 'row', flex: 1 }}>
        <Text style={{ paddingLeft: 20, paddingTop: 5, paddingBottom: 20, fontSize: 20, alignSelf: 'center', flex: 0.5, backgroundColor: '#1b1b1c', color: 'white' }}> Total: ${this.state.totalTIcektPrice} </Text>
        <TouchableOpacity style={{ flex: 0.5, backgroundColor: 'red', paddingLeft: 10, paddingBottom: 20, paddingTop: 10, alignSelf: 'center'}} onPress={() => this.bookTicket()}><Text style={{ fontSize: 16, alignSelf: 'center', color: 'white' }}> BOOK TICKET </Text></TouchableOpacity>
      </View>  
    );
  }

  render() {
    return (
        <KeyboardAvoidingView behavior="padding" enabled
          style={{ flex: 1, backgroundColor: '#ddd' }}
        >
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
          <ScrollView>
              { this.state.dataFetched ? this.renderContent() : this.loadSpinner() } 
          </ScrollView>       
          { this.state.dataFetched ? this.renderBookButton() : null } 
        </KeyboardAvoidingView>
    );
  }
}


const style = {
  boldTextStyle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  cardStyle: {
     borderWidth: 6, 
     borderBottomWidth: 6
  },
  cardTitleStyle: {
    backgroundColor: 'darkblue' 
  },
  tripInfoStyle: { 
    backgroundColor: 'white', flexDirection: 'column' 
  }
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
      selectedReturnTrip: state.selectedTrips.returnTrip,
      tripInfo: state.tripInfo.tripInfo,
      passengers: state.passengers,
      ticketCollectorInfo: state.ticketCollector
  };
};

export default connect(mapStateToProps, { getPassengerTicketInfo, 
                                          onChangeTicketCollectorEmail,
                                          onChangeTicketCollectorPhone })(PassengerDetail);
