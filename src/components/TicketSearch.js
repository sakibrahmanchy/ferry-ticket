import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import {
    SelectButton, 
    LocationSelector, 
    DateSelector,
    ImageInput,
    Button
 } from './common';


class TicketSearch extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            oneWaySelected: true, 
            returnSelected: false,
            selectedStartDate: null,
        };
        console.log(this.props);
    }
    oneWayButtonPressed = () => {
        this.setState({ oneWaySelected: true, returnSelected: false });
    }

    returnButtonPressed = () => {
        this.setState({ oneWaySelected: false, returnSelected: true });
    }

    searchForPort = (portType) => {
        Actions.autoCompleteListView({ portType });
    }
    
    render() {
        return (
            <ImageBackground
                source={require('../images/app_background2.jpg')}
                style={styles.container}
            >
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
                     name={this.props.selectedDestinationPort.city_name} 
                     address={this.props.selectedDestinationPort.name}
                     defaultText="Tap to select departure port"
                /> 
                <LocationSelector 
                    onPress={() => this.searchForPort('destination')} 
                    label="TO" 
                    name={this.props.selectedDeparturePort.city_name} 
                    address={this.props.selectedDeparturePort.name} 
                    defaultText="Tap to select destination port"
                /> 
                <View style={styles.dateSelectorContainer}>
                    <DateSelector 
                        label="Departure" 
                        date="24" 
                        month="APR" 
                        day="TUESDAY" 
                    />
                    {
                    this.state.returnSelected ? 
                        <DateSelector
                            label="Return"
                            date="24"
                            month="APR" 
                            day="TUESDAY"
                        /> 
                        : 
                        <View />
                    }
                </View>
                <ImageInput label="1" value="Adult" src={require('../images/passenger.png')} />   
                <Button 
                  style={{ 
                      marginTop: 20, 
                      backgroundColor: 'red', 
                      height: 50, 
                      borderColor: 'red',
                      margin: 0 
                    }}
                   propsTextStyle={{ color: 'white' }}
                >
                    Search
                </Button>
                <DatePicker
                    style={{width: 200}}
                    date={this.state.date}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="2016-05-01"
                    maxDate="2016-06-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                    // ... You can check the source to find the other keys.
                    }}
                    
                />
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
        selectedDestinationPort: state.selecteDestinationPort
    };
};

export default connect(mapStateToProps, {})(TicketSearch);
