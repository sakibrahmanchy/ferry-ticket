import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import AutoCompleteList from './AutoCompleteList';
import { portsFetch } from '../actions/TripSearchActions'; 

// const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

class TicketBookStatus extends Component {
    
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        console.log(this.props.data);
    }

    

    render() {
        return (
            <View>
                <View style={{ flexDirection: 'column', backgroundColor: 'green', paddingTop: 200,paddingBottom:400, paddingLeft:20 }}>
                    <Text style={{ color: 'white', fontSize: 40, alignSelf: 'center'}}> Success! </Text>
                    <Text style={{ color: 'white', fontSize: 15, alignSelf: 'center'}}> Ticket has been booked successfully! </Text>
                    <Text style={{ color: 'white', alignSelf:'center',paddingTop:50, fontSize: 18}}>Visit</Text>
                    <Text style={{ color: 'white', alignSelf:'center',fontSize: 14}}>{this.props.data.data.print_url}</Text>
                    <Text style={{ color: 'white', alignSelf:'center', fontSize: 18}}>to print your ticket.</Text>

                </View>
            </View>
        );
    }
}

export default TicketBookStatus;