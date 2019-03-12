/**
 * Sample React Native WelcomePage
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList} from 'react-native';

type Props = {};
const CITY_NAMES = ['北京', '上海', '天津', '北京', '上海', '天津', '北京', '上海', '天津'];
export default class FlatListDemo extends Component<Props> {

  _renderItem(data) {
    return <View style={styles.item}>
      <Text style={styles.text}>{data.item}</Text>
    </View>
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={CITY_NAMES}
          renderItem={(data)=>this._renderItem(data)}
        ></FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: '#169',
    height: 200,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
