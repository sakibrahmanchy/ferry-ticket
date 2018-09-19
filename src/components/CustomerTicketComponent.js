import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, BackHandler, TouchableOpacity, AsyncStorage, ScrollView, ActivityIndicator } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Actions } from 'react-native-router-flux';
import { Card } from 'react-native-elements';
import { fetchHistory, fetchTicketList } from '../actions/HistoryActions';



class CustomerTicketComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: 1,
            ticket: [],
            dataFetched: false,
            authToken: null
        };
    }

    // componentDidMount() {  
    //     this.getItemFromAsyncStorage('token').then((token) => {
    //         if (token === null) {
    //             Actions.loginForm();
    //         } else {
    //             const authToken = "Bearer " + token;
    //             this.setState({ authToken });
    //             this.props.fetchHistory(1, authToken);
    //         }
    //     }).catch((err) => {
    //         Actions.loginForm();
    //     });
    // }

    componentWillMount() {
         //this.props.fetchHistory(2, authToken);
      
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (nextProps.ticket.success) {
          this.setState({ ticket: nextProps.ticket.data, dataFetched: true });
          console.log(this.state.historyList);
        }
        this.loadSpinner();
    }

    // getItemFromAsyncStorage = async (key) => {
    //     try {
    //         const value = await AsyncStorage.getItem(key);
    //         return value; 
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


    loadSpinner() {
        return (
          <ActivityIndicator size="large" color="#0000ff" />
        );
    }


    renderData() {
       return (
        <Card
            title={'Trip from ' + this.state.ticket.journey_text}
            titleStyle={{ fontSize: 25 }}
        >
            <Text style={{ marginBottom: 10, fontSize: 18, fontWeight: 'bold', }}>
                Ferry: {this.state.ticket.ferry} 
            </Text>
            <Text style={{ marginBottom: 10, fontSize: 15 }}>
               Departure Date Time : {this.state.ticket.departure_date_time} 
            </Text> 
            <Text style={{ marginBottom: 10, fontSize: 15 }}>
               Seat number: {this.state.ticket.seat} 
            </Text> 
            <Text style={{ marginBottom: 10, fontSize: 18, fontWeight: 'bold' }}>
               Passenger Name: {this.state.ticket.passenger_name} 
            </Text> 
            <Text style={{ marginBottom: 10, fontSize: 15 }}>
                Passenger Passport No: {this.state.ticket.passenger_passport_no} 
            </Text>
            <Text style={{ marginBottom: 10, fontSize: 15 }}>
                Passenger Passport Expiry Date : {this.state.ticket.passenger_passport_exp} 
            </Text>
            <View style={{ alignContent: 'center', alignItems: 'center', marginTop: 20 }}>
                <QRCode
                    value={this.state.ticket.barcode}
                />
            </View>
        </Card>
       );
    }

    render() {
        console.log('rendered');
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flexDirection: 'row', backgroundColor: 'blue', borderColor: 'blue', borderWidth: 0.5, padding: 15 }}>            
                    {/* <TouchableOpacity style={this.state.activeTab === 1 ? styles.activeTab : styles.inactiveTab} onPress={() => this.changeTab(1)}><Text style={styles.textStyle}>Upcoming</Text></TouchableOpacity>
                    <TouchableOpacity style={this.state.activeTab === 2 ? styles.activeTab : styles.inactiveTab} onPress={() => this.changeTab(2)}><Text style={styles.textStyle}>Previous</Text></TouchableOpacity> */}
                    <Text style={{ color: 'white', fontSize: 20 }}>Ticket Information</Text>
                </View>
                { this.state.dataFetched ? this.renderData() : this.loadSpinner() }
            </View>
        );
    }
}

const styles = {
    activeTab: {
        flex: 0.5,  
        borderBottomColor: 'white',
        borderBottomWidth: 2,
    },
    inactiveTab: {
        flex: 0.5,
    },
    textStyle: 
    {
        color: 'white',
        textAlign: 'center', 
        padding: 15
    },
    subtitleView: {
        flexDirection: 'column',
        paddingLeft: 10,
        paddingTop: 5
    },
};

const mapStateToProps = ({ history }) => {

    const { ticket } = history;

    return { ticket };
};


// export default LoginForm;
export default connect(mapStateToProps, { fetchHistory, fetchTicketList })(CustomerTicketComponent);
