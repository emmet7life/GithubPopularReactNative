export default class NavigationUtil {

    /*重置到首页*/
    static resetHomePage(params) {
        const {navigation} = params;
        navigation.navigate("Main");
    }

    /*返回到上一页*/
    static goBack(navigation) {
        navigation.goBack();
    }

    /**
     * 跳转到指定页面
     * @param params 要传递的参数
     * @param page 要跳转的页面名
     **/
    static goPage(params, page) {
        const navigation = NavigationUtil.navigation;
        if (!navigation) {
            console.log('NavigationUtil.navigation can not be null')
            return;
        }
        navigation.navigate(
            page,
            {
                ...params
            }
        )
    }

}