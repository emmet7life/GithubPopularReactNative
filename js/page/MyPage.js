/**
 * Sample React Native MyPage
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {connect} from 'react-redux';
import actions from '../action';
import NavigationUtil from "../utils/NavigationUtil";

type Props = {};

// 我的页
class MyPage extends Component<Props> {
    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.text}>MyPage</Text>
                <Button
                    title='改变主题色'
                    onPress={() => {
                        this.props.onThemeChanged('#570');
                    }}
                />
                <Button
                    title='跳转到详情页'
                    onPress={() => {
                        NavigationUtil.goPage("DetailPage");
                    }}
                />
                <Button
                    title='跳转到Fetch页'
                    onPress={() => {
                        NavigationUtil.goPage("FetchDemoPage");
                    }}
                />
                <Button
                    title='跳转到DataStore页'
                    onPress={() => {
                        NavigationUtil.goPage("DataStoreDemoPage");
                    }}
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    onThemeChanged: tintColor => {
        dispatch(actions.onThemeChange(tintColor));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});