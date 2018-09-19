// Import libraries for making a component

import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Create a component
const Header = (props) => {
    const { textStyle, viewStyle } = styles;

    return (
        <View style={{ flexDirection: 'row', backgroundColor: 'darkblue', padding: 10 }}>
            <TouchableOpacity onPress={props.backButtonPressed} style={{ flex: 0.15, alignItems: 'center', margin: 15, marginTop: 30 }} color="white"><Icon color="white" size={30} name="arrow-left" /></TouchableOpacity>
            {props.children} 
        </View>
    );
};

const styles = {
    viewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        backgroundColor: 'darkblue',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
        shadowOpacity: 0.2,
        
    },
    textStyle: {
        fontSize: 20
    }
};

// Make the component available to other parts of the app
export { Header };
