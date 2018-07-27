const header = {
    Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjQyYzNmNzRjLWM2Y2QtNDM4Ny1hOTAwLTE3MWY5ZDc1NzA1ZiIsImlhdCI6MTUzMDY4MjA2MSwic3ViIjoiZGV2ZWxvcGVyL2ZjMDMxNDMzLWEzNDQtZmY3NS05OGUwLTNlZjlkNmJjZjljYSIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjExNi4yMzEuMTU5LjEwOCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.D4VZAid5jrPZOY-Y1FIxCqnShRpXdoxX4UsZuLzuh-aYzR8mg3ILl5ChUtAMVRJxAGFUmiDwLwVk_GtTVGP4Kg'
    // Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjlhMmEwNDMwLTFkMTEtNGQ2OC1hODA3LWY1Mjg1MzZmNGIwZSIsImlhdCI6MTUzMDk1NjQ4MSwic3ViIjoiZGV2ZWxvcGVyL2ZjMDMxNDMzLWEzNDQtZmY3NS05OGUwLTNlZjlkNmJjZjljYSIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjYxLjE2NS4xMzguMjIxIl0sInR5cGUiOiJjbGllbnQifV19.As_E8SopSM_txgi9TdFw2qWu9X_iCYGb7l3PJX-aG3BWXnMXhe_OW7luFPOiu5ylIvLhJqWj8GQ8ivP_XaA6fA'
};

const baseUrl = 'http://127.0.0.1:8000/';

/**
 *  get请求
 *  url:请求地址
 *  params:参数
 *  callback:回调函数
 * */
export function get(url, params, callback) {
    console.log('url=' + url);
    if (params) {
        let paramsArray = [];
        //拼接参数
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&')
        } else {
            url += '&' + paramsArray.join('&')
        }
    }
    //fetch请求
    fetch(url, {
        method: 'GET',
        headers: header
    })
        .then((response) => response.json())
        .then((responseJSON) => {
            callback(responseJSON)
        })
        .catch((error) => {
            console.log('error = ' + error)
        });
}


/**
 *  post请求
 *  url:请求地址
 *  params:参数,这里的参数格式是：{param1: 'value1',param2: 'value2'}
 *  callback:回调函数
 * */
export function postJSON(url, params, callback, callbackErr) {
    //fetch请求
    fetch(baseUrl + url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
    })
        .then((response) => response.json())
        .then((responseJSON) => {
            callback(responseJSON)
        })
        .catch((error) => {
            console.log(error);
            callbackErr(error.toString());
            setTimeout(tryError(url, params, callback, 1), 500);
        });
}

function tryError(url, params, callback, time) {
    if (time > 3) {
        return;
    }
    fetch(baseUrl + url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
    })
        .then((response) => response.json())
        .then((responseJSON) => {
            callback(responseJSON)
        })
        .catch((error) => {
            time++;
            tryError(url, params, callback, time)
        });


}


/**
 *  post请求
 *  url:请求地址
 *  params:参数,这里的参数要用这种格式：'key1=value1&key2=value2'
 *  callback:回调函数
 * */
export function postForm(url, params, callback) {
    //fetch请求
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params
    })
        .then((response) => response.json())
        .then((responseJSON) => {
            callback(responseJSON)
        })
        .catch((error) => {
            console.log('error = ' + error)
        });
}





