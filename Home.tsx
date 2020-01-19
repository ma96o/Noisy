import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

class Home extends React.Component {
  static navigationOptions = {};

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Home</Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.footerTab}>
            <Text>Home</Text>
          </View>
          <View style={styles.footerTab}>
            <Text>Mypage</Text>
          </View>
        </View>
      </SafeAreaView>
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
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 80,
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',

    shadowColor: 'rgba(61, 10, 0, 1)',
    shadowOffset: {width: 0, height: -3},
    shadowOpacity: 0.08,
    shadowRadius: 1,
    elevation: 16,
  },
  footerTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
