import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Text, Dimensions, StyleSheet} from 'react-native';

import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';

import MapView, {Marker} from 'react-native-maps';

var {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const TrackUserMapView = () => {
  const [position, setPosition] = useState<GeolocationResponse['coords']>({
    latitude: 0,
    longitude: 0,
    accuracy: 0,
    altitude: 0,
    altitudeAccuracy: 0,
    heading: 0,
    speed: 0,
  });

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      position => setPosition(position.coords),
      err => alert(err.message),
      {enableHighAccuracy: true, timeout: 10000, distanceFilter: 1},
    );
    return () => Geolocation.clearWatch(watchId);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {position && (
        <MapView
          style={styles.map}
          region={{
            latitude: position.latitude,
            longitude: position.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}>
          <Marker
            image={require('./map_pin_car.png')}
            coordinate={{
              latitude: position.latitude + 0.0003,
              longitude: position.longitude,
            }}
          />
          <View style={styles.debugContainer}>
            <Text>{`coords: {`}</Text>
            {Object.keys(position).map(key => {
              return <Text key={key}>{`  ${key} : ${position[key]}`}</Text>;
            })}
            <Text>{`}`}</Text>
          </View>
        </MapView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  map: {
    flex: 1,
  },
  debugContainer: {
    backgroundColor: '#fff',
    opacity: 0.8,
  },
});

export default TrackUserMapView;
