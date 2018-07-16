import {AsyncStorage} from "react-native";

/**
 * 存储
 * @param key
 * @param value
 * @param successCallback
 * @param errorCallback
 */
export function saveAsyncStorage(key, value, successCallback, errorCallback) {
    AsyncStorage.setItem(key, value, error => {
        if (error) {
            errorCallback(error);
        }
        else {
            successCallback();
        }
    })
}

/**
 * 取值
 * @param key
 * @param successCallback
 * @param errorCallback
 */
export function getAsyncStorage(key, successCallback, errorCallback) {
    AsyncStorage.getItem(key, (error, result) => {
        if (error) {
            errorCallback(error);
        }
        else {
            successCallback(result);
        }
    })
}

/**
 * 删除对应key的
 * @param key
 * @param successCallback
 * @param errorCallback
 */
export function removeAsyncStorage(key, successCallback, errorCallback) {
    AsyncStorage.getItem(key, error => {
        if (error) {
            errorCallback(error);
        }
        else {
            successCallback();
        }
    })
}