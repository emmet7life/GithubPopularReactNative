import {onThemeChange} from "./theme";
import {onRefreshPopular, onLoadMorePopular, onFlushPopularFavorite} from "./popular";
import {onRefreshTrending, onLoadMoreTrending, onFlushTrendingFavorite} from "./trending";
import {onLoadFavoriteData} from "./favorite";

// 统一导出支持的action
export default {
    // Theme
    onThemeChange,
    // Popular
    onRefreshPopular,
    onLoadMorePopular,
    onFlushPopularFavorite,
    // Trending
    onRefreshTrending,
    onLoadMoreTrending,
    onFlushTrendingFavorite,
    // Favorite
    onLoadFavoriteData,
}