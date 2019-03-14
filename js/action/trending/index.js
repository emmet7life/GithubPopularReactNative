import Types from '../types';
import DataStore, {STORAGE_FLAG} from '../../expand/dao/DataStore';
import {handleRefreshError, handleRefrshData} from '../ActionUtil';

/*
 * 趋势模块 - 下拉刷新action
 * @name: 子模块名
 * @url: 请求地址
 * @pageSize: 一页请求多少条数据
 */
export function onRefreshTrending(name, url, pageSize) {
    return dispatch => {
        // 正在请求
        dispatch({type: Types.POPULAR_REFRESH, name: name});
        let dataStore = new DataStore();
        dataStore.fetchData(url, STORAGE_FLAG.flag_trending)
            .then(fetchedData => {
                // 请求完成✅
                handleRefrshData(Types.TRENDING_REFRESH_SUCCESS, dispatch, name, fetchedData, pageSize);
            })
            .catch(error => {
                // 请求错误❎
                console.log(error);
                handleRefreshError(Types.TRENDING_REFRESH_FAIL, dispatch, name, error);
            })
    }
}

/*
 * 趋势模块 - 加载更多action
 * @name: 子模块名
 * @pageIndex: 页码
 * @pageSize: 一页请求多少条数据
 * @dataArray: 原始数据
 * @callback: 回调，用于与组件通信
 */
export function onLoadMoreTrending(name, pageIndex, pageSize, dataArray = [], callback) {
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
                    projectModes: dataArray,
                });
            } else {
                // 还有更多可加载
                const sliceLength = Math.min(pageIndex * pageSize, dataArray.length);
                dispatch({
                    type: Types.TRENDING_LOAD_MORE_SUCCESS,
                    name,// or name: name
                    pageIndex,// or pageIndex: pageIndex
                    projectModes: dataArray.slice(0, sliceLength),
                });
            }
        }, 500)
    }
}