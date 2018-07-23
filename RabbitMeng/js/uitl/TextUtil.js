
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

export function startWith(text,match) {
    if (isEmpty(text) || isEmpty(match)) {
        return false;
    }
    // if (typeof String.prototype.startsWith !== 'function') {
    //     String.prototype.startsWith = function (prefix){
    //         return this.slice(0, prefix.length) === prefix;
    //     };
    // }else {
    //
    // }
    return text.startsWith(match);
}
