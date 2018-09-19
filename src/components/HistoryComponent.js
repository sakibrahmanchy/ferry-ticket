import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, BackHandler, TouchableOpacity, AsyncStorage, ScrollView, ActivityIndicator, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ListItem, Avatar } from 'react-native-elements';
import { fetchHistory, fetchTicketList } from '../actions/HistoryActions';



class HistoryComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: 1,
            historyList: [],
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
                this.props.fetchHistory(1, authToken);
            }
        }).catch((err) => {
            Actions.loginForm();
        });
    }

    componentWillMount() {
         //this.props.fetchHistory(2, authToken);
      
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.historyList.success) {
          this.setState({ historyList: nextProps.historyList.data, dataFetched: true });
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

    fetchTicketList(orderId, tripId) {
        this.props.fetchTicketList(orderId, tripId, this.state.authToken);
        Actions.ticketList();
    }

    renderTrips() {
        return (
            <ImageBackground
                source={require('../images/history_page_background.png')}
                style={styles.container}
            >
            <ScrollView style={{ flex: 1 }}>
                {
                    this.state.historyList.map((l, i) => (
                        <TouchableOpacity key={i}>
                            <ListItem
                            roundAvatar
                            key={i}
                            onPress={() => this.fetchTicketList(l.order_id, l.trip_id)}
                            avatar={{ uri: l.image_url }}
                            title={'Trip to: ' + l.journey_text}
                            subtitle={
                                <View style={styles.subtitleView}>
                                    <Text>Ferry: {l.ferry_name}</Text>
                                    <Text style={{ paddingTop: 5 }}>Date: {l.date}</Text>
                                </View>
                            } 
                            />
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
            </ImageBackground>
        );
    }

    render() {
        console.log('rendered');
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flexDirection: 'row', backgroundColor: 'blue', borderColor: 'blue', borderWidth: 0.5 }}>            
                    <TouchableOpacity style={this.state.activeTab === 1 ? styles.activeTab : styles.inactiveTab} onPress={() => this.changeTab(1)}><Text style={styles.textStyle}>Upcoming</Text></TouchableOpacity>
                    <TouchableOpacity style={this.state.activeTab === 2 ? styles.activeTab : styles.inactiveTab} onPress={() => this.changeTab(2)}><Text style={styles.textStyle}>Previous</Text></TouchableOpacity>
                </View>
                { this.state.dataFetched ? this.renderTrips() : this.loadSpinner() }
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
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

    const { historyList } = history;

    return { historyList };
};


// export default LoginForm;
export default connect(mapStateToProps, { fetchHistory, fetchTicketList })(HistoryComponent);
