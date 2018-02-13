import axios from 'axios'
import qs from 'qs'


axios.defaults.withCredentials = true 

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

const baseURL = 'https://easy-mock.com/mock/5a83160c948cfd365a524088/apis/'

// 备用路径  
// const baseURL = 'https://easy-mock.com/mock/5a83160c948cfd365a524088/apis/'
// const baseURL = 'https://easy-mock.com/mock/5a6fe597a52f145df7e8a38a/apis/'
export default {
    get(url, params) {
        if (!url) return
        return axios({
            method: 'get',
            url: baseURL + url,
            params,
            timeout: 30000
        }).then(checkStatus).then(checkCode)
    },
    post(url, data) {
        if (!url) return
        return axios({
            method: 'post',
            url: baseURL + url,
            data: qs.stringify(data),
            timeout: 30000
        }).then(checkStatus).then(checkCode)
    },
    postFile(url, data) {
        if (!url) return
        return axios({
            method: 'post',
            url: baseURL + url,
            data
        }).then(checkStatus).then(checkCode)
    }
}
