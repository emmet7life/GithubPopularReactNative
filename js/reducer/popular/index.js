import Types from '../../action/types';

/*
 * {
 *    ios: {
 *      items: ...,
 *      isLoading: false,
 *    },
 *    java: {
 *      items: ...,
 *      isLoading: false
 *    }
 * }
 */
const item = {}
const defaultState = {
    items: [item],
    projectModes: [item],
    pageIndex: 1,
    hideLoadingMore: true,// 隐藏Footer
    isRefreshing: true,// 是否正在刷新
    isLoadingMore: false,// 是否正在加载更多
}
export default function popularReducer(state = {}, action) {
    switch (action.type) {

        // -- 下拉刷新
        case Types.POPULAR_REFRESH:// 下拉刷新请求
            return {
                ...state,
                [action.name]: {
                    ...(state[action.name] === undefined ? defaultState : state[action.name]),
                    // control
                    isRefreshing: true,
                    hideLoadingMore: true,
                }
            }
        case Types.POPULAR_REFRESH_SUCCESS:// 下拉刷新成功
            const cloneObj = {
                ...state,
                [action.name]: {
                    ...(state[action.name] === undefined ? defaultState : state[action.name]),
                    // data
                    items: action.items,
                    projectModes: action.projectModes,
                    // control
                    pageIndex: action.pageIndex,
                    hideLoadingMore: false,
                    isRefreshing: false
            }}
            console.warn(cloneObj);
            return cloneObj;
        case Types.POPULAR_REFRESH_FAIL:// 下拉刷新失败
            return {
                ...state,
                [action.name]: {
                    ...(state[action.name] === undefined ? defaultState : state[action.name]),
                    // data
                    error: action.error,
                    // control
                    pageIndex: action.pageIndex,
                    hideLoadingMore: true,
                    isRefreshing: false
                }
            }

        // -- 加载更多
        case Types.POPULAR_LOAD_MORE:// 加载更多请求
            return {
                ...state,
                [action.name]: {
                    ...(state[action.name] === undefined ? defaultState : state[action.name]),
                    // control
                    pageIndex: action.pageIndex,
                    hideLoadingMore: false,
                    isLoadingMore: true
                }
            }
        case Types.POPULAR_LOAD_MORE_SUCCESS:// 加载更多成功
            return {
                ...state,
                [action.name]: {
                    ...(state[action.name] === undefined ? defaultState : state[action.name]),
                    // data
                    projectModes: action.projectModes,
                    // control
                    pageIndex: action.pageIndex,
                    hideLoadingMore: false,
                    isLoadingMore: false
                }
            }
        case Types.POPULAR_LOAD_MORE_FAIL:// 加载更多失败
            return {
                ...state,
                [action.name]: {
                    ...(state[action.name] === undefined ? defaultState : state[action.name]),
                    // control
                    pageIndex: action.pageIndex,
                    hideLoadingMore: true,
                    isLoadingMore: false
                }
            }
        case Types.FLUSH_POPULAR_FAVORITE://刷新收藏状态
            return {
                ...state,
                [action.name]: {
                    ...(state[action.name] === undefined ? defaultState : state[action.name]),
                    projectModes: action.projectModes,
                }
            };
        default:
            return state;
    }
}