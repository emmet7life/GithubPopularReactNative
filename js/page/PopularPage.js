/**
 * Sample React Native PopularPage
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
import Toast from 'react-native-easy-toast';
import NavigationBar from '../component/NavigationBar';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY = '&sort=stars';
const PAGE_SIZE = 10;
const THEME_COLOR = '#678';

type Props = {};
export default class PopularPage extends Component<Props> {

    constructor(props) {
        super(props);
        this.tabNames = ['Android', 'iOS', 'Java', 'JavaScript', 'Object-C', 'React', 'ReactNative'];
        // this.tabNames = ['Android'];
    }

    _genTabs() {
        const tabs = {};
        this.tabNames.forEach((name, index) => {
            tabs[`tab${index}`] = {
                screen: props => <PopularTabPage {...props} tabLabel={name}/>,
                navigationOptions: {
                    title: name
                }
            }
        });
        return tabs;
    }

    render() {
        const statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle: 'light-content',
        }
        let navigationBar = <NavigationBar
            title={'最热'}
            statusBar={statusBar}
            style={{backgroundColor: THEME_COLOR}}
        />
        const TabNavigator = createMaterialTopTabNavigator(this._genTabs(), {
            tabBarOptions: {
                tabStyle: styles.tabStyle,
                upperCaseLabel: false,
                scrollEnabled: true,
                style: {
                    backgroundColor: THEME_COLOR,
                },
                indicatorStyle: styles.indicatorStyle,
                labelStyle: styles.labelStyle,
            }
        });
        const Tab = createAppContainer(TabNavigator);
        return (
            <View style={{flex: 1}}>
                {navigationBar}
                <Tab/>
            </View>
        )
    }
}

class PopularTab extends Component<Props> {

    constructor(props) {
        super(props);
        const {tabLabel} = this.props;
        this.name = tabLabel;
    }

    componentDidMount() {
        this.loadData();
    }

    loadData(loadMore) {
        const {onRefreshPopularData, onLoadMorePopularData} = this.props;
        const store = this._store();
        const url = this.genURL(this.name);
        if (loadMore) {
            // 加载更多
            onLoadMorePopularData(this.name, ++store.pageIndex, PAGE_SIZE, store.items, () => {
                this.showToast();
            });
        } else {
            // 下拉刷新
            onRefreshPopularData(this.name, url, PAGE_SIZE);
        }
    }

    genURL(name) {
        return URL + name + QUERY;
    }

    renderItem(data) {
        const item = data.item;
        return <PopularItem
            item={item}
            onSelect={() => {
                const text = `DEBUG: PopularItem ${item.full_name} was selected.`
                console.log(text);
                this.showToast(text)
            }}
        />
    }

    genFooterIndicator() {
        const store = this._store();
        const footer = store.hideLoadingMore ? null :
            <View style={styles.footerIndicatorContainer}>
                <ActivityIndicator
                    style={styles.footerIndicator}
                />
                <Text>正在加载更多</Text>
            </View>
        return footer
    }

    _store() {
        const {popular} = this.props;
        let store = popular[this.name];
        if (!store) {
            console.log(`DEBUG: Popular Page Init Data For ${this.name}`);
            const item = {}
            store = {
                items: [item],
                projectModes: [item],
                pageIndex: 1,
                hideLoadingMore: true,
                isRefreshing: true,
                isLoadingMore: false,
            }
        }
        return store;
    }

    showToast(text = "没有更多了") {
        return this.refs.toast.show(text);
    }

    render() {
        let store = this._store();
        return (
            <View style={styles.container}>
                <FlatList
                    data={store.projectModes}
                    renderItem={itemData => this.renderItem(itemData)}
                    keyExtractor={item => "" + item.id}
                    refreshControl={
                        <RefreshControl
                            title={"Loading"}
                            titleColor={"red"}
                            colors={['blue', 'green']}
                            refreshing={store.isRefreshing}
                            onRefresh={() => this.loadData()}
                            tintColor={'yellow'}
                        />
                    }
                    ListFooterComponent={() => this.genFooterIndicator()}
                    onEndReached={() => {
                        // setTimeout 100毫秒: 防止onMomentumScrollBegin在onEndReached之后调用!
                        setTimeout(() => {
                            if (!this.isBeginingScroll) {
                                return;
                            }
                            // 未在加载，并且Footer未隐藏，才继续加载(解决onEndReached多次触发导致的问题)
                            if (!store.isLoadingMore && !store.hideLoadingMore) {
                                this.isBeginingScroll = false;
                                this.loadData(true);
                            }
                        }, 100);
                    }}
                    onEndReachedThreshold={0.5}
                    onMomentumScrollBegin={() => {
                        // 触摸时才有机会触发loadData(true)加载更多
                        this.isBeginingScroll = true;
                    }}
                />
                <Toast
                    ref={'toast'}
                    position={'center'}
                />
            </View>
        );
    }
}

// 当前界面只关联自己关心的属性即可
const mapStateToProps = state => ({
    popular: state.popular
});

const mapDispatchToProps = dispatch => ({
    onRefreshPopularData: (name, url, pageSize) => {
        dispatch(actions.onRefreshPopular(name, url, pageSize));
    },
    onLoadMorePopularData: (name, pageIndex, pageSize, items, callback) => {
        dispatch(actions.onLoadMorePopular(name, pageIndex, pageSize, items, callback))
    }
});

// connect 可跟任何子组件相互关联使用
const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    tabStyle: {
        minWidth: 50,
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: 'white',
    },
    labelStyle: {
        fontSize: 12,
        marginTop: 6,
        marginBottom: 6,
    },
    text: {
        color: '#678',
        fontSize: 13,
    },
    footerIndicatorContainer: {
        alignItems: 'center',
    },
    footerIndicator: {
        color: 'red',
        margin: 10,
    }
});