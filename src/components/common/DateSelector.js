import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DateSelector = ({ date, month, day, label }) => {
    const { holderStyle, inputStyle, labelStyle, containerStyle } = styles;
    return (
        <View style={holderStyle}>
            <Text style={{ color: 'white' }}>{label}</Text>
            <View style={containerStyle}>
                <Text style={inputStyle}>{date}</Text>
                <View>
                    <Text style={labelStyle}>{month}</Text>
                    <Text style={labelStyle}>{day}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = {
    inputStyle: {
        color: 'white',
        fontSize: 35,
        flex: 0.6
    },
    labelStyle: {
        color: 'white',
        flex: 0.4
    },
    containerStyle: {
        flexDirection: 'row',
        borderBottomColor: 'white',
        height: 60,
        borderBottomWidth: StyleSheet.hairlineWidth,
        paddingBottom: 4,
        marginRight: 10
    },
    holderStyle: {
        flex: 1,
        marginTop: 20,
    }
};

export { DateSelector };
