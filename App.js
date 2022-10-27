import React from "react";
import { StyleSheet, View, Text, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import Draggable from 'react-native-draggable';

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import getSlideFromRightTransition from "./config";

import Home from './src/screens/Home'
import SpriteSelect from './src/screens/SpriteSelect'
import BackgroundSelect from './src/screens/BackgroundSelect'

console.disableYellowBox = true;

const router = createStackNavigator({
  Home,
  SpriteSelect,
  BackgroundSelect
},{
  headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
    path: "Home",
    initialRouteName: "Home",
    transitionConfig: getSlideFromRightTransition,
}, {
    defaultNavigationOptions: {
    header: null,
    headerLeft: null,
    headerRight: null,
    }
});

const AppNavigator = createAppContainer(router)

export default class App extends React.Component {
  render() {
    return (
      <AppNavigator />
    )
  }
}