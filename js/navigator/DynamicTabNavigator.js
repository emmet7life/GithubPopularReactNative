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
import TabBarComponent from '../component/TabBarComponent';
import {connect} from 'react-redux';
// Navigation
import {
    createBottomTabNavigator,
    createAppContainer
} from "react-navigation";
// Util
import NavigationUtil from "../utils/NavigationUtil";
import ObjectUtils from '../utils/ObjectUtils';
// TAB
import {TABS} from './TABS';
import EventTypes from "../utils/EventTypes";
import EventBus from 'react-native-event-bus';

type Props = {};
class DynamicTabNavigator extends Component<Props> {

    constructor(props) {
        super(props);
        console.disableYellowBox = true;
    }

    _tabNavigator() {
        const {PopularPage, FavoritePage, TrendingPage, MyPage} = TABS;
        const tabs = {PopularPage, TrendingPage, FavoritePage, MyPage};
        return createBottomTabNavigator(tabs, {
            tabBarComponent: props => {
                return <TabBarComponent tintColor={this.props.tintColor} {...props} />
            }
        });
    }

    render() {
        // 有则返回
        if (this.Container) {
            return <this.Container/>;
        }
        // 无则创建
        const Tab = createAppContainer(this._tabNavigator());
        this.Container = Tab;
        return <Tab
            // 底部导航栏TAB切换时触发
            onNavigationStateChange={(prevState, nextState, action) => {
                // 通过EventBus发送事件给监听者
                EventBus.getInstance().fireEvent(EventTypes.BOTTOM_TAB_INDEX_CHANGE, {
                    from: prevState.index,
                    to: nextState.index
                })
            }}
        />;
    }
}

const mapStateToProps = state => ({
    tintColor: state.theme.tintColor
});

export default connect(mapStateToProps)(DynamicTabNavigator);