import {
    createStackNavigator,
    createMaterialTopTabNavigator,
    createBottomTabNavigator,
    createSwitchNavigator
} from "react-navigation";

// Page
import WelcomePage from '../page/WelcomePage';
import HomePage from '../page/HomePage';
import DetailPage from '../page/DetailPage';
import WebViewPage from '../page/WebViewPage';

// Demo Page
import FetchDemoPage from "../page/FetchDemoPage";
import DataStoreDemoPage from "../page/DataStoreDemoPage";

import {connect} from 'react-redux';

import {createReactNavigationReduxMiddleware, createReduxContainer} from 'react-navigation-redux-helpers';

export const rootRouter = 'Init';// 设置根路由

// APP初始欢迎界面 Stack Navigator
const InitNavigator = createStackNavigator(
    {
        WelcomePage: {
            screen: WelcomePage,
            navigationOptions: {
                header: null
            }
        }
    });

// APP主程序 Stack Navigator
const MainNavigator = createStackNavigator(
    {
        HomePage: {
            screen: HomePage,
            navigationOptions: {
                header: null
            }
        },
        DetailPage: {
            screen: DetailPage,
            navigationOptions: {
                header: null
            }
        },
        WebViewPage: {
            screen: WebViewPage,
            navigationOptions: {
                header: null
            }
        },
        FetchDemoPage: {
            screen: FetchDemoPage,
            navigationOptions: {
                // header: null
            }
        },
        DataStoreDemoPage: {
            screen: DataStoreDemoPage,
            navigationOptions: {
                // header: null
            }
        }
    });

// 根Navigator，用Switch Navigator是为了返回时不至于返回到欢迎页
export const RootNavigator = createSwitchNavigator({
    Init: InitNavigator,
    Main: MainNavigator
}, {
    navigationOptions: {
        header: null
    }
})

// react-navigation和redux中间件
export const reactNavigationReduxMiddleware = createReactNavigationReduxMiddleware(
    state => state.nav,
    'root',
)

// AppWithNavigationState
const AppWithNavigationState = createReduxContainer(RootNavigator, 'root');

const mapStateToProps = state => ({
    state: state.nav,// v2
});

// 利用connect包装AppWithNavigationState
export default connect(mapStateToProps)(AppWithNavigationState);