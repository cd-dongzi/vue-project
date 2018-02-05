import Vue from 'vue'
import App from './App.vue'
import router from './router/permission.js'
import store from './store'

/*样式*/
import './styles/index.css'
import './styles/index.less'

/*工具类*/
import './utils/iconfont.js'
import './utils/rem.js'

/*指令*/
import './directive'

import { Cookie } from 'src/utils/storage'
Vue.prototype.Cookie = Cookie

// 返回
Vue.prototype.back = (route) => {
    route.animate = 2
    history.go(-1)
}

// 跳转文章页
Vue.prototype.skip = (route, id) => {
    route.push('/article/'+id)
}

// 全局组件
import customComponents from './custom-components.js'
Vue.use(customComponents)

// swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css' 
Vue.use(VueAwesomeSwiper)

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})