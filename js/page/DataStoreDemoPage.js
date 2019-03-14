/**
 * Sample React Native FavoritePage
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, TextInput} from 'react-native';
import DatStore from '../expand/dao/DataStore';

type Props = {};

// 离线缓存示例页
export default class DataStoreDemoPage extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            showText: ''
        }
    }

    loadData = () => {
        let url = `https://api.github.com/search/repositories?q=${this.searchKey}`;
        const dataStore = new DatStore();
        dataStore.fetchData(url)
            .then(wrapData => {
                const fetchedData = `Time: ${new Date(wrapData.timestamp)}\nData:${JSON.stringify(wrapData.data)}`;
                this.setState({
                    showText: fetchedData
                });
            })
            .catch(error => {
                error && console.log(error.toString());
                this.setState({
                    showText: `获取失败！\n${error.toString()}`
                });
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Fetch 使用</Text>
                <View style={styles.input_container}>
                    <TextInput style={styles.input}
                               onChangeText={text => {
                                   this.searchKey = text;
                               }}
                    />
                    <Button title='搜索'
                            onPress={() => {
                                this.loadData();
                            }}
                    />
                </View>
                <Text>{this.state.showText}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    input_container: {
        flexDirection: 'row',
        backgroundColor: '#FFF'
    },
    input: {
        height: 30,
        borderColor: 'black',
        borderWidth: 1,
        flex: 1,
    }
});