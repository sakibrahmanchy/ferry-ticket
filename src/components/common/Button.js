import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children, style, propsTextStyle }) => {
    const { 
        ButotnStyle,
        textStyle
    } = styles;
    
    return (
       <TouchableOpacity onPress={onPress} style={[ButotnStyle, style]}>
            <Text style={[textStyle, propsTextStyle]}>{children}</Text>
       </TouchableOpacity>    
    );
};


const styles = {

    textStyle: {
        alignSelf: 'center',
        color: '#007aff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    ButotnStyle: {
        height: 60,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#007aff',
        marginLeft: 5,
        marginRight: 5
    }
};

export { Button };
