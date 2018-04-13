import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Card, CardSection } from './common';

class TripItem extends Component {

    constructor(props) {
        super(props);
        console.log(this.props);
    }
    
    componentWillMount() {
        console.log(this.props);
    }

    render() {
      return (
        <View>
            <Card>
                <CardSection>
                    <Image style={{ flex: 1, height: undefined, width: undefined, resizeMode: 'contain' }} source={this.props.image_url} />
                    <Text style={{ fontSize: 20, padding: 10 }}>Brittanny Ferries</Text>
                </CardSection>
            </Card>
        </View>
      );
    }
}

export default TripItem;
