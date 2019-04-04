import React, {Component} from 'react';
import {View, Linking} from 'react-native';
import NavigationUtil from "../../utils/NavigationUtil";
import {MORE_MENU} from "../../res/menu/MORE_MENU";
import ViewUtil from "../../utils/ViewUtil";
import AboutWrapComponent, {FLAG_ABOUT} from "./AboutWrapComponent";
import config from '../../res/data/config'
import GlobalStyles from "../../res/styles/GlobalStyles";

const THEME_COLOR = '#678';

type Props = {};

// 关于页
export default class AboutPage extends Component<Props> {
    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        this.aboutCommon = new AboutWrapComponent({
                ...this.params,
                navigation: this.props.navigation,
                flagAbout: FLAG_ABOUT.flag_about,
            }, data => this.setState({...data})
        );
        this.state = {
            data: config,
        }
    }

    onClick(menu) {
        let RouteName, params = {};
        switch (menu) {
            case MORE_MENU.Tutorial:
                RouteName = 'WebViewPage';
                params.title = '教程';
                params.url = 'https://coding.m.imooc.com/classindex.html?cid=89';
                break;
            case MORE_MENU.About_Author:
                RouteName = 'AboutMePage';
                break;
            case MORE_MENU.Feedback:
                const url = 'mailto://crazycodeboy@gmail.com';
                Linking.canOpenURL(url)
                    .then(support => {
                        // debugger
                        if (!support) {
                            console.log('Can\'t handle url: ' + url);
                        } else {
                            Linking.openURL(url);
                        }
                    }).catch(e => {
                    console.error('An error occurred', e);
                });
                break;
        }
        if (RouteName) {
            NavigationUtil.goPage(params, RouteName);
        }
    }

    getItem(menu) {
        return ViewUtil.getMenuItem(() => this.onClick(menu), menu, THEME_COLOR);
    }

    render() {
        const content = <View>
            {this.getItem(MORE_MENU.Tutorial)}
            <View style={GlobalStyles.line}/>
            {this.getItem(MORE_MENU.About_Author)}
            <View style={GlobalStyles.line}/>
            {this.getItem(MORE_MENU.Feedback)}
        </View>;
        return this.aboutCommon.render(content, this.state.data.app);
    }
}

