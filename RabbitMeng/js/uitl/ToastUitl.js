import {Platform,AlertIOS,ToastAndroid} from 'react-native';

export function showToastShort(msg) {
    if (Platform.OS === 'ios') {
        AlertIOS.alert('提示',msg)
    } else {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    }
};

export function showToastLong(msg) {
    if (Platform.OS === 'ios') {
        AlertIOS.alert('提示',msg)
    } else {
        ToastAndroid.show(msg, ToastAndroid.LONG);
    }
};