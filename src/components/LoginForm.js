import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, BackHandler } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { emailChanged, passwordChanged, loginUser } from '../actions/loginActions'; 
import Logo from './loginComponents/Logo';
import Form from './loginComponents/Form';
import Wallpaper from './loginComponents/Wallpaper';
import ButtonSubmit from './loginComponents/ButtonSubmit';
import SignupSection from './loginComponents/SignupSection';

class LoginForm extends Component {

    constructor(props) {
        super(props);
        BackHandler.addEventListener('hardwareBackPress', () => {
            Actions.dashboard(); // works best when the goBack is async
            return true;
        });
    }

    onEmailChange(text) {
       this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onButtonPress() {
        const { email, password } = this.props;

        this.props.loginUser({ email, password });
    }

    onRenderError() {   
        if (this.props.error) {
            return (
                <View style={{ backgroundColor: 'white' }}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            );
        }
    }

    // renderButton() {
    //     if (this.props.loading) {
    //        return <Spinner size="large" />;
    //     } 
    //         return (
    //             <Button onPress={this.onButtonPress.bind(this)}>Login</Button>
    //         );   
    // }


    render() {
        return (
            <Wallpaper>
                {this.onRenderError}
                <Logo />
                <Form />
                <SignupSection />
                <ButtonSubmit />
            </Wallpaper>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading } = auth;

    return { email, password, error, loading };
};


// export default LoginForm;
export default connect(mapStateToProps, {
     emailChanged, passwordChanged, loginUser
 })(LoginForm);
