import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import AutoCompleteList from './AutoCompleteList';
import { portsFetch } from '../actions/TripSearchActions'; 

// const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

class AutoCompleteListView extends Component {
    
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        this.state = { searchText: '' };  
    }

    portAddressChanged(text) {
        this.setState({ searchText: text });
    }

    backButtonPressed() {
        Actions.pop();
    }

    render() {
        return (
                <View>
                    <View style={{ flexDirection: 'row', backgroundColor: 'darkblue', padding: 10 }}>
                        <TouchableOpacity onPress={this.backButtonPressed} style={{ flex: 0.15, alignItems: 'center', margin: 15 }} ><Text style={{ color: 'white' }}>Back</Text></TouchableOpacity>
                        <TextInput
                            placeholder="Search a port"
                            underlineColorAndroid='white'
                            style={{  
                                marginLeft: 10,
                                marginRight: 10,
                                paddingRight: 5,
                                paddingLeft: 5,
                                fontSize: 18,
                                color: 'white',
                                flex: 0.85,
                                
                            }}
                            placeholderTextColor='white'
                            onChangeText={this.portAddressChanged.bind(this)}
                        />
                    </View>
                    <AutoCompleteList 
                        searchText={this.state.searchText} 
                        portType={this.props.portType} 
                    /> 
                </View>
        );
    }
}

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps, { portsFetch })(AutoCompleteListView);
