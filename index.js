/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import App from './App';
import FlatListDemo from './pages/FlatListDemo';
import {StackNavigator, createStackNavigator, createAppContainer} from 'react-navigation';
import AppNavigator from './js/navigator/AppNavigator';
import {name as appName} from './app.json';

// const AppRoot = StackNavigator({
//     WelcomePage: {
//         screen: WelcomePage,
//     },
//     FlatListDemo: {
//         screen: FlatListDemo,
//         navigationOptions: {
//             title: 'FlatListDemo'
//         }
//     }
// });

// const AppNavigator = createStackNavigator({
//     App: {
//         screen: App,
//     },
//     FlatListDemo: {
//         screen: FlatListDemo,
//         navigationOptions: {
//             title: 'FlatListDemo'
//         }
//     }
//   });

const AppRoot = createAppContainer(AppNavigator);

AppRegistry.registerComponent(appName, () => AppRoot);
