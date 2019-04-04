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
import {StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import NavigationBar from '../component/NavigationBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
// Redux
import {connect} from 'react-redux';
import actions from '../action';
// Util
import NavigationUtil from "../utils/NavigationUtil";
import ViewUtil from "../utils/ViewUtil";
import GlobalStyles from '../res/styles/GlobalStyles';
// Data
import {MORE_MENU} from "../res/menu/MORE_MENU";
// CONST
const THEME_COLOR = '#678';

type Props = {};

// 我的页
class MyPage extends Component<Props> {

    // getRightButton() {
    //     return <View style={{flexDirection: 'row'}}>
    //         <TouchableOpacity
    //             onPress={() => {
    //                 alert('点击了右侧按钮');
    //             }}
    //         >
    //             <View style={{padding: 5, marginLeft: 8}}>
    //                 <Feather
    //                     name={'search'}
    //                     size={24}
    //                     style={{color: 'white'}}
    //                 />
    //             </View>
    //         </TouchableOpacity>
    //     </View>
    // }

    goBack() {
        alert('点击了左侧按钮');
    }

    onClick(menu) {
        // alert("点击了Menu");
        let RouteName, params = {};
        switch (menu) {
            case MORE_MENU.Tutorial:
                RouteName = 'WebViewPage';
                params.title = '教程';
                params.url = 'https://coding.m.imooc.com/classindex.html?cid=89';
                break;
            case MORE_MENU.About:
                RouteName = 'AboutPage';
                break;
            case MORE_MENU.About_Author:
                RouteName = 'AboutMePage';
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
        const statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle: 'light-content',
        }

        let navigationBar = <NavigationBar
            title={'我的'}
            statusBar={statusBar}
            style={{backgroundColor: THEME_COLOR}}
            // leftButton={ViewUtil.getLeftBackButton(() => this.goBack())}
            // rightButton={this.getRightButton()}
        />

        return (
            <View style={GlobalStyles.root_container}>
                {navigationBar}
                <ScrollView>
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => this.onClick(MORE_MENU.About)}
                    >
                        <View style={styles.about_left}>
                            <Ionicons
                                name={MORE_MENU.About.icon}
                                size={40}
                                style={{
                                    marginRight: 10,
                                    color: THEME_COLOR,
                                }}
                            />
                            <Text>GitHub Popular</Text>
                        </View>
                        <Ionicons
                            name={'ios-arrow-forward'}
                            size={16}
                            style={{
                                marginRight: 10,
                                alignSelf: 'center',
                                color: THEME_COLOR,
                            }}/>
                    </TouchableOpacity>
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.Tutorial)}
                    {/*趋势管理*/}
                    <Text style={styles.groupTitle}>趋势管理</Text>
                    {/*自定义语言*/}
                    {this.getItem(MORE_MENU.Custom_Language)}
                    {/*语言排序*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.Sort_Language)}

                    {/*最热管理*/}
                    <Text style={styles.groupTitle}>最热管理</Text>
                    {/*自定义标签*/}
                    {this.getItem(MORE_MENU.Custom_Key)}
                    {/*标签排序*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.Sort_Key)}
                    {/*标签移除*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.Remove_Key)}

                    {/*设置*/}
                    <Text style={styles.groupTitle}>设置</Text>
                    {/*自定义主题*/}
                    {this.getItem(MORE_MENU.Custom_Theme)}
                    {/*关于作者*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.About_Author)}
                    <View style={GlobalStyles.line}/>
                    {/*反馈*/}
                    {this.getItem(MORE_MENU.Feedback)}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.CodePush)}
                </ScrollView>
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
        flex: 1
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    about_left: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    item: {
        backgroundColor: 'white',
        padding: 10,
        height: 90,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    groupTitle: {
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 5,
        fontSize: 12,
        color: 'gray'
    }
});