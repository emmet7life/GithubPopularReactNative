import {AsyncStorage} from 'react-native';

export default class DataStore {

    /*获取数据*/
    fetchData(url) {
        return new Promise((resolve, reject) => {
            this.fetchLocalData(url)
                .then((wrapData) => {
                    // 在有效期内，直接返回
                    if (wrapData && DataStore.checkTimestampValid(wrapData.timestamp)) {
                        resolve(wrapData);
                    } else {
                        // 否则请求网络数据
                        this.fetchNetData(url)
                            .then((wrapData) => {
                                resolve(wrapData);
                            })
                            .catch(error => {
                                reject(error);
                            })
                    }
                })
                .catch(error => {
                    // 读取本地数据异常，请求网络数据
                    this.fetchNetData(url)
                        .then((wrapData) => {
                            resolve(wrapData);
                        })
                        .catch(error => {
                            reject(error);
                        })
                })
        })
    }

    /*保存数据*/
    saveData(url, data, callback) {
        if (!data || !url) return;
        const wrapData = this._wrapData(data);
        AsyncStorage.setItem(url, JSON.stringify(wrapData), callback);
        return wrapData
    }

    /*包装数据：加上时间戳*/
    _wrapData(data) {
        return {data: data, timestamp: new Date().getTime()};
    }

    /*获取本地数据*/
    fetchLocalData(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, (error, result) => {
                if (!error) {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        console.error('fetchLocalData >> AsyncStorage getItem ok, but JSON.parse error -> ', e);
                        reject(e);
                    }
                } else {
                    console.error('fetchLocalData >> AsyncStorage getItem error -> ', e);
                    reject(error);
                }
            })
        })
    }

    /*获取网络数据*/
    fetchNetData(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('fetchNetData fetched response not ok.');
                })
                .then(json => {
                    const wrapData = this.saveData(url, json);
                    resolve(wrapData);
                })
                .catch(error => {
                    console.log('fetchNetData fetch error -> ', error);
                    reject(error);
                })
        })
    }

    /*检查timestamp是否在有效期内*/
    static checkTimestampValid(timestamp) {
        const currentDate = new Date();
        const targetDate = new Date();
        targetDate.setTime(timestamp);
        if (currentDate.getFullYear() !== targetDate.getFullYear()) return false;
        if (currentDate.getMonth() !== targetDate.getMonth()) return false;
        if (currentDate.getDate() !== targetDate.getDate()) return false;
        if (currentDate.getHours() - targetDate.getHours() > 4) return false;// 超过4小时，即失效!
        // if (currentDate.getMinutes() - targetDate.getMinutes() > 2) return false;// 超过2分钟，即失效!
        return true;
    }
}