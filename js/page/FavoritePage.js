/**
 * Sample React Native FavoritePage
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, FlatList, RefreshControl, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import actions from '../action';
import NavigationUtil from '../utils/NavigationUtil';
import ObjectUtils from '../utils/ObjectUtils';
import {
    createMaterialTopTabNavigator,
    createAppContainer
} from 'react-navigation';
import PopularItem from '../component/PopularItem';
import TrendingItem from '../component/TrendingItem';
import NavigationBar from '../component/NavigationBar';
import FavoriteDao from "../expand/dao/FavoriteDao";
import {STORAGE_FLAG} from '../expand/dao/DataStore';
import FavoriteUtil from "../utils/FavoriteUtil";

const THEME_COLOR = '#678';

type Props = {};

// 收藏页
export default class FavoritePage extends Component<Props> {

    constructor(props) {
        super(props);
    }

    render() {
        const statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle: 'light-content',
        }
        let navigationBar = <NavigationBar
            title={'收藏'}
            statusBar={statusBar}
            style={{backgroundColor: THEME_COLOR}}
        />
        const TabNavigator = createMaterialTopTabNavigator({
            'Popular': {
                screen: props => <FavoriteTabPage {...props} flag={STORAGE_FLAG.flag_popular}/>,
                navigationOptions: {
                    title: "最热"
                }
            },
            'Trending': {
                screen: props => <FavoriteTabPage {...props} flag={STORAGE_FLAG.flag_trending}/>,
                navigationOptions: {
                    title: "趋势"
                }
            }
        }, {
            tabBarOptions: {
                tabStyle: styles.tabStyle,
                upperCaseLabel: false,
                style: {
                    backgroundColor: THEME_COLOR,
                    height: 30,// 解决初次进入时TAB样式异常的问题（Android）
                },
                indicatorStyle: styles.indicatorStyle,
                labelStyle: styles.labelStyle,
            }
        });
        const TabContainer = createAppContainer(TabNavigator);
        return (
            <View style={{flex: 1}}>
                {navigationBar}
                <TabContainer/>
            </View>
        )
    }
}

class FavoriteTab extends Component<Props> {

    constructor(props) {
        super(props);
        const {flag} = this.props;
        this.name = flag;
        this.favoriteDao = new FavoriteDao(flag);
    }

    componentDidMount() {
        this.loadData(true);
    }

    loadData(isShowLoading) {
        const {onLoadFavoriteData} = this.props;
        onLoadFavoriteData(this.name, isShowLoading);
    }

    renderItem(data) {
        const item = data.item;
        const RenderItem = this.name === STORAGE_FLAG.flag_popular ? PopularItem : TrendingItem
        return <RenderItem
            itemModel={item}
            onSelect={() => {
                NavigationUtil.goPage({
                    pageModel: item.item,
                }, 'DetailPage')
            }}
            onFavorite={(item, isFavorite) => FavoriteUtil.onFavorite(this.favoriteDao, item, isFavorite, this.name)}
        />
    }

    _store() {
        const {favorite} = this.props;
        let store = favorite[this.name];
        if (!store) {
            console.log(`DEBUG: Favorite Page Init Data For ${this.name}`);
            const item = {}
            store = {
                items: [item],
                projectModes: [item],
                isLoading: false,
            }
        }
        return store;
    }

    render() {
        let store = this._store();
        return (
            <View style={styles.container}>
                <FlatList
                    data={store.projectModes}
                    renderItem={itemData => this.renderItem(itemData)}
                    keyExtractor={item => {
                        return item => "" + (item.item && (item.item.id || item.item.fullName))
                    }}
                    refreshControl={
                        <RefreshControl
                            title={"Loading"}
                            titleColor={"#678"}
                            colors={['blue', 'green']}
                            refreshing={store.isLoading}
                            onRefresh={() => this.loadData(true)}
                            tintColor={'#678'}
                        />
                    }
                />
            </View>
        );
    }
}

// 当前界面只关联自己关心的属性即可
const mapStateToProps = state => ({
    favorite: state.favorite
});

const mapDispatchToProps = dispatch => ({
    onLoadFavoriteData: (flag, isShowLoading) => {
        dispatch(actions.onLoadFavoriteData(flag, isShowLoading));
    }
});

// connect 可跟任何子组件相互关联使用
const FavoriteTabPage = connect(mapStateToProps, mapDispatchToProps)(FavoriteTab);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabStyle: {
        padding: 0,
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: 'white',
    },
    labelStyle: {
        fontSize: 12,
        margin: 0
    },
    text: {
        color: '#678',
        fontSize: 13,
    },
});