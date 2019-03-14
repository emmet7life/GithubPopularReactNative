import Types from '../types';

// Action Creator: action 生成器
export function onThemeChange(tintColor) {
    return {type: Types.THEME_CHANGE, tintColor: tintColor};
}