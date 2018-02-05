import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import search from './modules/search'
import user from './modules/user'
import home from './modules/home'
import headline from './modules/headline'
import video from './modules/video'
import record from './modules/record'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        app,
        search,
        user,
        home,
        video,
        headline,
        record
    },
    getters
})

export default store