import Types from '../types';
import DataStore, {STORAGE_FLAG} from '../../expand/dao/DataStore';
import {handleRefreshError, handleRefreshData, _projectModes} from '../ActionUtil';

/*
 * 趋势模块 - 下拉刷新action
 * @name: 子模块名
 * @url: 请求地址
 * @pageSize: 一页请求多少条数据
 * @favoriteDao: 收藏模块数据
 */
export function onRefreshTrending(name, url, pageSize, favoriteDao) {
    return dispatch => {
        // 正在请求
        dispatch({
            type: Types.TRENDING_REFRESH,
            name: name
        });
        setTimeout(() => {
            let dataStore = new DataStore();
            dataStore.fetchData(url, STORAGE_FLAG.flag_trending)
                .then(fetchedData => {
                    // 请求完成✅
                    handleRefreshData(Types.TRENDING_REFRESH_SUCCESS, dispatch, name, fetchedData, pageSize, favoriteDao);
                })
                .catch(error => {
                    // 请求错误❎
                    console.log(error);
                    handleRefreshError(Types.TRENDING_REFRESH_FAIL, dispatch, name, error);
                })
        }, 500);
    }
}

/*
 * 趋势模块 - 加载更多action
 * @name: 子模块名
 * @pageIndex: 页码
 * @pageSize: 一页请求多少条数据
 * @dataArray: 原始数据
 * @favoriteDao: 收藏模块数据
 * @callback: 回调，用于与组件通信
 */
export function onLoadMoreTrending(name, pageIndex, pageSize, dataArray = [], favoriteDao, callback) {
    return dispatch => {
        dispatch({
            type: Types.TRENDING_LOAD_MORE,
            name,
            pageIndex
        });
        // 模拟网络请求
        setTimeout(() => {
            // 已加载完全部数据
            if ((pageIndex - 1) * pageSize >= dataArray.length) {
                if (typeof callback === 'function') {
                    callback('no more');
                }
                dispatch({
                    type: Types.TRENDING_LOAD_MORE_FAIL,
                    error: 'no more',
                    name: name,
                    pageIndex: --pageIndex,
                    // projectModes: dataArray,
                });
            } else {
                // 还有更多可加载
                const sliceLength = Math.min(pageIndex * pageSize, dataArray.length);
                const fixedItems = dataArray.slice(0, sliceLength);
                _projectModes(fixedItems, favoriteDao, projectModes => {
                    dispatch({
                        type: Types.TRENDING_LOAD_MORE_SUCCESS,
                        name,// or name: name
                        pageIndex,// or pageIndex: pageIndex
                        projectModes: projectModes
                    });
                });
            }
        }, 500)
    }
}

/**
 * 刷新收藏状态
 * @param name
 * @param pageIndex 第几页
 * @param pageSize 每页展示条数
 * @param dataArray 原始数据
 * @param favoriteDao
 * @returns {function(*)}
 */
export function onFlushTrendingFavorite(name, pageIndex, pageSize, dataArray = [], favoriteDao) {
    return dispatch=>{
        //本次和载入的最大数量
        let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex;
        _projectModes(dataArray.slice(0, max), favoriteDao, data => {
            dispatch({
                type: Types.FLUSH_TRENDING_FAVORITE,
                name,
                pageIndex,
                projectModes: data,
            })
        })
    }
}