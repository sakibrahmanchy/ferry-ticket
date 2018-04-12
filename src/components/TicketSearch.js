import React, { Component } from 'react';
import { View, ImageBackground, ScrollView, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import {
    SelectButton, 
    LocationSelector, 
    DateSelector,
    ImageInput,
    Button,
    ItemPicker
 } from './common';
import { 
    selectDeapartureDate, 
    selectReturnDate,
    selectNumberOfPassengers,
    selectTripType,
    searchForTrips
} from '../actions/TripSearchActions';


class TicketSearch extends Component {

    constructor(props) {
        super(props);
        const dateToday = moment().format('YYYY-MM-DD dddd MMMM DD');
        const dateTommorrow = moment().add(1, 'days').format('YYYY-MM-DD dddd MMMM DD');
        const dateTodayStrings = dateToday.split(' ');
        const dateTommorrowStrings = dateTommorrow.split(' ');
        this.state = { 
            oneWaySelected: true, 
            returnSelected: false,
            departureDateChoosing: false,
            returnDateChoosing: false,
            departureDate: dateTodayStrings[3],
            departureMonth: dateTodayStrings[2].toUpperCase(),
            departureDay: dateTodayStrings[1].toUpperCase(),
            returnDate: dateTommorrowStrings[3],
            returnMonth: dateTommorrowStrings[2].toUpperCase(),
            returnDay: dateTommorrowStrings[1].toUpperCase(),
            currentDate: this.props.selectedDepartureDate,
            pickerSelected: false,
            selectedItem: 1
        };
        this.props.selectTripType(1);
        this.props.selectDeapartureDate(dateTodayStrings[0]);
        this.props.selectReturnDate(dateTommorrowStrings[0]);
        this.props.selectNumberOfPassengers(1);
    }
    oneWayButtonPressed = () => {
        this.setState({ oneWaySelected: true, returnSelected: false });
        this.props.selectTripType(1);
    }

    returnButtonPressed = () => {
        this.setState({ oneWaySelected: false, returnSelected: true });
        this.props.selectTripType(2);
    }

    searchForPort = (portType) => {
        Actions.autoCompleteListView({ portType });
    }
    
    departureDateIsChoosing() {
        this.setState({ 
            departureDateChoosing: true, 
            returnDateChoosing: false,
            currentDate: this.props.selectedDepartureDate
        });
        this.datePickerRef.onPressDate();
    }

    returnDateIsChoosing() {
        this.setState({ 
            departureDateChoosing: false, 
            returnDateChoosing: true,
            currentDate: this.props.selectedReturnDate
        });
        this.datePickerRef.onPressDate();  
    }

    changeDate(date) {      
        if (this.state.departureDateChoosing) {
            const departureDateString = date.split(' ');
            this.setState({
                departureDate: departureDateString[3],
                departureMonth: departureDateString[2].toUpperCase(),
                departureDay: departureDateString[1].toUpperCase()
            });
            this.props.selectDeapartureDate(departureDateString[0]);
        } else if (this.state.returnDateChoosing) {
            const returnDateString = date.split(' ');
            this.setState({
                returnDate: returnDateString[3],
                returnMonth: returnDateString[2].toUpperCase(),
                returnDay: returnDateString[1].toUpperCase()
            });
            this.props.selectReturnDate(returnDateString[0]);
        }
    }

    closeModal() {
        this.setState({ pickerSelected: false });
    }

    getSelectedItem(item) {
        this.setState({ selectedItem: item, pickerSelected: false });
        this.props.selectNumberOfPassengers(item);
    }

    validateTrips() {
        const alertMessages = [];
        if (this.props.selectedDeparturePort === '') {
            alertMessages.push('Please select departure port\n');
        } else {
            alertMessages.push('');
        }
        if (this.props.selectedDestinationPort === '') {
            alertMessages.push('Please select destination port\n');
        } else {
            alertMessages.push('');
        } 

        if (this.props.selectedDeparturePort === '' || this.props.selectedDestinationPort === '') {
            Alert.alert(
                'Error',
                alertMessages[0] + alertMessages[1]
            );
        } else {
            const searchParams = {
                trip_type: this.props.selectedTripType,
                departure_port_id: this.props.selectedDeparturePort.id,
                destination_port_id: this.props.selectedDestinationPort.id,
                departure_date: this.props.selectedDepartureDate,
                return_date: this.props.selectedReturnDate,
                pax: this.props.selectedNumberOfPassengers
            };
            this.props.searchForTrips(searchParams);
        }
    }

    render() {
        return (
            <ImageBackground
                source={require('../images/app_background2.jpg')}
                style={styles.container}
            >
                <ScrollView>
                    <View style={styles.buttonContainer}>
                        <SelectButton 
                            pressed={this.state.oneWaySelected} 
                            onPress={this.oneWayButtonPressed}
                        >
                            Oneway
                        </SelectButton>
                        <SelectButton 
                            pressed={this.state.returnSelected} 
                            onPress={this.returnButtonPressed}
                        >
                            Round Trip
                        </SelectButton>
                    </View>
                    <LocationSelector
                        onPress={() => this.searchForPort('departure')} 
                        label="FROM" 
                        name={this.props.selectedDeparturePort.city_name} 
                        address={this.props.selectedDeparturePort.name}
                        defaultText="Tap to select departure port"
                    /> 
                    <LocationSelector 
                        onPress={() => this.searchForPort('destination')} 
                        label="TO" 
                        name={this.props.selectedDestinationPort.city_name} 
                        address={this.props.selectedDestinationPort.name} 
                        defaultText="Tap to select destination port"
                    /> 
                    <View style={styles.dateSelectorContainer}>
                        <DateSelector 
                            label="Departure" 
                            date={this.state.departureDate} 
                            month={this.state.departureMonth} 
                            day={this.state.departureDay} 
                            onPress={() => this.departureDateIsChoosing()}
                        />
                        {
                        this.state.returnSelected ? 
                            <DateSelector
                                label="Return"
                                date={this.state.returnDate}
                                month={this.state.returnMonth}
                                day={this.state.returnDay}
                                onPress={() => this.returnDateIsChoosing()}
                            /> 
                            : 
                            <View />
                        }
                    </View>
                    <ImageInput 
                        onPress={() => this.setState({ pickerSelected: true })}
                        label={this.state.selectedItem} 
                        value="Adult" 
                        src={require('../images/passenger.png')} 
                    />   
                    <Button 
                        style={{ 
                            marginTop: 20, 
                            backgroundColor: 'red', 
                            height: 50, 
                            borderColor: 'red',
                            margin: 0 
                        }}
                        propsTextStyle={{ color: 'white' }}
                        onPress={() => this.validateTrips()}
                    >
                        Search
                    </Button>
                    <DatePicker
                        style={{ width: 200 }}
                        date={this.state.currentDate}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD dddd MMMM DD"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        showIcon={false}
                        hideText
                        ref={(ref) => this.datePickerRef = ref}
                        onDateChange={(date) => this.changeDate(date)}
                    />  
                    <ItemPicker 
                        modalVisible={this.state.pickerSelected} 
                        onClose={() => this.closeModal()}
                        callback={this.getSelectedItem.bind(this)}
                    />  
                </ScrollView>
            </ImageBackground>
        );
    }
}

const styles = {
    headerTextStyle: {
        backgroundColor: 'darkblue',
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        margin: 10,
        paddingTop: 15,
        height: 60
    },
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        paddingTop: 65,
        paddingLeft: 30,
        paddingRight: 30
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 30
    },
    selectedLocationTextStyle: {
        color: 'white',
        fontSize: 30,
    },
    dateSelectorContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 30
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
        tripSearchResult: state.tripSearchResult
    };
};

export default connect(mapStateToProps, 
    { 
        selectDeapartureDate, 
        selectReturnDate, 
        selectNumberOfPassengers,
        selectTripType,
        searchForTrips
    })(TicketSearch);
