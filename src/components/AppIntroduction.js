import React, { Component } from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import AppIntroSlider from 'react-native-app-intro-slider'; 
import SliderConsts from '../const/SliderConsts';
import * as actions from '../actions/AppIntroductionActions';

class AppIntroduction extends Component {

    onSkipBtnHandle = (index) => {
        Alert.alert('Skip');
        console.log(index);
    }
     
    onSlideChangeHandle = (index, total) => {
        console.log(index, total);
    }

    nextBtnHandle = (index) => {
        console.log(index);
    }

    doneBtnHandle = () => {
        this.props.doneButtonClicked();
    }

    _renderNextButton = () => {
        return (
          <View style={styles.buttonCircle}>
            <Icon
              name="navigate-next"
              color="rgba(255, 255, 255, .9)"
              size={24}
              style={{ backgroundColor: 'transparent' }}
            />
          </View>
        );
      }
      _renderDoneButton = () => {
        return (
          <View style={styles.buttonCircle}>
            <Icon
              name="done"
              color="rgba(255, 255, 255, .9)"
              size={24}
              style={{ backgroundColor: 'transparent' }}
            />
          </View>
        );
      }

    render() {
        console.log(this.props);
        const pageArray = SliderConsts;
        return (
            <AppIntroSlider
                slides={pageArray}
                onDone={this.doneBtnHandle}
                renderDoneButton={this._renderDoneButton}
                renderNextButton={this._renderNextButton}
            />
        );
    }
}


const styles = StyleSheet.create({
    buttonCircle: {
      width: 40,
      height: 40,
      backgroundColor: 'rgba(0, 0, 0, .2)',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 320,
      height: 320,
    }
  });

const mapStateToProps = state => {  
    const finished = state.appIntroduction.finished;
    return { finished }; 
};

export default connect(mapStateToProps, actions)(AppIntroduction);
