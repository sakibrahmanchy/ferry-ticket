import React from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const ImageInput = ({ label, value, src, onPress }) => {
    const { fakerStyle, labelStyle, containerStyle } = styles;
    return (
      
            <View style={{ height: 70, flexDirection: 'row', marginTop: 90, }}>
                <View style={containerStyle}>
                    <Image
                        source={src}
                        style={{ height: 60, width: 60, }}
                    />
                    <TouchableOpacity onPress={onPress}>
                        <View>
                            <Text style={labelStyle}>{label}</Text>
                            <Text style={labelStyle}>{value}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={fakerStyle}>
                </View>
            </View>
    );
};

const styles = {
    labelStyle: {       
        fontSize: 18,
        paddingLeft: 10,
        color: 'white'
    },
    containerStyle: {
        flex: 0.5,
        flexDirection: 'row',
        borderBottomColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    fakerStyle: {
        flex: 0.5
    }
};

export { ImageInput };
