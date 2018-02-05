import axios from 'src/utils/fetch'

const record = {
    state: {
        types: [
            {title: '我的收藏', list: []},
            {title: '阅读历史', list: []},
            {title: '推送历史', list: []}
        ],
        index: 0,
        loading: false,
        loadingMore: false,
        end: false
    },
    actions: {
        getRecordList ({commit, state}, params = {}) {
            // if (state.loadingMore) return 
            let obj = state.types.find(v => v.title == params.title)
            if (obj.list.length) return
            state.loading = true
        console.log(params)
            return new Promise( (resolve, reject) => {
                axios.get('record/list', params)
                    .then( res => {
                        console.log(res)
                        state.loading = false
                        if (res.data.list.length < 11) {
                            // state.loadingMore = true
                            state.end = true
                        }
                        commit('GETRECORDLIST', res.data.list)
                        resolve(res.data.list)
                    }).catch( err => {
                        reject(err)
                    })
            })
        }
    },
    mutations: {
        GETRECORDLIST (state, list) {
            state.types[state.index].list = state.types[state.index].list.concat(list)
            // state.list = state.list.concat(list)
        }
    }
}
export default record