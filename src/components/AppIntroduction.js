import React, { Component } from 'react';
import { Alert } from 'react-native';
import AppIntro from 'react-native-app-intro'; 
import { connect } from 'react-redux';
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

    render() {
        console.log(this.props);
        const pageArray = SliderConsts;
        return (
            <AppIntro
                onNextBtnClick={this.nextBtnHandle}
                onDoneBtnClick={this.doneBtnHandle}
                onSkipBtnClick={this.onSkipBtnHandle}
                onSlideChange={this.onSlideChangeHandle}
                pageArray={pageArray}
            />
        );
    }
}


const mapStateToProps = state => {  
    const finished = state.appIntroduction.finished;
    return { finished }; 
};

export default connect(mapStateToProps, actions)(AppIntroduction);
