import React from 'react';
import {View, Dimensions} from 'react-native';
import MapView from 'react-native-maps';

const {width, height} = Dimensions.get('window');

class PinMap extends React.Component {
  render() {
    const ASPECT_RATIO = width / height;
    const LATITUDE = this.props.latitude;
    const LONGITUDE = this.props.longitude;
    const LATITUDE_DELTA = 0.02; // zoom
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    const INITIAL_REGION = {
      name: 'kitchhike',
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };
    const COORDINATE = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
    };

    return (
      <View style={Styles.container} testID={this.props.testID}>
        <MapView style={Styles.map} initialRegion={INITIAL_REGION}>
          <MapView.Marker coordinate={COORDINATE} />
        </MapView>
      </View>
    );
  }
}

const Styles = {
  container: {
    flex: 1,
    backgroundColor: '#000',
    height: 500,
  },
  map: {
    width: '100%',
    height: '100%',
  },
};

export default PinMap;
