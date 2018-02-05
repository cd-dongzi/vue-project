<template>
    <footer class="footer-wrapper df-c border-half-top">
        <ul class="cf">
            <router-link tag="li" :to="item.path" v-for="(item, index) in footerBarList" :class="{'active': ($route.matched[0].path || $route.matched[1].path) === item.path}" :key="index">
                <Icon :name="item.icon"></Icon>
                <div>{{item.title}}</div>
            </router-link>
        </ul>
    </footer>
</template>
<script>
    import { Local } from 'src/utils/storage'
    import { mapGetters } from 'vuex'
    export default {
        computed: {
            ...mapGetters([
                'footerBarList',
                'user'
            ])
        }
    }
</script>
<style lang="less" scoped>

    .footer-wrapper {
        position: absolute;
        left: 0;bottom: 0;
        width: 100%;
        height: 0.5rem;
        font-size: 0.16rem;
        z-index: 99;
        background-color: #fff;
        ul {
            width: 100%;
        }
        li {
            width: 25%;
            float: left;
            text-align: center;
            color: @theme-black;
            svg {
                width: 0.22rem;
                height: 0.22rem;
            }
            div {
                width: 100%;
                font-size: 0.12rem;
                margin-top: 0.06rem;
            }
        }
        .active {
            color: @theme-red;
        }
    }
</style>