import Types from '../../action/types';

/*
 * {
 *   tintColor: '#color'
 * }
 *
 */
const defaultState = {
    tintColor: '#099'
};

// themeReducer 主题改变数据修改器
export default function themeReducer(state = defaultState, action) {
    switch (action.type) {
        case Types.THEME_CHANGE:
            return {
                ...state,
                tintColor: action.tintColor
            }
        default:
            return state;
    }
}