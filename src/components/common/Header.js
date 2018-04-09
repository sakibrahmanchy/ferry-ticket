// Import libraries for making a component

import React from 'react';
import { Text, View } from 'react-native';

// Create a component
const Header = (props) => {
    const { textStyle, viewStyle } = styles;

    return (
        <View style={viewStyle}>
            <Text style={textStyle}>{ props.headerText }</Text>
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
