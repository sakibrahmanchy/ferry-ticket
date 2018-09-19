import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import AutoCompleteList from './AutoCompleteList';
import { portsFetch } from '../actions/TripSearchActions'; 
import { Header } from './common';
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

    _renderAutoCompleteTextInput() {
        return (
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
        );
    }

    render() {
        return (
            <View>
                <StatusBar
                    backgroundColor="transparent"
                    translucent
                />
                <Header
                    backButtonPressed={this.backButtonPressed}
                    children={this._renderAutoCompleteTextInput()}
                />
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
