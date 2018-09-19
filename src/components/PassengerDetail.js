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
  Alert,
  AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { FormLabel, FormInput } from 'react-native-elements';
import { Card, CardSection, Input, Header } from './common';
import PassengerItem from './PassengerItem';
import SeatPlan from './SeatPlan';
import PaymentForm from './PaymentForm';
import {
  getPassengerTicketInfo
} from '../actions/TripBookActions';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  onChangeTicketCollectorEmail,
  onChangeTicketCollectorPhone
} from '../actions/TicketCollectorActions';

import {
  selectDepartureSeatGrid,
  selectReturnSeatGrid
} from '../actions/SeatPlanActions';



class PassengerDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataFetched: false,
      searchResults: {},
      refreshing: false,
      returnTripEnabled: false,
      totalTIcektPrice: 0,
      passengers: [],
      formFilled: false,
      seatPlan: false,
      payment: false,
      name: [],
      gender: [],
      dob: [],
      passport_no: [],
      passport_exp: [],
      nationality: [],
      type_id: [],
    };
  }

  componentDidMount() {
    this.getAllPassengerDetails();
    // this.getItemFromAsyncStorage('token').then((token) => {
    //     console.log(token);
    //     if (token !== null) {
    //        this.getItemFromAsyncStorage('email').then((email) => {
    //           console.log(email);
    //           this.setState({ email });
    //        });
    //     }
    // });
  }

  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
    if (nextProps.tripInfo.success) {
      this.setState({
        dataFetched: true,
        searchResults: nextProps.tripSearchResult,
        refreshing: false,
        passengers: this.props.passengers,
        email: null
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
    const returnTripStatus = (this.props.selectedReturnTrip === null ? false : true);

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

  getItemFromAsyncStorage = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value; 
    } catch (error) {
        console.log(error);
    }
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
    if (this.props.payment.name === '' || this.props.payment.cardNumber === ''
      || this.props.payment.cvCode === '' || this.props.payment.expireDate === '') {
      Alert.alert(
        'Errror',
        'Fill all payment informations'
      );
    } else {
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
        console.log(this.props.seatPlan.departureSeatGrid);
        axios.post('http://bvigrimscloud.com/ferry/public/api/ticket/book', {
          return_trip: this.state.returnTripEnabled,
          no_of_passenger: this.props.selectedNumberOfPassengers,
          email: this.props.ticketCollectorInfo.email,
          contact_no: this.props.ticketCollectorInfo.phone,
          return_trip_id: (this.props.selectedReturnTrip === null ? 0 : this.props.selectedReturnTrip),
          trip_id: (this.props.selectedDepartureTrip === null ? 0 : this.props.selectedDepartureTrip),
          name,
          gender,
          dob,
          passport_no,
          passport_exp,
          nationality,
          type_id,
          rows: this.props.seatPlan.departureSeatRows,
          columns: this.props.seatPlan.departureSeatColumns,
          grid_id: this.props.seatPlan.departureSeatGrid,
          returnRows: this.props.seatPlan.returnSeatRows,
          returnColumns: this.props.seatPlan.returnSeatColumns,
          returnGrid_id: this.props.seatPlan.returnSeatGrid,
          card_no: this.props.payment.cardNumber,
          card_name: this.props.payment.name,
          expire_date: this.props.payment.expireDate,
          code: this.props.payment.cvCode,
        }).then((response) => {
          if (response.data.success) {
            Actions.ticketBookStatus({ data: response.data });
          } else {
            Alert(
              'Error',
              'Failed to book ticket'
            );
          }
        }).catch((error) => {
          console.log(error.response);
        });
      }
    }
  }

  validateForm() {
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
      this.props.selectDepartureSeatGrid(this.props.tripInfo.data.departure_trip.grid.id);
      if (this.props.tripInfo.data.return_trip !== null)
        this.props.selectReturnSeatGrid(this.props.tripInfo.data.return_trip.grid.id);
      this.setState({ formFilled: true });
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

  resolveEmail() {
     if (this.state.email !== null) 
        return this.state.email;
      return this.props.ticketCollectorInfo.email;
  }

  renderForm() {
    return (
      <View>
        <Card style={style.cardStyle}>
          <CardSection style={style.cardTitleStyle}>
            <Text style={{ fontSize: 18, color: 'white' }}>Ticket Collector Info</Text>
          </CardSection>
          <CardSection style={style.tripInfoStyle}>
            <FormLabel>Email</FormLabel>
            <FormInput
              placeholder="Enter Email"
              onChangeText={(email) => { this.props.onChangeTicketCollectorEmail(email) }}
              value={() => this.resolveEmail()}
            />
            <FormLabel>Phone</FormLabel>
            <FormInput
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
      </View>
    );
  }
  renderContent() {

    return (
      <ScrollView style={{ flex: 1, paddingBottom: 60 }}>
        {this.renderTripInfo(this.props.tripInfo.data.departure_trip, 'Departurting Info')}
        {this.props.tripInfo.data.return_trip === null
          ? null : this.renderTripInfo(this.props.tripInfo.data.return_trip, 'Return Info')}
        {!this.state.formFilled ? this.renderForm() : null}
        {this.generateSeatPlan(this.props.tripInfo.data.departure_trip, 'Departure Seat Plan', 1)}
        {
          this.state.returnTripEnabled ? this.generateSeatPlan(this.props.tripInfo.data.return_trip, 'Return Seat Plan', 2) : null
        }
        {this.state.formFilled && this.state.seatPlan ? <PaymentForm /> : null}
      </ScrollView>
    );
  }

  generateSeatPlan(trip, name, planType) {
    if (this.state.formFilled && !this.state.seatPlan) {
      return (
        <Card style={style.cardStyle}>
          <CardSection style={style.cardTitleStyle}>
            <Text style={{ fontSize: 18, color: 'white' }}>{name}</Text>
          </CardSection>
          <CardSection>
            <SeatPlan
              numCols={trip.grid.row}
              numRows={trip.grid.column}
              bookedList={trip.bookedSeatInfo}
              seatPlanType={planType}
            />
          </CardSection>
        </Card>
      );
    }
  }

  addPaymentInfo() {
    const trip_type = this.props.selectedTripType;
    if (trip_type === 1) {
      if (this.props.seatPlan.departureSeatRows.length < this.props.selectedNumberOfPassengers) {
        Alert.alert(
          'Errror',
          "You must select " + this.props.selectedNumberOfPassengers + " seats"
        );
      }
    } else {
      if (this.props.seatPlan.departureSeatRows.length < this.props.selectedNumberOfPassengers) {
        Alert.alert(
          'Errror',
          "You must select " + this.props.selectedNumberOfPassengers + " seats for departure"
        );
      }

      if (this.props.seatPlan.returnSeatRows.length < this.props.selectedNumberOfPassengers) {
        Alert.alert(
          'Errror',
          "You must select " + this.props.selectedNumberOfPassengers + " seats for return"
        );
      }
    }

    this.setState({ seatPlan: true });
  }

  renderTicketUnitPrice(ticketPriceList) {
    const items = [];

    for (const aTicket of ticketPriceList) {
      items.push(<Text key={aTicket.id}>{aTicket.name}: {aTicket.price}</Text>);
    }
    return items;
  }

  generateButton() {
    if (!this.state.formFilled) {
      return (
        <TouchableOpacity
          style={{ flex: 0.5, backgroundColor: 'green', paddingLeft: 10, paddingBottom: 20, paddingTop: 10, alignSelf: 'center' }}
          onPress={() => this.validateForm()}
        >
          <Text
            style={{ fontSize: 16, alignSelf: 'center', color: 'white' }}
          >
            SELECT SEATS
          </Text>
        </TouchableOpacity>
      );
    }
    else {
      if (!this.state.seatPlan) {
        return (
          <TouchableOpacity
            style={{ flex: 0.5, backgroundColor: 'blue', paddingLeft: 10, paddingBottom: 20, paddingTop: 10, alignSelf: 'center' }}
            onPress={() => this.addPaymentInfo()}
          >
            <Text
              style={{ fontSize: 16, alignSelf: 'center', color: 'white' }}
            >
              ADD PAYMENT INFO
              </Text>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity
            style={{ flex: 0.5, backgroundColor: 'red', paddingLeft: 10, paddingBottom: 20, paddingTop: 10, alignSelf: 'center' }}
            onPress={() => this.bookTicket()}
          >
            <Text
              style={{ fontSize: 16, alignSelf: 'center', color: 'white' }}
            >
              BOOK TICKET
              </Text>
          </TouchableOpacity>
        );
      }
    }

  }

  renderBookButton() {
    return (
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 30, flexDirection: 'row', flex: 1 }}>
        <Text style={{ paddingLeft: 20, paddingTop: 5, paddingBottom: 20, fontSize: 20, alignSelf: 'center', flex: 0.5, backgroundColor: '#1b1b1c', color: 'white' }}> Total: ${this.state.totalTIcektPrice} </Text>
        {this.generateButton()}
      </View>
    );
  }

  _renderJourneyHeader() {
    return (
      <View
            style={{
              marginLeft: 10,
              marginRight: 10,
              paddingRight: 5,
              paddingLeft: 5,
              flex: 0.85,
              paddingTop: 20
            }}
          >
        <Text style={{ fontSize: 20, color: 'white' }}>{this.props.selectedDeparturePort.city_name} To {this.props.selectedDestinationPort.city_name}</Text>
        <Text style={{ fontSize: 12, color: 'white' }}>
          Depart {moment(this.props.selectedDepartureDate).date()} {moment(this.props.selectedDepartureDate).format('MMMM')}
          {this.state.returnTripEnabled ? "- Return " + moment(this.props.selectedReturnDate).date() + " " + moment(this.props.selectedReturnDate).format('MMMM') : null} | {this.props.selectedNumberOfPassengers} Adult
              </Text>
      </View>
    );
  }

  render() {
    return (
      <View
        style={{ flex: 1, backgroundColor: '#ddd' }}
      >
        <Header
          backButtonPressed={this.backButtonPressed}
          children={this._renderJourneyHeader()}
        />
        <ScrollView behavior="padding" enabled keyboardVerticalOffset={-200}>
          {this.state.dataFetched ? this.renderContent() : this.loadSpinner()}
        </ScrollView>
        <View style={{ height: 60 }} />
        {this.state.dataFetched ? this.renderBookButton() : null}
      </View>

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
    ticketCollectorInfo: state.ticketCollector,
    seatPlan: state.seatPlan,
    payment: state.payment, 
    auth: state.auth
  };
};

export default connect(mapStateToProps, {
  getPassengerTicketInfo,
  onChangeTicketCollectorEmail,
  onChangeTicketCollectorPhone,
  selectDepartureSeatGrid,
  selectReturnSeatGrid
})(PassengerDetail);
