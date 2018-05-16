import React, { Component } from 'react';
import axios from 'axios';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator, 
  ScrollView, 
  KeyboardAvoidingView,
  FlatList
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Card, CardSection, Input } from './common';
import PassengerItem from './PassengerItem';
import {
    getPassengerTicketInfo
} from '../actions/TripBookActions';


class PassengerDetail extends Component {  
  
  constructor(props) {
    super(props);
    this.state = { 
      dataFetched: false, 
      searchResults: {}, 
      refreshing: false,
      returnTripEnabled: false,
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

  bookTicket() {
    const name = [];
    const gender = [];
    const dob = [];
    const passport_no = [];
    const passport_exp = [];
    const nationality = [];
    const type_id = [];
    this.state.passengers.forEach((passenger) => {
      console.log(passenger);
        name.push(passenger.name);
        gender.push(passenger.gender);
        dob.push(passenger.dob);
        passport_no.push(passenger.passport_no);
        passport_exp.push(passenger.passport_exp);
        nationality.push(passenger.nationality);
        type_id.push(passenger.type_id);
    });
    console.log(name);
    axios.post('http://www.bvigrimscloud.com/ferry/public/api/ticket/book', {
      no_of_passengers: this.state.pax_no,
      email: 'sakib.cse11.cuet@gmail.com',
      contact_no: '01242142121',
      return_trip_id: this.state.return_trip_id,
      trip_id: this.state.one_way_trip_id,
      name,
      gender,
      dob,
      passport_no,
      passport_exp,
      nationality,
      type_id
    }).then((response) => {
        console.log(response);
    });
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

  renderTicketUnitPrice(ticketPriceList) {
    const items = [];

    for (const aTicket of ticketPriceList) {
      items.push(<Text key={aTicket.id}>{aTicket.name}: {aTicket.price}</Text>);
    }
    return items;
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
                palceholder="Enter Email"
              />
              <Input
                label="Phone"
                palceholder="Enter Phone"
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
              <TouchableOpacity onPress={() => Actions.passengerForm()}>
                <Text style={{ color: 'darkblue' }}>+Add new passenger</Text>
              </TouchableOpacity>
          </CardSection>
        </Card>
      </View>
    );
  }

  renderBookButton() {
    return (
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 30, flexDirection: 'row', flex: 1 }}>
        <Text style={{ padding: 20, fontSize: 16, alignSelf: 'center', flex: 0.5, backgroundColor: 'black', color: 'white' }}> $23,301 </Text>
        <TouchableOpacity onPress={() => this.bookTicket()}><Text style={{ padding: 20, fontSize: 16, alignSelf: 'center', flex: 0.5, backgroundColor: 'red', color: 'white' }}> BOOK FLIGHT </Text></TouchableOpacity>
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
                <Text style={{ fontSize: 12, color: 'white' }}>Depart 13 May - Return 02 May | 1 Adult</Text>
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
      passengers: state.passengers
  };
};

export default connect(mapStateToProps, { getPassengerTicketInfo })(PassengerDetail);
