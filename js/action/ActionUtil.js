/*处理下拉请求-成功*/
import Types from "./types";
import Utils from "../utils/Utils";
import ProjectModel from '../model/ProjectModel';

/*
 * 处理下拉刷新返回数据
 * @type: action type
 * @dispatch: dispatch
 * @name: 子模块名
 * @data: 原数据
 * @pageSize: 一页请求多少条数据
 * @favoriteDao: 收藏数据模型
 */
export function handleRefreshData(type, dispatch, name, data, pageSize, favoriteDao) {
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

    _projectModes(fixItems, favoriteDao, itemModels => {
        dispatch({
            type: type,
            items: originItems,
            name: name,
            pageIndex: 1,
            projectModes: itemModels
        });
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

/**
 * 通过本地的收藏状态包装Item
 * @param showItems
 * @param favoriteDao
 * @param callback
 * @returns {Promise<void>}
 * @private
 */
export async function _projectModes(showItems, favoriteDao, callback) {
    let keys = [];
    try {
        //获取收藏的key
        keys = await favoriteDao.getFavoriteKeys();
    } catch (e) {
        console.log(e);
    }
    let projectModes = [];
    for (let i = 0, len = showItems.length; i < len; i++) {
        projectModes.push(new ProjectModel(showItems[i], Utils.checkFavorite(showItems[i], keys)));
    }
    doCallBack(callback, projectModes);
}

export const doCallBack = (callBack, object) => {
    if (typeof callBack === 'function') {
        callBack(object);
    }
};
