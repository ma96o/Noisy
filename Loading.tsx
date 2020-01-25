import React from 'react';
import {StyleSheet, View, TouchableHighlight, Text} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {StackActions} from 'react-navigation';
class Loading extends React.Component {
  static navigationOptions = {
    header: null,
  };

  nextAction = () => {
    this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [StackActions.push({routeName: 'Maintab'})],
      }),
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableHighlight
          style={styles.logoContainer}
          onPress={this.nextAction}>
          <Text style={styles.logoText}>Noisy</Text>
        </TouchableHighlight>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
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

export default Loading;
