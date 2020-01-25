import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

class Home extends React.Component {
  static navigationOptions = {};

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Home</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    height: 200,
    width: 200,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  logoText: {
    fontSize: 50,
    color: 'black',
  },
});

export default Home;
