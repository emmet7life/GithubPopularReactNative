export default class ObjectUtils {

    /*遍历对象的Key*/
    static alertObjectKeys(obj) {
        var keys = [];
        Object.keys(obj).forEach((key, index) => {
            keys[index] = key;
        });
        alert(keys.join(","));
    }

}