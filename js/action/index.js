import {onThemeChange} from "./theme";
import {onRefreshPopular, onLoadMorePopular} from "./popular";
import {onRefreshTrending, onLoadMoreTrending} from "./trending";
import {onLoadFavoriteData} from "./favorite";

// 统一导出支持的action
export default {
    // Theme
    onThemeChange,
    // Popular
    onRefreshPopular,
    onLoadMorePopular,
    // Trending
    onRefreshTrending,
    onLoadMoreTrending,
    // Favorite
    onLoadFavoriteData,
}