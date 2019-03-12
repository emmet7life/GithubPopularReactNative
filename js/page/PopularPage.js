/**
 * Sample React Native PopularPage
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import NavigationUtil from '../navigator/NavigationUtil';
import ObjectUtils from '../utils/ObjectUtils';
import {
    createMaterialTopTabNavigator,
    createAppContainer
} from 'react-navigation';

type Props = {};
export default class PopularPage extends Component<Props> {

    constructor(props) {
        super(props);
        this.tabNames = ['Android', 'iOS', 'Java', 'JavaScript', 'Object-C', 'React', 'React-Native'];
    }

    _genTabs() {
        const tabs = {};
        this.tabNames.forEach((name, index) => {
            tabs[`tab${index}`] = {
                screen: props => <PopularTab {...props} tabLabel={name} />,
                navigationOptions: {
                    title: name
                }
            }
        });
        return tabs;
    }

    render() {
        const TabNavigator = createMaterialTopTabNavigator(this._genTabs(), {
            tabBarOptions: {
                tabStyle: styles.tabStyle,
                upperCaseLabel: false,
                scrollEnabled: true,
                style: {
                    backgroundColor: '#678',
                },
                indicatorStyle: styles.indicatorStyle,
                labelStyle: styles.labelStyle,
            }
        });
        const Tab = createAppContainer(TabNavigator);
        return (
            <View style={{flex: 1, marginTop: 24}}>
                <Tab/>
            </View>
        )
    }
}

class PopularTab extends Component<Props> {
    render() {

        // var keys = [];
        // Object.keys(this.props).forEach((key, index) => {
        //     keys[index] = key;
        // });
        // alert(keys.join(","));

        const {tabLabel} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{tabLabel}</Text>
                <Text onPress={() => {
                    NavigationUtil.goPage("DetailPage");
                }}>跳转到详情页</Text>
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
    tabStyle: {
        minWidth: 50,
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: 'white',
    },
    labelStyle: {
        fontSize: 12,
        marginTop: 6,
        marginBottom: 6,
    },
    text: {
        color: '#678',
        fontSize: 13,
    }
});