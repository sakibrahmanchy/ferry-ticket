import Drawer from 'react-native-drawer'
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from './common';

class AvailableTrips extends Component {  
  closeControlPanel = () => {
    this._drawer.close()
  };
  openControlPanel = () => {
    this._drawer.open()
  };
  render () {
    return (
      <Drawer 
        type="overlay"
        ref={(ref) => this._drawer = ref}
        content={<View style={{ flex: 1, padding: 50, backgroundColor: 'blue' }}><Text>This is some text</Text></View>}
        tapToClose={true}
        openDrawerOffset={0.2} // 20% gap on the right side of drawer
        panCloseMask={0.2}
        closedDrawerOffset={0.2}
        styles={drawerStyles}
        tweenHandler={(ratio) => ({
          main: { opacity:(2-ratio)/2 }
        })}
        acceptPan 
        >
        <View style={{ flex: 1, padding: 50,  }}  >
          <Button onPress={() => this.openControlPanel()}>Drawer</Button>
        </View>
      </Drawer>
    )
  }
}

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
}
export default AvailableTrips;
