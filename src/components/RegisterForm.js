import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import { emailChanged, passwordChanged, registerUser } from '../actions/loginActions'; 
import Logo from './loginComponents/Logo';
import RegisterInnerForm from './loginComponents/RegisterInnerForm';
import Wallpaper from './loginComponents/Wallpaper';
import ButtonRegister from './loginComponents/ButtonRegister';

class RegisterForm extends Component {

    onButtonPress() {
        const { name, email, password, password_confirmation } = this.props;
        
        console.log('before');

        this.props.registerUser({ name, email, password, password_confirmation });
        
        console.log('after');
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
                <RegisterInnerForm />
                <ButtonRegister />
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

    const { name, email, password, password_confirmation, error, loading } = auth;

    return { name, email, password, password_confirmation, error, loading };
};


// export default LoginForm;
export default connect(mapStateToProps, {
     emailChanged, passwordChanged, registerUser
 })(RegisterForm);
