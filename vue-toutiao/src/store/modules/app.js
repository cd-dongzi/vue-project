import Vue from 'vue'
import axios from 'src/utils/fetch'
const app = {
    state: {
        articleInfo: {},
        pageLoading: false
    },
    actions: {
        getArticle ({commit}, params) {
            return new Promise( (resolve, reject) => {
                axios.get('article/info', params)
                    .then( res => {
                        console.log(res)
                        commit('GETARTICLE', res.data)
                        resolve(res.data)
                    }).catch( err => {
                        reject(err)
                    })
            })
        }
    },
    mutations: {
        GETARTICLE (state, info) {
            state.articleInfo = info
        }
    }
}
export default app
