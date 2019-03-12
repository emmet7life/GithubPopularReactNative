/**
 * Sample React Native HomePage
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

// View
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
// Icon
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Entypo from 'react-native-vector-icons/Entypo';
// // Page
// import PopularPage from './PopularPage';
// import TrendingPage from './TrendingPage';
// import FavoritePage from './FavoritePage';
// import MyPage from './MyPage';
//
// import {
//     createBottomTabNavigator,
//     createAppContainer
// } from "react-navigation";
// Page
import DynamicTabNavigator from '../navigator/DynamicTabNavigator';

import NavigationUtil from "../navigator/NavigationUtil";

type Props = {};
export default class HomePage extends Component<Props> {
  render() {
      // const {navigation} = this.props;
      NavigationUtil.navigation = this.props.navigation;
      return <DynamicTabNavigator/>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  home: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});