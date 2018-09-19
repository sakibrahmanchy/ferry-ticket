import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import {
    userNameChanged, 
    emailChanged, 
    passwordChanged,
    confirmPasswordChanged,    
    loginUser 
} from '../../actions/loginActions'; 
import UserInput from '../loginComponents/UserInput';

import usernameImg from '../images/username.png';
import passwordImg from '../images/password.png';
import mailImg from '../images/mail.png';
import eyeImg from '../images/eye_black.png';

class RegisterInnerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
    };
    this.showPass = this.showPass.bind(this);
  }

  showPass() {
    this.state.press === false
      ? this.setState({showPass: false, press: true})
      : this.setState({showPass: true, press: false});
  }

  onUserNameChange(text) {
      this.props.userNameChanged(text);
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
     this.props.passwordChanged(text);
  }

  onPasswordConfirmationChange(text) {
      this.props.confirmPasswordChanged(text);
  }

  render() {
    return (
      <ScrollView>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <UserInput
          source={usernameImg}
          placeholder="Name"
          autoCapitalize={'none'}
          returnKeyType={'done'}
          autoCorrect={false}
          style={{ marginBottom: 50 }}
          onChangeText={this.onUserNameChange.bind(this)}
          value={this.props.name}
        />
        <UserInput
          source={mailImg}
          placeholder="Email"
          autoCapitalize={'none'}
          returnKeyType={'done'}
          autoCorrect={false}
          style={{ marginBottom: 50 }}
          onChangeText={this.onEmailChange.bind(this)}
          value={this.props.email}
        />
        <UserInput
          source={passwordImg}
          secureTextEntry={this.state.showPass}
          placeholder="Password"
          returnKeyType={'done'}
          autoCapitalize={'none'}
          autoCorrect={false}
          onChangeText={this.onPasswordChange.bind(this)}
          value={this.props.password}
        />
        <UserInput
          source={passwordImg}
          secureTextEntry={this.state.showPass}
          placeholder="Confirm Password"
          returnKeyType={'done'}
          autoCapitalize={'none'}
          autoCorrect={false}
          onChangeText={this.onPasswordConfirmationChange.bind(this)}
          value={this.props.password_confirmation}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btnEye}
          onPress={this.showPass}>
          <Image source={eyeImg} style={styles.iconEye} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 120,
    top: 20
  },
  btnEye: {
    position: 'absolute',
    top: 105,
    right: 28,
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)',
  },
});


const mapStateToProps = ({ auth }) => {
  const { name, email, password, password_confirmation, error, loading } = auth;
    console.log(auth);

  return { email, password, error, loading };
};


// export default LoginForm;
export default connect(mapStateToProps, {
    userNameChanged, emailChanged, passwordChanged, confirmPasswordChanged, loginUser
})(RegisterInnerForm);
