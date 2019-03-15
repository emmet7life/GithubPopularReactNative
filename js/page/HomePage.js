/**
 * Sample React Native HomePage
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

// View
import React, {Component} from 'react';
import {BackHandler} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
// Page
import DynamicTabNavigator from '../navigator/DynamicTabNavigator';
// Util
import NavigationUtil from "../utils/NavigationUtil";
import BackPressComponent from "../component/BackPressComponent";

type Props = {};

class HomePage extends Component<Props> {

    constructor(props) {
        super(props);
        this.backPress = new BackPressComponent({backPress: this.onBackPress()});
    }

    componentDidMount() {
        this.backPress.componentDidMount();
    }

    componentWillMount() {
        this.backPress.componentWillUnmount();
    }

    onBackPress = () => {
        const {dispatch, nav} = this.props;
        if (nav.routes[1].index == 0) {
            // 不处理返回键
            return false
        }
        dispatch(NavigationActions.back());
        // 自己消化返回键
        return true;
    };

    render() {
        NavigationUtil.navigation = this.props.navigation;
        return <DynamicTabNavigator/>;
    }
}

const mapStateToProps = state => {
    return {nav: state.nav}
}

export default connect(mapStateToProps)(HomePage);