
/**
 * 判断字符串是否为空
 * @param str
 * @returns {boolean}
 */
export function isEmpty(str) {
    if (str !== null || str !== undefined || str !== '') {
        return true;
    } else {
        return false
    }
}

