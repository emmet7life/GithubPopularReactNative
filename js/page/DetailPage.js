/**
 * Sample React Native DetailPage
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
const TRENDING_PREFIX_URL = 'https://github.com/';

type Props = {};

// 详情页
export default class DetailPage extends Component<Props> {

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        const {pageModel} = this.params;
        this.url = pageModel.html_url || (TRENDING_PREFIX_URL + pageModel.fullName);
        const title = pageModel.full_name || pageModel.fullName;
        this.state = {
            title: title,
            url: this.url,
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

    onFavoriteButtonClick() {
        alert('点击了收藏按钮');
    }

    // WebView导航状态发送变更
    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack,
            url: navState.url,// 最新URL
        })
    }

    renderRightButton() {
        return (<View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                    onPress={() => this.onFavoriteButtonClick()}>
                    <FontAwesome
                        name={this.state.isFavorite ? 'star' : 'star-o'}
                        size={20}
                        style={{color: 'white', marginRight: 10}}/>
                </TouchableOpacity>
                {ViewUtil.getShareButton(() => {
                    alert('点击了分享按钮');
                })}
            </View>
        )
    }

    render() {
        const titleLayoutStyle = this.state.title.length > 20 ? {paddingRight: 30} : null;
        let navigationBar = <NavigationBar
            title={this.state.title}
            titleLayoutStyle={titleLayoutStyle}
            style={{backgroundColor: THEME_COLOR}}
            leftButton={ViewUtil.getLeftBackButton(() => this.onBackPress())}
            rightButton={this.renderRightButton()}
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