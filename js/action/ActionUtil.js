/*处理下拉请求-成功*/
import Types from "./types";

/*
 * 处理下拉刷新返回数据
 * @type: action type
 * @dispatch: dispatch
 * @name: 子模块名
 * @data: 原数据
 * @pageSize: 一页请求多少条数据
 */
export function handleRefrshData(type, dispatch, name, data, pageSize) {
    let originItems = [];
    let fixItems = [];
    if (data && data.data) {
        if (Array.isArray(data.data.items)) {
            // Popular 最热数据模型处理
            originItems = data.data.items;
        } else if (Array.isArray(data.data)) {
            // Trending 趋势数据模型处理
            originItems = data.data;
        }
    }
    // 修正数据(只返回一页)
    if (originItems.length > 0) {
        const length = originItems.length;
        const sliceLength = Math.min(length, pageSize);
        fixItems = originItems.slice(0, sliceLength);
    }
    dispatch({
        type: type,
        items: originItems,
        name: name,
        pageIndex: 1,
        projectModes: fixItems
    });
}

/*处理下拉请求-错误*/
export function handleRefreshError(type, dispatch, name, error) {
    dispatch({
        type: type,
        error: error,
        name: name,
        pageIndex: 1
    });
}