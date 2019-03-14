// 定义 action 类型字符串
export default {

    // --- 主题
    THEME_CHANGE: 'THEME_CHANGE', // 主题改变
    THEME_INIT: 'THEME_INIT', // 主题初始化

    // --- 最热模块
    // 下拉刷新
    POPULAR_REFRESH: 'POPULAR_REFRESH', // 刷新最热模块
    POPULAR_REFRESH_FAIL: 'POPULAR_REFRESH_FAIL', // 最热模块下拉刷新失败
    POPULAR_REFRESH_SUCCESS: 'POPULAR_REFRESH_SUCCESS', // 最热模块下拉刷新成功
    // 加载更多
    POPULAR_LOAD_MORE: 'POPULAR_LOAD_MORE',// 加载更多最热模块
    POPULAR_LOAD_MORE_FAIL: 'POPULAR_LOAD_MORE_FAIL', // 最热模块加载更多失败
    POPULAR_LOAD_MORE_SUCCESS: 'POPULAR_LOAD_MORE_SUCCESS', // 最热模块加载更多成功
}