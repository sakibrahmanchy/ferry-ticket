import React, { Component } from 'react';
import { View, Text, TouchableOpacity, 
    ScrollView, KeyboardAvoidingView, Picker } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import { Card, CardSection, Input } from './common';
import {
    changePassengerName,
    changePassengerPassportNumber,
    changePassengerBirthDate,
    changePassengePassportExpiryDate,
    changePassengerGender,
    changePassengerNationality,
    changePassengerType,
} from '../actions/PassengerFormActions';
import moment from 'moment';
import {
    addNewPassenger
} from '../actions/PassengerListActions';


class PassengerForm extends Component {  
  
    constructor(props) {
       super(props);
       this.state = {
            selectedGender: null,
            selectedNationality: null,
            selectedPassengerType: null,
            birthDateChoosing: false,
            passportExpiryDateChoosing: false,
            birthDate: null,
            passportExpiryDate: null,
            currentDate: this.props.birthDate,
            submitDisabled: true
       };     
    }

    componentDidMount() {
        this.setPassengerType(1);
    }

    componentWillReceiveProps(nextProps) {
        this.validateForm(nextProps);
    }

    setName(name) {
        this.props.changePassengerName(name);
    }

    setPassportNumber(passportNumber) {
        this.props.changePassengerPassportNumber(passportNumber);
    }

    setNationality(nationality) {   
        this.setState({ selectedNationality: nationality });
        this.props.changePassengerNationality(nationality);
    }

    setGender(gender) {
        this.setState({ selectedGender: gender });
        this.props.changePassengerGender(gender);
    }

    setPassengerType(passengerType) {
        this.setState({ selectedPassengerType: passengerType });
        this.props.changePassengerType(passengerType);
    }

    validateForm(props) {
        let fieldsSubmitted = 0;
        Object.keys(props.currentPassengerInfo).forEach((key) => {
            if (props.currentPassengerInfo[key] !== '') {
                fieldsSubmitted++;
            }
        });
        if (fieldsSubmitted === 7) {
            this.setState({ submitDisabled: false });
        } else {
            this.setState({ submitDisabled: true });
        }
    }

    birthDateIsChoosing() {
        this.setState({ 
            birthDateChoosing: true, 
            passportExpiryDateChoosing: false,
            currentDate: this.props.birthDate
        });
        this.datePickerRef.onPressDate();
    }

    passportExpiryDateIsChoosing() {
        this.setState({ 
            birthDateChoosing: false, 
            passportExpiryDateChoosing: true,
            currentDate: this.props.passportExpiryDate
        });
        this.datePickerRef.onPressDate();  
    }

    changeDate(date) {      
        if (this.state.birthDateChoosing) {
            this.setState({
                birthDate: date
            });
            this.props.changePassengerBirthDate(date);
        } else if (this.state.passportExpiryDateChoosing) {
            this.setState({
                passportExpiryDate: date
            });
            this.props.changePassengePassportExpiryDate(date);
        }
    }

    addPassengerToList() {
        const passengerInfo = {
            name: this.props.currentPassengerInfo.name,
            gender: this.props.currentPassengerInfo.gender,
            dob: this.props.currentPassengerInfo.birthDate,
            passport_no: this.props.currentPassengerInfo.passsportNumber,
            passport_exp: this.props.currentPassengerInfo.pasportExpiryDate,
            nationality: this.props.currentPassengerInfo.nationality,
            type_id: this.props.currentPassengerInfo.type
        };
        this.props.addNewPassenger(passengerInfo);
        Actions.passengerDetails();
    }

