import Types from '../types';
import FavoriteDao from '../../expand/dao/FavoriteDao';
import ProjectModel from '../../model/ProjectModel';

/**
 * 加载收藏的项目
 * @param flag 标识
 * @param isShowLoading 是否显示loading
 * @returns {function(*)}
 */
export function onLoadFavoriteData(flag, isShowLoading) {
    return dispatch => {
        if (isShowLoading) {
            // 正在请求
            dispatch({
                type: Types.FAVORITE_LOAD_DATA,
                name: flag
            });
        }

        new FavoriteDao(flag).getAllItems()
            .then(items => {
                let allItems = [];
                for (let i = 0, len = items.length; i < len; i++) {
                    allItems.push(new ProjectModel(items[i], true))
                }
                dispatch({
                    type: Types.FAVORITE_LOAD_SUCCESS,
                    projectModes: allItems,
                    name: flag
                });
            })
            .catch(error => {
                console.error(error);
                dispatch({
                    type: Types.FAVORITE_LOAD_FAIL,
                    error: error,
                    name: flag
                })
            });
    }
}