import React from 'react';
import { Modal, View, Text, TouchableNativeFeedback } from 'react-native';

const renderItems = (callback, list) => {
    const items = [];
    const { textStyle, textHolderStyle } = styles;
    
    for (const i in list) {
        items.push(
            <TouchableNativeFeedback 
                style={textHolderStyle} 
                onPress={() => { callback(i); }}
                key={i}
            >
                <View style={textHolderStyle}>
                    <Text style={textStyle}>{list[i]}</Text>
                </View>
            </TouchableNativeFeedback>
        );
    }   
    return items;
};


const ItemPicker = ({ modalVisible, onClose, callback, list }) => {
    const { containerStyle, holderStyle } = styles;
    
    return (
            <Modal
                animationType="fade"
                transparent
                visible={modalVisible}
                onRequestClose={onClose}
                onPress={onClose}
            >
                <View style={containerStyle}>
                    <View style={holderStyle}>
                        { renderItems(callback, list) }
                    </View>
                </View>
            </Modal>
    );
};

const styles = {
    textHolderStyle: {
        flex: 1
    },
    textStyle: {
        fontSize: 18,
        justifyContent: 'center',
        textAlign: 'center'
    },
    containerStyle: {
        backgroundColor: 'rgba(0,0,0, 0.7)',
        position: 'relative',
        flex: 1,
        padding: 30,
        justifyContent: 'center'
    },
    holderStyle: {
        shadowColor: 'red',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 4,
        shadowRadius: 10,
        elevation: 10,
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#fff',
    }
};

export { ItemPicker };
