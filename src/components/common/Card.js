import React from 'react';
import { View } from 'react-native';


const Card = (props) => {
   return (
    <View style={[styles.containerStyle, props.style]}                                 >
        {props.children }
    </View>
   );
};


const styles = {
    containerStyle: {
        borderWidth: 1, 
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
    }
};

export { Card };
