// 定义 action 类型字符串
export default {

    // --- 主题
    THEME_CHANGE: 'THEME_CHANGE', // 主题改变
    THEME_INIT: 'THEME_INIT', // 主题初始化

    // --- 最热模块
    // 下拉刷新
    POPULAR_REFRESH: 'POPULAR_REFRESH', // 下拉刷新
    POPULAR_REFRESH_FAIL: 'POPULAR_REFRESH_FAIL', // 下拉刷新失败
    POPULAR_REFRESH_SUCCESS: 'POPULAR_REFRESH_SUCCESS', // 下拉刷新成功
    // 加载更多
    POPULAR_LOAD_MORE: 'POPULAR_LOAD_MORE',// 加载更多
    POPULAR_LOAD_MORE_FAIL: 'POPULAR_LOAD_MORE_FAIL', // 加载更多失败
    POPULAR_LOAD_MORE_SUCCESS: 'POPULAR_LOAD_MORE_SUCCESS', // 加载更多成功
    // 刷新收藏状态
    FLUSH_POPULAR_FAVORITE: "FLUSH_POPULAR_FAVORITE",

    // --- 趋势模块
    // 下拉刷新
    TRENDING_REFRESH: 'TRENDING_REFRESH', // 下拉刷新
    TRENDING_REFRESH_FAIL: 'TRENDING_REFRESH_FAIL', // 下拉刷新失败
    TRENDING_REFRESH_SUCCESS: 'TRENDING_REFRESH_SUCCESS', // 下拉刷新成功
    // 加载更多
    TRENDING_LOAD_MORE: 'TRENDING_LOAD_MORE',// 加载更多
    TRENDING_LOAD_MORE_FAIL: 'TRENDING_LOAD_MORE_FAIL', // 加载更多失败
    TRENDING_LOAD_MORE_SUCCESS: 'TRENDING_LOAD_MORE_SUCCESS', // 加载更多成功
    // 刷新收藏状态
    FLUSH_TRENDING_FAVORITE: "FLUSH_TRENDING_FAVORITE",

    // --- 收藏模块
    FAVORITE_LOAD_DATA: 'FAVORITE_LOAD_DATA',// 加载数据
    FAVORITE_LOAD_SUCCESS: 'FAVORITE_LOAD_SUCCESS',// 加载成功
    FAVORITE_LOAD_FAIL: 'FAVORITE_LOAD_FAIL',// 加载失败
}