import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
} from 'react-native';

import MapView from 'react-native-maps';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Geolocation from '@react-native-community/geolocation';
var {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      location: '',
      region: {
        latitude: '',
        longitude: '',
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    };
  }

  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
  }

  onRegionChange(region) {
    this.setState({region});
  }

  async componentDidMount() {
    //    const location = await this.getCurrentPos(10000).catch(error => {
    //      this.setState({error});
    //    });
    //    this.setState({location});

    Geolocation.getCurrentPosition(
      position => {
        const initialRegion = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        this.setState({
          region: initialRegion,
        });
        this.initialRegion = initialRegion;
      },
      error => alert(error.message),
      {enableHighAccuracy: true, timeout: 2000, maximumAge: 0},
    );

    this.watchID = Geolocation.watchPosition(
      position => {
        const newRegion = {
          latitude: position.coords.latitude + 0.0004,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };

        this.onRegionChange(newRegion);
      },
      error => console.log(error),
      {distanceFilter: 1},
    );
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
    const {location, error, region} = this.state;
    //    if (location) {
    //      const LATITUDE = location.coords.latitude;
    //      const LONGITUDE = location.coords.longitude;
    return (
      <View style={{flex: 1}} testID="home">
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{flex: 1}}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.body}>
              {!!region && (
                <View style={{flex: 1}}>
                  <MapView
                    style={styles.map}
                    initialRegion={this.initialRegion}
                    region={region}
                    onRegionChange={this.onRegionChange.bind(this)}>
                    <MapView.Marker
                      image={require('./map_pin_car.png')}
                      coordinate={{
                        latitude: region.latitude,
                        longitude: region.longitude,
                      }}
                    />
                  </MapView>
                  <View style={{flex: 1}}>
                    <Text>{`location: ${JSON.stringify(region)}`}</Text>
                    {Object.keys(region).map(key => {
                      return (
                        <Text key={key}>
                          {key} : {region[key]}
                        </Text>
                      );
                    })}
                  </View>
                </View>
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
  map: {
    width: '100%',
    height: 700,
  },
});

export default App;
