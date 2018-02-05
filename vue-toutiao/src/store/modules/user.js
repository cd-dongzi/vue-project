import { Cookie } from 'utils/storage'
import axios from 'src/utils/fetch'
const user = {
    state: {
        isLogin: false,
        user: {
            name: Cookie.get('username') || '',
            avatar: Cookie.get('avatar') || ''
        },
        footerBarList: [
            {title: '首页', icon: 'home', path: '/home'},
            {title: '西瓜视频', icon: 'video', path: '/video'},
            {title: '微头条', icon: 'comment', path: '/headline'},
            {title: `${Cookie.get('username')?'我的':'未登录'}`, icon: `${Cookie.get('username')?'account':'account1'}`, path: '/account'}
        ]
    },
    actions: {
        login ({commit}, params) {
            return new Promise( (resolve, reject) => {
                axios.post('login', params)
                    .then( res => {
                        console.log(res)
                        commit('LOGIN', res.data)
                        resolve(res.data)
                    }).catch( err => {
                        reject(err)
                    })
            })
        },
        esc ({commit}) {
            commit('ESC')
        }
    },
    mutations: {
        LOGIN (state, data) {
            state.user = {
                name: data.username,
                avatar: require('assets/images/avatar.png')
            }
            Cookie.set({
                username: data.username,
                avatar: require('assets/images/avatar.png')
            })
        },
        ESC (state) {
            state.user = {
                name: '',
                avatar: ''
            }
            Cookie.remove(['username', 'avatar'])
        }
    }
}
export default user
