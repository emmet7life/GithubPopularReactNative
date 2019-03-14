import React,{Component} from "react";
import {BottomTabBar} from 'react-navigation-tabs';
import ObjectUtils from '../utils/ObjectUtils';

export default class TabBarComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // ObjectUtils.alertObjectKeys(this.props.theme);
        // alert(this.props.tintColor);
        return (<BottomTabBar
            {...this.props}
            activeTintColor={this.props.tintColor}/>)
    }
}