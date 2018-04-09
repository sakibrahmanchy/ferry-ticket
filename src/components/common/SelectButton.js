import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const SelectButton = ({ onPress, pressed, children }) => {

    const { 
        ButotnStyleUnPressed,
        ButotnStylePressed,
        textStyleUnPressed,
        textStylePressed
    } = styles;
    

    return (
       <TouchableOpacity onPress={onPress} style={pressed ? ButotnStylePressed : ButotnStyleUnPressed}>
            <Text style={pressed ? textStylePressed : textStyleUnPressed}>{children}</Text>
       </TouchableOpacity>    
    );
};


const styles = {

    textStyleUnPressed: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 16,
        paddingTop: 2,
        paddingBottom: 2
    },
    textStylePressed: {
        alignSelf: 'center',
        color: 'black',
        fontSize: 16,
        paddingTop: 2,
        paddingBottom: 2
    },
    ButotnStyleUnPressed: {
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0)',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        marginLeft: 5,
        marginRight: 5,
    },
    ButotnStylePressed: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        marginLeft: 5,
        marginRight: 5,
    }
};

export { SelectButton };
