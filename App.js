import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Dimensions,
} from 'react-native';

import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
var {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: null,
    };
  }

  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
  }

  async componentDidMount() {
    const {coords} = await this.getCurrentPos().catch(error => {
      alert(error.message);
    });
    this.setState({coords});

    this.watchID = Geolocation.watchPosition(
      position => {
        this.setState({coords: position.coords});
      },
      error => alert(error.message),
      {enableHighAccuracy: true, distanceFilter: 1},
    );
  }

  getCurrentPos() {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
      });
    });
  }

  render() {
    const {coords} = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          {coords && (
            <MapView
              style={styles.map}
              region={{
                latitude: coords.latitude,
                longitude: coords.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}>
              <MapView.Marker
                image={require('./map_pin_car.png')}
                coordinate={{
                  latitude: coords.latitude + 0.0003,
                  longitude: coords.longitude,
                }}
              />
              <View
                style={{
                  backgroundColor: '#fff',
                  opacity: 0.8,
                }}>
                <Text>{`coords: {`}</Text>
                {Object.keys(coords).map(key => {
                  return <Text key={key}>{`  ${key} : ${coords[key]}`}</Text>;
                })}
                <Text>{`}`}</Text>
              </View>
            </MapView>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
  },
  map: {
    flex: 1,
    width,
    height,
  },
});

export default App;
