import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducer';
import {reactNavigationReduxMiddleware} from "../navigator/AppNavigator";
import {Logger} from "../middleware/Logger";

const middlewares = [
    reactNavigationReduxMiddleware,
    Logger,
    thunk
];

export default createStore(reducers, applyMiddleware(...middlewares));