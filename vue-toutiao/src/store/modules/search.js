import axios from 'src/utils/fetch'
import { Local } from 'utils/storage'

const SEARCH_HISTORY_KEY = 'searchHistory'
const SEARCH_HISTORY_LIMIT = 8

const getInitialHistory = () => Local.get(SEARCH_HISTORY_KEY) || []

const common = {
    state: {
        keyword: '',
        pageindex: 1,
        list: [],
        history: getInitialHistory(),
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
                        state.loading = false
                        reject(err)
                    })
            })
        },
        addSearchHistory ({ commit }, keyword) {
            commit('ADDSEARCHHISTORY', keyword)
        },
        clearSearchHistory ({ commit }) {
            commit('CLEARSEARCHHISTORY')
        },
        removeSearchHistory ({ commit }, keyword) {
            commit('REMOVESEARCHHISTORY', keyword)
        }
    },
    mutations: {
        GETSEARCHLIST (state, list) {
            state.list = state.pageindex === 1 ? list : state.list.concat(list)
        },
        INITLIST (state, list) {
            state.list = list
        },
        ADDSEARCHHISTORY (state, keyword) {
            const value = (keyword || '').trim()
            if (!value) return

            state.history = state.history.filter(item => item !== value)
            state.history.unshift(value)
            state.history = state.history.slice(0, SEARCH_HISTORY_LIMIT)
            Local.set(SEARCH_HISTORY_KEY, state.history)
        },
        CLEARSEARCHHISTORY (state) {
            state.history = []
            Local.set(SEARCH_HISTORY_KEY, state.history)
        },
        REMOVESEARCHHISTORY (state, keyword) {
            state.history = state.history.filter(item => item !== keyword)
            Local.set(SEARCH_HISTORY_KEY, state.history)
        }
    }
}
export default common
