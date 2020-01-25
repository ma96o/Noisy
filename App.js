import React from 'react';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Loading from './Loading';
import Maintab from './Maintab';
import CurrentUserMapView from './CurrentUserMapView';
import TrackUserMapView from './TrackUserMapView';

const MainNavigator = createStackNavigator(
  {
    Loading: {screen: Loading},
    Maintab: {screen: Maintab},
    CurrentUserMapView: {screen: CurrentUserMapView},
    TrackUserMapView: {screen: TrackUserMapView},
  },
  {
    initialRouteName: 'Loading',
  },
);

const App = createAppContainer(MainNavigator);

export default App;
