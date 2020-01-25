import React from 'react';
import {StyleSheet, View, Text, TouchableHighlight} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

import Home from './Home';
import Player from './Player';
import Mypage from './Mypage';

FOOTER_TABS = {
  home: 'Home',
  player: 'Player',
  mypage: 'Mypage',
};

class Maintab extends React.Component {
  static navigationOptions = {header: null};

  constructor(props) {
    super(props);
    this.state = {
      page: FOOTER_TABS.home,
    };
  }

  footerTabAction = page => {
    this.setState({page});
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.renderContainer()}

        {this.renderFooter()}
      </SafeAreaView>
    );
  }

  renderFooter = () => {
    const {page} = this.state;
    return (
      <View style={styles.footer}>
        {Object.keys(FOOTER_TABS).map((tabKey, i) => {
          const isActive = page == FOOTER_TABS[tabKey];
          const activeStyle = isActive ? {backgroundColor: '#828282'} : {};
          return (
            <TouchableHighlight
              style={[styles.footerTab, activeStyle]}
              onPress={() => this.footerTabAction(FOOTER_TABS[tabKey])}>
              <Text>{FOOTER_TABS[tabKey]}</Text>
            </TouchableHighlight>
          );
        })}
      </View>
    );
  };

  renderContainer = () => {
    switch (this.state.page) {
      case FOOTER_TABS.home:
        return <Home />;
      case FOOTER_TABS.player:
        return <Player />;
      case FOOTER_TABS.mypage:
        return <Mypage />;
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default Maintab;
