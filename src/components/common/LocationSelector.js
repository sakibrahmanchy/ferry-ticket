// Import libraries for making a component

import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

// Create a component
const LocationSelector = ({ label, name, address, onPress, defaultText }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.locationContainer}>
            <Text style={{ color: 'white' }}>{label}</Text>
            <Text style={styles.selectedLocationTextStyle}>{name === undefined ? '' : name}</Text>
            <Text style={styles.selectedLocationAddressStyle}>{name === undefined ? defaultText : address}</Text>
        </TouchableOpacity>    
    );
};

const styles = {
    locationContainer: {
        flexDirection: 'column',
        marginTop: 20,
        paddingBottom: 4,
        borderBottomColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    selectedLocationTextStyle: {
        color: 'white',
        fontSize: 30,
    },
    selectedLocationAddressStyle: {
        color: 'white',
        fontSize: 15,
    }
};

// Make the component available to other parts of the app
export { LocationSelector };
