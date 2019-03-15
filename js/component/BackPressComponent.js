import React, {Component} from 'react';
import {BackHandler} from 'react-native';
import {NavigationActions} from "react-navigation";

/**
 * Android物理回退键处理
 */
const HARE_WARE_BACK_PRESS_EVENT = '';

export default class BackPressComponent {

    constructor(props) {
        this._hardwareBackPress = this.onHarewareBackPress.bind(this);
        this.props = props;
    }

    componentDidMount() {
        if (this.props.backPress) BackHandler.addEventListener(HARE_WARE_BACK_PRESS_EVENT, this._hardwareBackPress);
    }

    componentWillUnmount() {
        if (this.props.backPress) BackHandler.removeEventListener(HARE_WARE_BACK_PRESS_EVENT, this._hardwareBackPress);
    }

    onHarewareBackPress(e) {
        // return true(自己消化返回键) or false(不处理返回键，交由系统处理)
        return this.props.backPress(e);
    }

}