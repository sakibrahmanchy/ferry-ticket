import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { CardSection } from './CardSection';

const ItemPicker = ({ modalVisible }) => {
    const { containerStyle, textStyle, CardSectionStyle } = styles;

    return (
            <Modal
                animationType={'slide'}
                transparent
                visible={modalVisible}
                onRequestClose={() => {
                   console.log('Modal has been closed');
                }}
            >
                <View style={containerStyle}>
                    <CardSection style={CardSectionStyle}>
                        <Text style={textStyle}>1</Text>
                        <Text style={textStyle}>2</Text>
                        <Text style={textStyle}>3</Text>
                        <Text style={textStyle}>4</Text>
                        <Text style={textStyle}>5</Text>
                        <Text style={textStyle}>6</Text>
                        <Text style={textStyle}>7</Text>
                        <Text style={textStyle}>8</Text>
                    </CardSection>
                </View>
            </Modal>
        
    );
};

const styles = {
    CardSectionStyle: {
        justifyContent: 'center'
    },
    textStyle: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40
    },
    containerStyle: {
        backgroundColor: 'rgba(0,0,0,0.75)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center'
    }
};

export { ItemPicker };
