import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity,
    ScrollView, KeyboardAvoidingView, Picker
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import { Card, CardSection, Input } from './common';
import {
    changeCustomerName,
    changeCardNumber,
    changeExpireDate,
    changeCVCode
} from '../actions/PaymentFormActions';
import moment from 'moment';
import { CreditCardInput } from "react-native-credit-card-input";


class PaymentForm extends Component {

    constructor(props) {
        super(props);
        console.log(props);
    }

    _onChange = (form) => {
        this.props.changeCustomerName(form.values.name);
        this.props.changeCardNumber(form.values.number);
        this.props.changeCVCode(form.values.cvc);
        this.props.changeExpireDate(form.values.expiry);
    }


    render() {
        return (
            <View
                behavior="padding"
                style={{ flex: 1, backgroundColor: '#ddd' }}
            >
                <ScrollView>
                    <Card style={style.cardStyle}>
                        <CardSection style={style.cardTitleStyle}>
                            <Text style={{ fontSize: 18, color: 'white' }}>Payment </Text>
                        </CardSection>
                        <CardSection>
                            <CreditCardInput onChange={this._onChange} requiresName allowScroll />
                        </CardSection>
                    </Card>
                </ScrollView>
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
    console.log(state);
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
    changeCustomerName,
    changeCardNumber,
    changeExpireDate,
    changeCVCode
})(PaymentForm);
