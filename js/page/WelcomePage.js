/**
 * Sample React Native WelcomePage
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import NavigationUtil from '../utils/NavigationUtil';

type Props = {};
export default class WelcomePage extends Component<Props> {

  componentDidMount() {
    this.timer = setTimeout(() => {
        NavigationUtil.resetHomePage({
            navigation: this.props.navigation
        })
    }, 200);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
          <Text style={styles.welcome}>WelcomePage</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});