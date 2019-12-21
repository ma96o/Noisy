import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import PinMap from './PinMap';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Geolocation from '@react-native-community/geolocation';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      location: '',
    };
  }

  async componentDidMount() {
    const location = await this.getCurrentPos(10000).catch(error => {
      this.setState({error});
    });
    this.setState({location});
  }

  getCurrentPos(timeout = 5000) {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(resolve, reject, {
        timeout,
        enableHighAccuracy: true,
      });
    });
  }

  render() {
    const {location, error} = this.state;
    let mapModalContent;
    if (location) {
      const LATITUDE = location.coords.latitude;
      const LONGITUDE = location.coords.longitude;
      mapModalContent = (
        <PinMap
          latitude={LATITUDE}
          longitude={LONGITUDE}
          address={''}
          navigation={this.props.navigation}
        />
      );
    }
    return (
      <View style={{flex: 1}} testID="home">
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{flex: 1}}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.body}>
              {!!location && (
                <View style={{flex: 1}}>
                  {mapModalContent}
                  <View style={{flex: 1}}>
                    <Text>{`location: ${JSON.stringify(location)}`}</Text>
                    {Object.keys(location.coords).map(key => {
                      return (
                        <Text key={key}>
                          {key} : {location.coords[key]}
                        </Text>
                      );
                    })}
                  </View>
                </View>
              )}
              {!!error && (
                <Text>
                  error{'\n'}
                  {Object.keys(error).map(key => {
                    return (
                      <Text key={key}>
                        {key} : {error[key]}
                        {'\n'}
                      </Text>
                    );
                  })}
                </Text>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
