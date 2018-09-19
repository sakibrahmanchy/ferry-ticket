import React, { Component } from 'react';
import { ImageBackground } from 'react-native';

import bgSrc from '../images/wallpaper.png';

export default class Wallpaper extends Component {
  render() {
    return (
      <ImageBackground style={styles.picture} source={bgSrc}>
        {this.props.children}
      </ImageBackground>
    );
  }
}

const styles = {
  picture: {
    flex: 1,
    width: null,
    height: null,
  },
};
