import React from 'react';
import {StyleSheet} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

const Loading = () => {
  return <SafeAreaView style={styles.container}></SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default Loading;
