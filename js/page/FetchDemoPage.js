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
import {connect} from 'react-redux';
import actions from '../action';

type Props = {};

// Fetch简单使用示例页
export default class FetchDemoPage extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            showText: ''
        }
    }

    loadData = () => {
        let url = `https://api.github.com/search/repositories?q=${this.searchKey}`;
        fetch(url).then(response => {
            if (response.ok) {
                return response.text();
            }
            throw new Error('Network response was not ok!');
        }).then(responseString => {
            this.setState({
                showText: responseString
            });
        }).catch(e => {
            this.setState({
                showText: e.toString()
            });
        })
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