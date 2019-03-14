import Types from '../types';
import DataStore from '../../expand/dao/DataStore';

/*
 * 最热模块 - 下拉刷新action
 * @name: 子模块名
 * @url: 请求地址
 * @pageSize: 一页请求多少条数据
 */
export function onRefreshPopular(name, url, pageSize) {
    return dispatch => {
        // 正在请求
        dispatch({type: Types.POPULAR_REFRESH, name: name});
        let dataStore = new DataStore();
        dataStore.fetchData(url)
            .then(fetchedData => {
                // 请求完成✅
                handleRefrshData(dispatch, name, fetchedData, pageSize);
            })
            .catch(error => {
                // 请求错误❎
                console.log(error);
                handleRefreshError(dispatch, name, error);
            })
    }
}

/*
 * 最热模块 - 加载更多action
 * @name: 子模块名
 * @pageIndex: 页码
 * @pageSize: 一页请求多少条数据
 * @dataArray: 原始数据
 * @callback: 回调，用于与组件通信
 */
export function onLoadMorePopular(name, pageIndex, pageSize, dataArray = [], callback) {
    return dispatch => {
        dispatch({
            type: Types.POPULAR_LOAD_MORE,
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
                    type: Types.POPULAR_LOAD_MORE_FAIL,
                    error: 'no more',
                    name: name,
                    pageIndex: --pageIndex,
                    projectModes: dataArray,
                });
            } else {
                // 还有更多可加载
                const sliceLength = Math.min(pageIndex * pageSize, dataArray.length);
                dispatch({
                    type: Types.POPULAR_LOAD_MORE_SUCCESS,
                    name,// or name: name
                    pageIndex,// or pageIndex: pageIndex
                    projectModes: dataArray.slice(0, sliceLength),
                });
            }
        }, 500)
    }
}

/*处理下拉请求-成功*/
function handleRefrshData(dispatch, name, data, pageSize) {
    let fixItems = []
    if (data && data.data && data.data.items) {
        const length = data.data.items.length;
        const sliceLength = Math.min(length, pageSize);
        fixItems = data.data.items.slice(0, sliceLength);
    }
    dispatch({
        type: Types.POPULAR_REFRESH_SUCCESS,
        items: data.data.items,
        name: name,
        pageIndex: 1,
        projectModes: fixItems
    });
}

/*处理下拉请求-错误*/
function handleRefreshError(dispatch, name, error) {
    dispatch({
        type: Types.POPULAR_REFRESH_FAIL,
        error: error,
        name: name,
        pageIndex: 1
    });
}