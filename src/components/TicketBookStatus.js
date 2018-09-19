import React, { Component } from 'react';
import { View, Linking, BackHandler } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { PricingCard } from 'react-native-elements';

// const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

class TicketBookStatus extends Component {
    
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        BackHandler.addEventListener('hardwareBackPress', () => {
            Actions.dashboard(); // works best when the goBack is async
            return true;
        });
        // console.log(this.props.data);
    }

    render() {
        return (
            <View style={{ flex: 1, }}>
                <View style={{ flex: 1, backgroundColor: 'green', justifyContent: 'center' }}>
                    <PricingCard
                        color='green'
                        title='Ticket Confirmed'
                        info={['All tickets are non refundable', 'All rights reserved to bvigrimscloud.com', 'Visit www.bvigrimscloud.com for more info' ]}
                        button={{ title: 'Download  Ticket', icon: 'file-download' }}
                        onButtonPress={() => { Linking.openURL(this.props.data.data.print_url); }}
                    />
                </View>
            </View>
        );
    }
}

export default TicketBookStatus;
