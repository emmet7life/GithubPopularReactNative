/**
 * Sample React Native DynamicTabNavigator
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

// View
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BottomTabBar} from 'react-navigation-tabs';
// Icon
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
// Page
import PopularPage from '../page/PopularPage';
import TrendingPage from '../page/TrendingPage';
import FavoritePage from '../page/FavoritePage';
import MyPage from '../page/MyPage';
// Navigation
import {
    createBottomTabNavigator,
    createAppContainer
} from "react-navigation";

import NavigationUtil from "../navigator/NavigationUtil";

const TABS = {
    PopularPage: {
        screen: PopularPage,
        navigationOptions: {
            tabBarLabel: "最热",
            tabBarIcon: ({tintColor, focused}) => (
                <MaterialIcons
                    name={'whatshot'}
                    size={26}
                    style={{color: tintColor}}
                />
            )
        }
    },
    TrendingPage: {
        screen: TrendingPage,
        navigationOptions: {
            tabBarLabel: "趋势",
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons
                    name={'md-trending-up'}
                    size={26}
                    style={{color: tintColor}}
                />
            )
        }
    },
    FavoritePage: {
        screen: FavoritePage,
        navigationOptions: {
            tabBarLabel: "收藏",
            tabBarIcon: ({tintColor, focused}) => (
                <MaterialIcons
                    name={'favorite'}
                    size={26}
                    style={{color: tintColor}}
                />
            )
        }
    },
    MyPage: {
        screen: MyPage,
        navigationOptions: {
            tabBarLabel: "我的",
            tabBarIcon: ({tintColor, focused}) => (
                <Entypo
                    name={'user'}
                    size={26}
                    style={{color: tintColor}}
                />
            )
        }
    }
}
type Props = {};
export default class DynamicTabNavigator extends Component<Props> {

    constructor(props) {
        super(props);
        console.disableYellowBox = true;
    }

    _tabNavigator() {
        const {PopularPage, FavoritePage, TrendingPage, MyPage} = TABS;
        const tabs = {PopularPage, FavoritePage, TrendingPage, MyPage};
        return createBottomTabNavigator(tabs, {
            tabBarComponent: TabBarComponent
        });
    }

    render() {
        // const {navigation} = this.props;
        NavigationUtil.navigation = this.props.navigation;
        const Tab = createAppContainer(this._tabNavigator());
        return <Tab/>;
    }
}

class TabBarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.theme = {
            tintColor: props.activeTintColor,
            updateTime: new Date().getTime()
        }
    }

    render() {
        const {routes, index} = this.props.navigation.state;
        if (routes[index].params) {
            const {theme} = routes[index].params;
            if (theme && theme.updateTime && theme.updateTime > this.theme.updateTime) {
                this.theme = theme;
            }
        }
        return (<BottomTabBar
            {...this.props}
            activeTintColor={this.theme.tintColor || this.props.activeTintColor}/>)
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