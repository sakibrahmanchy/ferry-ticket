import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Card, CardSection } from './common';

class TripItem extends Component {

    render() {
      return (
        <View>
            <Card>
                <CardSection>
                    <Text>{this.props.item.name}</Text> 
                </CardSection>
            </Card>
        </View>
      );
    }
}

export default TripItem;
