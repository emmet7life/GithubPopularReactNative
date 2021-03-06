import {rootRouter, RootNavigator} from '../navigator/AppNavigator';
import {combineReducers} from 'redux';
import themeReducer from './theme';
import popularReducer from './popular';
import trendingReducer from './trending';
import favoriteReducer from './favorite';

// 1. 指定默认的state
const navState = RootNavigator.router.getStateForAction(RootNavigator.router.getActionForPathAndParams(rootRouter));

// 2. 创建自己的navigation reducer
const navReducer = (state = navState, action) => {
    const nextState = RootNavigator.router.getStateForAction(action, state);
    return nextState || state;
}

// 3. 合并reducer
export default combineReducers({
    // 导航器模块数据
    nav: navReducer,
    // 主题模块数据
    theme: themeReducer,
    // 热门模块数据
    popular: popularReducer,
    // 趋势模块数据
    trending: trendingReducer,
    // 收藏模块数据
    favorite: favoriteReducer,
});