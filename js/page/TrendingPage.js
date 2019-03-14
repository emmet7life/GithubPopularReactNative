/**
 * Sample React Native TrendingPage
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

type Props = {};

// 趋势页
class TrendingPage extends Component<Props> {
    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.text}>TrendingPage</Text>
                <Button title="改变主题色"
                        onPress={() => {
                            this.props.onThemeChanged('#928');
                        }}
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    onThemeChanged: tintColot => {
        dispatch(actions.onThemeChange(tintColot));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TrendingPage);

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