  render() {
    return (
        <View 
            behavior="padding"
            style={{ flex: 1, backgroundColor: '#ddd' }}
        >
            <ScrollView>
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
            <Card style={style.cardStyle}>
                <CardSection style={style.cardTitleStyle}>
                    <Text style={{ color: 'white' }}>Passenger Informations</Text>
                </CardSection>
                <CardSection>
                    <Input
                        label="Full name"
                        name="Full name"
                        placeholder="name"
                        onChangeText={this.setName.bind(this)}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label="Passport No."
                        name="passport_number"
                        placeholder="Passport No." 
                        onChangeText={this.setPassportNumber.bind(this)}
                    />
                </CardSection>
                <CardSection>
                    <View style={{ flex: 1, flexDirection: 'row', marginLeft: 20, paddingLeft: 10 }}>
                        <TouchableOpacity 
                            style={{ flex: 0.5, height: 40 }}
                            onPress={() => this.birthDateIsChoosing()}
                        >
                            <Text style={{ color: 'black' }}>Birth Date</Text>
                            <Text>{this.state.birthDate === null ? 'Select a date' : this.state.birthDate}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={{ flex: 0.5, height: 40 }}
                            onPress={() => this.passportExpiryDateIsChoosing()}
                        >
                            <Text style={{ color: 'black' }}>Passport Expiry Date</Text>
                            <Text>{this.state.passportExpiryDate === null ? 'Select a date' : this.state.passportExpiryDate}</Text>
                        </TouchableOpacity>
                    </View>
                </CardSection>
                <CardSection>                    
                <Picker
                    selectedValue={this.state.selectedGender}
                    style={{ flex: 0.5, marginLeft: 20 }}
                    onValueChange={(itemValue) => this.setGender(itemValue)}
                    mode="dropdown"
                >
                    <Picker.Item label="Gender" value="" />
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
                </Picker>
                <Picker
                    selectedValue={this.state.selectedNationality}
                    style={{ flex: 0.5, marginLeft: 20 }}
                    onValueChange={(itemValue) => this.setNationality(itemValue)}
                    mode="dropdown"
                >
                    <Picker.Item label="Nationality" value="" />
                    <Picker.Item label="Bangladeshi" value="bangladeshi" />
                    <Picker.Item label="Australian" value="australian" />
                </Picker>   
                </CardSection>
                <CardSection>
                    <Picker
                        selectedValue={this.state.selectedPassengerType}
                        style={{ flex: 1, marginLeft: 20 }}
                        onValueChange={(itemValue) => this.setPassengerType(itemValue)}
                        mode="dropdown"
                    >
                        <Picker.Item label="Adult" value={1} />
                        <Picker.Item label="Child" value={2} />
                    </Picker>
                    <DatePicker
                        style={{ width: 0 }}
                        date={this.state.currentDate}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        showIcon={false}
                        hideText
                        ref={(ref) => this.datePickerRef = ref}
                        onDateChange={(date) => this.changeDate(date)}
                    />
                </CardSection>
            </Card>
            </ScrollView>
            <TouchableOpacity 
                disabled={this.state.submitDisabled}
                style={this.state.submitDisabled ? style.submitDisabledStyle : style.submitEnabledStyle}
                onPress={() => this.addPassengerToList()}
            >
                <Text style={{ height: 40, paddingTop: 4, fontSize: 16, color: 'white' }}> DONE </Text>
            </TouchableOpacity> 
        </View>
    );
  }
}


const style = {
    boldTextStyle: {      
        fontSize: 18,
        fontWeight: 'bold'
    },
    submitEnabledStyle: {
        flexDirection: 'row',
        bottom: 0, 
        paddingTop: 3, 
        right: 0, 
        left: 0, 
        backgroundColor: 'red', 
        position: 'absolute', 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    submitDisabledStyle: {
        flexDirection: 'row',
        bottom: 0, 
        paddingTop: 3, 
        right: 0, 
        left: 0, 
        backgroundColor: '#FFEBEE', 
        position: 'absolute', 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    cardStyle: {
        borderWidth: 6, 
        borderBottomWidth: 6
    },
    cardTitleStyle: {
        backgroundColor: 'darkblue',
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
      currentPassengerInfo: state.currentPassengerInfo,
      passengers: state.passengers
  };
};

export default connect(mapStateToProps, { 
    changePassengerName,
    changePassengerPassportNumber,
    changePassengerBirthDate,
    changePassengePassportExpiryDate,
    changePassengerGender,
    changePassengerNationality,
    changePassengerType,
    addNewPassenger 
})(PassengerForm);
