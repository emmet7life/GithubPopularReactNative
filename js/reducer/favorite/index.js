import Types from '../../action/types';

const item = {}
const defaultState = {
    projectModes: [item],
    isLoading: true,
};
/**
 * favorite:{
 *     popular:{
 *         projectModels:[],
 *         isLoading:false
 *     },
 *     trending:{
 *         projectModels:[],
 *         isLoading:false
 *     }
 * }
 * 0.state树，横向扩展
 * 1.如何动态的设置store，和动态获取store(难点：store key不固定)；
 * @param state
 * @param action
 * @returns {{theme: (favoriteReducer|*|string)}}
 */
export default function favoriteReducer(state = defaultState, action) {
    switch (action.type) {
        case Types.FAVORITE_LOAD_DATA://获取数据
            return {
                ...state,
                [action.name]: {
                    ...(state[action.name] === undefined ? defaultState : state[action.name]),
                    isLoading: true,
                }
            };
        case Types.FAVORITE_LOAD_SUCCESS://下拉获取数据成功
            return {
                ...state,
                [action.name]: {
                    ...(state[action.name] === undefined ? defaultState : state[action.name]),
                    projectModes: action.projectModes,//此次要展示的数据
                    isLoading: false,
                }
            };
        case Types.FAVORITE_LOAD_FAIL://下拉获取数据失败
            return {
                ...state,
                [action.name]: {
                    ...(state[action.name] === undefined ? defaultState : state[action.name]),
                    isLoading: false,
                }
            };
        default:
            return state;
    }

}