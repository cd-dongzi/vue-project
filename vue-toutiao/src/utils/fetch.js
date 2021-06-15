import axios from 'axios'
import qs from 'qs'


axios.defaults.withCredentials = true 

axios.defaults.baseURL = 'https://easy-mock.dzblog.cn/mock/60c8cf43a5cb582b4571ab2f/api'
// 发送时
axios.interceptors.request.use(config => {
    // 开始
    return config
}, err => {
    return Promise.reject(err)
})

// 响应时
axios.interceptors.response.use(response => response, err => Promise.resolve(err.response))

// 检查状态码
function checkStatus(res) { 
    // 结束
    if (res.status === 200 || res.status === 304) {
        return res.data
    }
    return {
        code: 0,
        msg: res.data.msg || res.statusText,
        data: res.statusText
    }
    return res
}


// 检查CODE值
function checkCode(res) {
    if (res.code === 0) {
        throw new Error(res.msg)
    }
    
    return res
}

export default {
    get(url, params) {
        if (!url) return
        return axios({
            method: 'get',
            url,
            params,
            timeout: 30000
        }).then(checkStatus).then(checkCode)
    },
    post(url, data) {
        if (!url) return
        return axios({
            method: 'post',
            url,
            data: qs.stringify(data),
            timeout: 30000
        }).then(checkStatus).then(checkCode)
    },
    postFile(url, data) {
        if (!url) return
        return axios({
            method: 'post',
            url,
            data
        }).then(checkStatus).then(checkCode)
    }
}
