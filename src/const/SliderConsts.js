const styles = {
    image: {
      width: 320,
      height: 320,
    },
    titleStyle: {
      fontWeight: 'bold',
      fontSize: 30,
      fontFamily: 'monospace',
      paddingTop: 20
    },
    textStyle: {
      fontSize: 15,
      fontFamily: 'monospace',
      paddingTop: -40
    },
  };


export default(
    [{
        key: 'somethun',
        title: 'READY TO TRAVEL?',
        text: 'Choose your destination, plan your trip, pick the best ferry for your holiday.',
        image: require('../assets/app-intro/7.jpg'),
        imageStyle: {
          width: 320, 
          height: 400,
        },
        titleStyle: {
          fontWeight: 'bold',
          fontSize: 30,
          fontFamily: 'monospace',
          paddingTop: 20,
          color: 'white'
        },
        textStyle: {
          fontSize: 15,
          fontFamily: 'monospace',
          paddingTop: -40,
          color: 'white'
        }, 
        backgroundColor: '#45BDBC',
      },
      {
        key: 'somethun1',
        title: 'PLAN A TRIP',
        text: 'Hasle-free and quick booking to a variety number of destinations',
        image: require('../assets/app-intro/1.jpg'),
        titleStyle: styles.titleStyle,
        textStyle: styles.textStyle,
        imageStyle: {
          width: 320,
          height: 400,
        },
        backgroundColor: '#59B2AC',
      },
      {
        key: 'somethun-dos',
        title: 'Stay Connected',
        titleStyle: styles.titleStyle,
        textStyle: styles.textStyle,
        text: 'Access your trips from any where, no matter the device is cellphone or pc.',
        image:  require('../assets/app-intro/2.jpeg'),
        imageStyle:  {
          width: 320,
          height: 320,
        },
        backgroundColor: '#45BDBC',
      },
    ]
);
