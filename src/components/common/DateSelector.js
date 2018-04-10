import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DateSelector = ({ date, month, day, label, onPress }) => {
    const { holderStyle, inputStyle, labelStyle, containerStyle } = styles;
    return (
    
            <View style={holderStyle}>
                <Text style={{ color: 'white' }}>{label}</Text>
                <TouchableOpacity onPress={onPress}>
                    <View style={containerStyle}>
                        <Text style={inputStyle}>{date}</Text>
                        <View style={{ paddingTop: 2 }}>
                            <Text style={labelStyle}>{month}</Text>
                            <Text style={labelStyle}>{day}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
      
    );
};

const styles = {
    inputStyle: {
        color: 'white',
        fontSize: 35,
        flex: 0.7
    },
    labelStyle: {
        color: 'white',
        flex: 0.3
    },
    containerStyle: {
        flexDirection: 'row',
        borderBottomColor: 'white',
        height: 65,
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
