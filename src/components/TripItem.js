import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Card, CardSection } from './common';

class TripItem extends Component {

    render() {
      return (
        <View>
            <Card>
                <CardSection style={this.props.selectedTrip ? { backgroundColor: 'lightblue' } : {}}>
                <Image 
                    style={{ flex: 0.2, height: 100, width: 20, resizeMode: 'contain' }} 
                    source={{ uri: this.props.item.image_url }} 
                />
                    <View style={{ flexDirection: 'column', flex: 0.8, paddingLeft: 10 }}>
                        <Text 
                            style={{ fontSize: 20, fontWeight: 'bold' }}
                        >
                            {this.props.item.comapany_name}
                        </Text>
                        <Text 
                            style={{ fontSize: 15 }}
                        >
                            {this.props.item.ferry_name}
                        </Text>
                        <Text 
                            style={{ fontSize: 15 }}
                        >
                            Seats left: {this.props.item.remaining_seat}
                        </Text>
                        <Text 
                            style={{ fontSize: 15 }}
                        >
                            Departure Date: {this.props.item.departure_date}, {this.props.item.departure_time}
                        </Text>
                    </View>
                </CardSection>
            </Card>
        </View>
      );
    }
}

export default TripItem;
