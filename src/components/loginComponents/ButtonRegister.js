import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, registerUser } from '../../actions/loginActions'; 
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
  Image,
  Alert,
  View,
  Dimensions,
  Keyboard,
  ActivityIndicator
} from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';

import spinner from '../images/loading.gif';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

class ButtonRegister extends Component {
  constructor() {
    super();
    console.log(this.props);
    this.state = {
      isLoading: false,
      keyboardShown: false
    };

    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
    this._onPress = this._onPress.bind(this);
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    if (this.props.token !== null) {
      this.onSuccess();
    } 
  }

  componentDidUpdate() {
    if (this.props.token !== null) {
      this.onSuccess();
    }
  }

  _keyboardDidShow(e) {
    this.setState({ keyboardShown: true });
  }

  _keyboardDidHide(e) {
    this.setState({ keyboardShown: false });
  }

  _onPress() {
    const { name, email, password, password_confirmation } = this.props;
    this.props.registerUser({ name, email, password, password_confirmation });
  }

  _onGrow() {
    Animated.timing(this.growAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start(onComplete => { 
      Actions.ticketSearch();
    });
  }

  onRenderError() {   
      if (this.props.error) {
          return (
              <View style={{ top: 40, backgroundColor: 'red', borderColor: 'red', borderRadius: 10, borderWidth: 5 }}>
                  <Text style={{ color: 'white' }}>
                      {this.props.error}
                  </Text>
              </View>
          );
      }
  }

  onSuccess() {
    if (this.props.token !== null) {
        setTimeout(() => {
          this._onGrow();
        }, 200);
    }
  }

  render() {
    const changeWidth = this.buttonAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [DEVICE_WIDTH - MARGIN, MARGIN],
    });
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, MARGIN],
    });

    return (
      <View style={ this.state.keyboardShown ? styles.containerPulledDown : styles.container}>
       
            {this.props.loading ? (
              <ActivityIndicator color="black"/>
            ) : (
              <Animated.View style={{ width: changeWidth }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={this._onPress}
                  activeOpacity={1}>
                  {this.props.loading ? (
                     <ActivityIndicator color="black" />)
                    : (
                    <Text style={styles.text}>REGISTER</Text> 
                  )}    
                </TouchableOpacity>
                <Animated.View
                    style={[styles.circle, { transform: [{ scale: changeScale }] }]}
                />
                </Animated.View>
            )}
        {this.onRenderError()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: -150,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'darkblue',
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,
  },
  containerPulledDown: {
    flex: 1,
    top: -90,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  circle: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderWidth: 1,
    borderColor: 'darkblue',
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 99,
    backgroundColor: 'darkblue',
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  image: {
    width: 24,
    height: 24,
  },
});


const mapStateToProps = ({ auth }) => {
  const { name, email, password, password_confirmation, token, error, loading } = auth;

  return { name, email, password, password_confirmation, token, error, loading };
};


// export default LoginForm;
export default connect(mapStateToProps, {
   emailChanged, passwordChanged, loginUser, registerUser
})(ButtonRegister);
