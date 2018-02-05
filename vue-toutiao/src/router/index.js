import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
Router.prototype.animate = 0
const _import_ = file => () => import('views/' + file + '.vue')


/*
    slide: 页面切换动画
    login: 是否需要登陆

 */
export const constantRouterMap = [
    { 
        path: '/', 
        name: '首页', 
        meta: { page: true},
        component: _import_('Layout/index'),
        redirect: '/home',
        children: [
            { path: 'home', component: _import_('Home/index'), name: '首页' }
        ]
    },
    { 
        path: '/video',  
        meta: { page: true},
        component: _import_('Layout/index'),
        redirect: '/',
        children: [
            { path: '/', component: _import_('Video/index'), name: '视频' }
        ]
    },
    { 
        path: '/headline',  
        meta: { page: true},
        component: _import_('Layout/index'),
        redirect: '/',
        children: [
            { path: '/', component: _import_('Headline/index'), name: '微头条' }
        ]
    },
    { 
        path: '/account', 
        meta: { page: true}, 
        component: _import_('Account/index'),
        name: '个人中心'
    },
    { 
        path: '/search', 
        name: '搜索', 
        meta: { slide: 1 },
        component: _import_('Search/index')
    },
    { 
        path: '/article/:id', 
        name: '文章', 
        meta: { slide: 1 },
        component: _import_('Article/index')
    },
    { 
        path: '/system', 
        name: '系统设置', 
        meta: { 
            slide: 1 ,
            login: true
        },
        component: _import_('System/index')
    },
    { 
        path: '/record', 
        name: '我的记录', 
        meta: { 
            slide: 1 ,
            login: true
        },
        component: _import_('Record/index')
    },
    { 
        path: '/jd', 
        name: '京东商城', 
        meta: { 
            slide: 1 ,
            login: true
        },
        component: _import_('Jingdong/index')
    },
    { 
        path: '/msg', 
        name: '消息通知', 
        meta: { 
            slide: 1 ,
            login: true
        },
        component: _import_('Msg/index')
    },
    { 
        path: '/mall', 
        name: '头条商城', 
        meta: { 
            slide: 1 ,
            login: true
        },
        component: _import_('Mall/index')
    },
    { 
        path: '/feedback', 
        name: '用户反馈', 
        meta: { 
            slide: 1 ,
            login: true
        },
        component: _import_('Feedback/index')
    }
]
export const asyncRouterMap = [

]

export const router = new Router({
    // mode: 'history',
    routes: constantRouterMap
})
