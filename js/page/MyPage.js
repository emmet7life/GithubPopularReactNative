/**
 * Sample React Native MyPage
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

// View
import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import NavigationBar from '../component/NavigationBar';
// Redux
import {connect} from 'react-redux';
import actions from '../action';
// Util
import NavigationUtil from "../utils/NavigationUtil";
import ViewUtil from "../utils/ViewUtil";
// CONST
const THEME_COLOR = '#678';

type Props = {};

// 我的页
class MyPage extends Component<Props> {

    getRightButton() {
        return <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
                onPress={() => {
                    alert('点击了右侧按钮');
                }}
            >
                <View style={{padding: 5, marginLeft: 8}}>
                    <Feather
                        name={'search'}
                        size={24}
                        style={{color: 'white'}}
                    />
                </View>
            </TouchableOpacity>
        </View>
    }

    goBack() {
        alert('点击了左侧按钮');
    }

    render() {
        const statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle: 'light-content',
        }

        let navigationBar = <NavigationBar
            title={'我的'}
            statusBar={statusBar}
            style={{backgroundColor: THEME_COLOR}}
            leftButton={ViewUtil.getLeftBackButton(() => this.goBack())}
            rightButton={this.getRightButton()}
        />

        return (
            <View style={styles.container}>
                {navigationBar}
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
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#F5FCFF',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});