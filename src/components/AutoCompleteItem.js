import React, { Component } from 'react';
import { Text, TouchableOpacity, View, LayoutAnimation, UIManager } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection } from './common';
import { 
    selectDeparture,
    selectDestination 
} from '../actions/TripSearchActions';

class AutoCompleteItem extends Component {

    constructor(props) {
        super(props);
        console.disableYellowBox = true;
    }

    componentWillUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && 
        UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();
    }

    selectPort(port) {
        if (this.props.portType === 'departure') {
            this.props.selectDeparture(port);
        }   
        else if (this.props.portType === 'destination') {
            this.props.selectDestination(port);
        }
    }

    render() {
        const { titleStyle, descriptionStyle } = styles;
        
        return (
            <TouchableOpacity onPress={() => this.selectPort(this.props.port)}>
                <View>
                    <CardSection>
                       <View>
                            <Text style={titleStyle}>
                                {this.props.port.city_name}
                            </Text>
                            <Text style={descriptionStyle}>
                                {this.props.port.name}
                            </Text>
                        </View>
                    </CardSection>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15,
        color: 'black'
    },
    descriptionStyle: {
        fontSize: 16,
        paddingLeft: 15,
        color: 'grey'
    }
};

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps, { selectDeparture, selectDestination })(AutoCompleteItem);
