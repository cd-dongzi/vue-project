import axios from 'src/utils/fetch'

const video = {
    state: {
        list: [],
        loading: false,
        loadingMore: false,
        end: false
    },
    actions: {
        getVideoList ({commit, state}, params = {}) {
            if (state.loadingMore) return 
            state.loading = true
            return new Promise( (resolve, reject) => {
                axios.get('video/list', params)
                    .then( res => {
                        console.log(res)
                        state.loading = false
                        if (res.data.list.length < 6) {
                            state.loadingMore = true
                            state.end = true
                        }
                        commit('GETVIDEOLIST', res.data.list)
                        resolve(res.data.list)
                    }).catch( err => {
                        reject(err)
                    })
            })
        }
    },
    mutations: {
        GETVIDEOLIST (state, list) {
            state.list = state.list.concat(list)
        }
    }
}
export default video