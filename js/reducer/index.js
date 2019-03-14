import {rootRouter, RootNavigator} from '../navigator/AppNavigator';
import {combineReducers} from 'redux';
import themeReducer from './theme';
import popularReducer from './popular';

// 1. 指定默认的state
const navState = RootNavigator.router.getStateForAction(RootNavigator.router.getActionForPathAndParams(rootRouter));

// 2. 创建自己的navigation reducer
const navReducer = (state = navState, action) => {
    const nextState = RootNavigator.router.getStateForAction(action, state);
    return nextState || state;
}

// 3. 合并reducer
export default combineReducers({
    nav: navReducer,
    theme: themeReducer,
    popular: popularReducer,
});