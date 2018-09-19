import React, { Component } from 'react';
import { View, ImageBackground, StatusBar, AsyncStorage, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { ListItem, Avatar, Text, List } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { logoutUser } from '../actions/loginActions';

const list = [
    {
        title: 'Change Password',
        icon: 'lock-open',
        key: 'change_password'
    },
    {
        title: 'My Trips',
        icon: 'flight-takeoff',
        key: 'my_trips'
    },
    {
        title: 'Logout',
        icon: 'power-settings-new',
        key: 'logout'
    }
  ];

class UserProfile extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            name: '',
            email: ''
        };
    }

    componentWillMount() {
        this.getItemFromAsyncStorage('token').then((token) => {
            if (token === null) {
                Actions.loginForm();
            } else {
                const authToken = "Bearer " + token;
                this.setState({ token: authToken });
                this.fetchProfileData();
            }
        }).catch((err) => {
            Actions.loginForm();
        });
    }

    componentWillUpdate() {
        this.getItemFromAsyncStorage('token').then((token) => {
            if (token === null) {
                Actions.loginForm();
            }
        }).catch((err) => {
            Actions.loginForm();
        });
    }

    componentWillReceiveProps(nextProps) {
       if (nextProps.token === null) {
         Actions.loginForm();
       }
    }

    fetchProfileData() {
        axios.get('http://www.bvigrimscloud.com/ferry/public/api/customer-profile', {
            headers: { Authorization: this.state.token }
        }).then((response) => {
            if (response.data.success) {
                this.setState({
                    token: this.state.token,
                    name: response.data.data.name,
                    email: response.data.data.email 
                });
            } else {
                Actions.loginForm();
            }
        }).catch((error) => {
            Actions.loginForm();
        });
    }

    onMenuItemPress(key) {
        switch (key) {
            case 'logout':
                this.props.logoutUser();
            break;
            default:
            break;
        }
    }

    getItemFromAsyncStorage = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);    
            return value; 
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <ImageBackground
            source={require('../images/profile_page_background.png')}
            style={styles.container}
            >
             <StatusBar
                backgroundColor="transparent"
                translucent
             />
                <View style={{ flex: 0.68, flexDirection: 'column', padding: 40 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                        <Avatar
                            xlarge
                            rounded
                            source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7jv9UmzDf59cG14tac2Sk56OImFbTdXqYSa06h59LWIosm7CMWQ"}}
                            onPress={() => console.log("Works!")}
                            activeOpacity={0.7}
                        />
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                        <Text h3>{ this.state.name }</Text>  
                        <Text>{ this.state.email }</Text>      
                    </View>
                </View>
                
                <List>
                {
                    list.map((item, i) => (
                        <TouchableOpacity key={i}  onPress={() => this.onMenuItemPress(item.key)}>
                            <ListItem
                                key={i}
                                title={item.title}
                                leftIcon={{ name: item.icon }}
                            />
                        </TouchableOpacity>
                    ))
                }
                </List>

            </ImageBackground>
        );
    }
}

const styles = {
    headerTextStyle: {
        backgroundColor: 'darkblue',
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        margin: 10,
        paddingTop: 15,
        height: 60
    },
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 30
    },
    selectedLocationTextStyle: {
        color: 'white',
        fontSize: 30,
    },
    dateSelectorContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 30
    }
};

const mapStateToProps = ({ auth }) => {
    const { name, email, password, error, loading, token } = auth;

    return { name, email, password, error, loading, token };
};

export default connect(mapStateToProps, { logoutUser })(UserProfile);
