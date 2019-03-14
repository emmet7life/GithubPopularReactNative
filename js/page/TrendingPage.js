/**
 * Sample React Native TrendingPage
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    RefreshControl,
    ActivityIndicator,
    DeviceEventEmitter,
    TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import actions from '../action';
import NavigationUtil from '../utils/NavigationUtil';
import {
    createMaterialTopTabNavigator,
    createAppContainer
} from 'react-navigation';
import Toast from 'react-native-easy-toast';
import NavigationBar from '../component/NavigationBar';
import TrendingItem from "../component/TrendingItem";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TrendingDialog, {TimeSpans} from '../component/TrendingDialog';
import EventTypes from "../utils/EventTypes";

const URL = 'https://github.com/trending/';
const PAGE_SIZE = 10;
const THEME_COLOR = '#678';

type Props = {};

// 趋势页
export default class TrendingPage extends Component<Props> {

    constructor(props) {
        super(props);
        this.tabNames = ['All', 'C', 'C#', 'PHP', 'JavaScript'];
        this.state = {
            timeSpan: TimeSpans[0],
        };
    }

    _genTabs() {
        const tabs = {};
        this.tabNames.forEach((name, index) => {
            tabs[`tab${index}`] = {
                screen: props => <TrendingTabPage {...props} timeSpan={this.state.timeSpan} tabLabel={name}/>,
                navigationOptions: {
                    title: name
                }
            }
        });
        return tabs;
    }

    renderTitleView() {
        return <View>
            <TouchableOpacity
                underlayColor='transparent'
                onPress={() => this.dialog.show()}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{
                        fontSize: 18,
                        color: '#FFFFFF',
                        fontWeight: '400'
                    }}>趋势 {this.state.timeSpan.showText}</Text>
                    <MaterialIcons
                        name={'arrow-drop-down'}
                        size={22}
                        style={{color: 'white'}}
                    />
                </View>
            </TouchableOpacity>
        </View>
    }

    onSelectTimeSpan(tab) {
        this.dialog.dismiss();
        this.setState({
            timeSpan: tab
        });
        DeviceEventEmitter.emit(EventTypes.TIME_SPAN_CHANGE, tab);
    }

    renderTrendingDialog() {
        return <TrendingDialog
            ref={dialog => this.dialog = dialog}
            onSelect={tab => this.onSelectTimeSpan(tab)}
        />
    }

    _tabNav() {
        //注意：主题发生变化需要重新渲染top tab
        if (!this.tabNav) {//优化效率：根据需要选择是否重新创建建TabNavigator，通常tab改变后才重新创建
            this.tabNav = createAppContainer(createMaterialTopTabNavigator(
                this._genTabs(), {
                    tabBarOptions: {
                        tabStyle: styles.tabStyle,
                        upperCaseLabel: false,//是否使标签大写，默认为true
                        scrollEnabled: true,//是否支持 选项卡滚动，默认false
                        style: {
                            backgroundColor: THEME_COLOR,//TabBar 的背景颜色
                            height: 30//fix 开启scrollEnabled后再Android上初次加载时闪烁问题
                        },
                        indicatorStyle: styles.indicatorStyle,//标签指示器的样式
                        labelStyle: styles.labelStyle,//文字的样式
                    },
                    lazy: true
                }
            ));
        }
        return this.tabNav;
    }

    render() {
        const statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle: 'light-content',
        }
        let navigationBar = <NavigationBar
            titleView={this.renderTitleView()}
            statusBar={statusBar}
            style={{backgroundColor: THEME_COLOR}}
        />
        const TabNavigator = this._tabNav();
        return (
            <View style={{flex: 1}}>
                {navigationBar}
                <TabNavigator/>
                {this.renderTrendingDialog()}
            </View>
        )
    }
}

class TrendingTab extends Component<Props> {

    constructor(props) {
        super(props);
        const {tabLabel, timeSpan} = this.props;
        this.name = tabLabel;
        this.timeSpan = timeSpan;
    }

    componentDidMount() {
        this.loadData();
        this.timeSpanChangeListener = DeviceEventEmitter.addListener(EventTypes.TIME_SPAN_CHANGE, (timeSpan) => {
            this.timeSpan = timeSpan;
            this.loadData();
        });
    }

    componentWillUnmount() {
        if (this.timeSpanChangeListener) {
            this.timeSpanChangeListener.remove();
        }
    }

    loadData(loadMore) {
        const {onRefreshTrendingData, onLoadMoreTrendingData} = this.props;
        const store = this._store();
        const url = this.genURL(this.name);
        if (loadMore) {
            // 加载更多
            onLoadMoreTrendingData(this.name, ++store.pageIndex, PAGE_SIZE, store.items, () => {
                this.showToast();
            });
        } else {
            // 下拉刷新
            onRefreshTrendingData(this.name, url, PAGE_SIZE);
        }
    }

    genURL(key) {
        return URL + key + '?' + this.timeSpan.searchText;
    }

    renderItem(data) {
        const item = data.item;
        return <TrendingItem
            item={item}
            onSelect={() => {
                const text = `DEBUG: TrendingItem ${item.full_name} was selected.`
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
        const {trending} = this.props;
        let store = trending[this.name];
        if (!store) {
            console.log(`DEBUG: Trending Page Init Data For ${this.name}`);
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
                    keyExtractor={item => "" + (item.id || item.fullName)}
                    refreshControl={
                        <RefreshControl
                            title={"Loading"}
                            titleColor={"#678"}
                            colors={['blue', 'green']}
                            refreshing={store.isRefreshing}
                            onRefresh={() => this.loadData()}
                            tintColor={'#678'}
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
    trending: state.trending
});

const mapDispatchToProps = dispatch => ({
    onRefreshTrendingData: (name, url, pageSize) => {
        dispatch(actions.onRefreshTrending(name, url, pageSize));
    },
    onLoadMoreTrendingData: (name, pageIndex, pageSize, items, callback) => {
        dispatch(actions.onLoadMoreTrending(name, pageIndex, pageSize, items, callback))
    }
});

// connect 可跟任何子组件相互关联使用
const TrendingTabPage = connect(mapStateToProps, mapDispatchToProps)(TrendingTab);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#F5FCFF',
    },
    tabStyle: {
        // minWidth: 50,
        padding: 0,
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: 'white',
    },
    labelStyle: {
        fontSize: 12,
        // marginTop: 6,
        // marginBottom: 6,
        margin: 0,
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