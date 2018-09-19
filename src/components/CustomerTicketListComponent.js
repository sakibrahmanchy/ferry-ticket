import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, BackHandler, TouchableOpacity, AsyncStorage, ScrollView, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ListItem, Avatar } from 'react-native-elements';
import { fetchHistory, fetchTicket } from '../actions/HistoryActions';



class CustomerTicketListComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: 1,
            ticketList: [],
            dataFetched: false,
            authToken: null
        };
    }

    componentDidMount() {  
        this.getItemFromAsyncStorage('token').then((token) => {
            if (token === null) {
                Actions.loginForm();
            } else {
                const authToken = "Bearer " + token;
                this.setState({ authToken });
            }
        }).catch((err) => {
            Actions.loginForm();
        });
    }

    componentWillMount() {
         //this.props.fetchHistory(2, authToken);
      
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (nextProps.ticketList.success) {
          this.setState({ ticketList: nextProps.ticketList.data, dataFetched: true });
          console.log(this.state.historyList);
        }
        this.loadSpinner();
    }

    getItemFromAsyncStorage = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            return value; 
        } catch (error) {
            console.log(error);
        }
    }

    changeTab(tabId) {
        this.setState({ dataFetched: false }); 
        if (tabId === 1) {
            this.setState({ activeTab: 1 });
            this.props.fetchHistory(1, this.state.authToken);
        }
        else {
            this.setState({ activeTab: 2 });
            this.props.fetchHistory(2, this.state.authToken);
        } 
    }

    loadSpinner() {
        return (
          <ActivityIndicator size="large" color="#0000ff" />
        );
    }

    fetchTicket(ticketId) {
        this.props.fetchTicket(ticketId, this.state.authToken);
        Actions.ticket();
    }

    renderTrips() {
        return (
            <ScrollView style={{ flex: 1 }}>
                {
                    this.state.ticketList.map((l, i) => (
                        <TouchableOpacity key={i} onPress={() => this.fetchTicket(l.ticket_id)}>
                            <ListItem
                            // roundAvatar
                            key={i}
                            // onPress={() => this.fetchTicketList(l.order_id, l.trip_id)}
                            // avatar={{ uri: l.image_url }}
                            title={'Ticket of ' + l.name}
                            // subtitle={
                            //     <View style={styles.subtitleView}>
                            //         <Text>Ferry: {l.ferry_name}</Text>
                            //         <Text style={{ paddingTop: 5 }}>Date: {l.date}</Text>
                            //     </View>
                            // } 
                            />
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        );
    }

    render() {
        console.log('rendered');
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flexDirection: 'row', backgroundColor: 'blue', borderColor: 'blue', borderWidth: 0.5, padding: 15 }}>            
                    {/* <TouchableOpacity style={this.state.activeTab === 1 ? styles.activeTab : styles.inactiveTab} onPress={() => this.changeTab(1)}><Text style={styles.textStyle}>Upcoming</Text></TouchableOpacity>
                    <TouchableOpacity style={this.state.activeTab === 2 ? styles.activeTab : styles.inactiveTab} onPress={() => this.changeTab(2)}><Text style={styles.textStyle}>Previous</Text></TouchableOpacity> */}
                    <Text style={{ color: 'white', fontSize: 20 }}>Ticket List</Text>
                </View>
                { this.state.dataFetched ? this.renderTrips() : this.loadSpinner() }
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

    const { ticketList } = history;

    return { ticketList };
};


// export default LoginForm;
export default connect(mapStateToProps, { fetchHistory, fetchTicket })(CustomerTicketListComponent);
