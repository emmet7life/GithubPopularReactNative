/**
 * Sample React Native WebViewPage
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import ViewUtil from "../utils/ViewUtil";
import NavigationUtil from "../utils/NavigationUtil";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NavigationBar from '../component/NavigationBar';
import {WebView} from 'react-native-webview';
import BackPressComponent from "../component/BackPressComponent";

const THEME_COLOR = '#678';

type Props = {};

// 详情页
export default class WebViewPage extends Component<Props> {

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        const {url, title} = this.params;
        this.state = {
            title: title,
            url: url,
            canGoBack: false,
        }
        this.backPress = new BackPressComponent({backPress: () => this.onBackPress()});
    }

    componentDidMount() {
        this.backPress.componentDidMount();
    }

    componentWillMount() {
        this.backPress.componentWillUnmount();
    }

    onBackPress = () => {
        if (this.state.canGoBack) {
            this.webView.goBack();
        } else {
            NavigationUtil.goBack(this.props.navigation);
        }
        return true;
    }

    // WebView导航状态发送变更
    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack,
            url: navState.url,// 最新URL
        })
    }

    render() {
        let navigationBar = <NavigationBar
            title={this.state.title}
            style={{backgroundColor: THEME_COLOR}}
            leftButton={ViewUtil.getLeftBackButton(() => this.onBackPress())}
        />

        return (
            <View style={styles.container}>
                {navigationBar}
                <WebView
                    ref={webView => this.webView = webView}
                    startInLoadingState={true}
                    onNavigationStateChange={state => this.onNavigationStateChange(state)}
                    source={{uri: this.state.url}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    detail: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});