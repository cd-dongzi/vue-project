import axios from 'src/utils/fetch'

const common = {
    state: {
        keyword: '',
        pageindex: 1,
        list: [],
        loading: false,
        loadingMore: false,
        end: false
    },
    actions: {
        getSearchList ({commit, state}, params = {}) {
            if (state.loadingMore && !state.loading) return 
            state.loading = true
            console.log(params)
            return new Promise( (resolve, reject) => {
                axios.get('search', params)
                    .then( res => {
                        console.log(res)
                        state.loading = false
                        if (res.data.list.length < 6) {
                            state.loadingMore = true
                            state.end = true
                        }
                        commit('GETSEARCHLIST', res.data.list)
                        
                        resolve(res.data.list)
                    }).catch( err => {
                        reject(err)
                    })
            })
        }
    },
    mutations: {
        GETSEARCHLIST (state, list) {
            state.list = state.pageindex === 1 ? list : state.list.concat(list)
        },
        INITLIST (state, list) {
            state.list = list
        }
    }
}
export default common