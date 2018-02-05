<template>
    <div class="top-bar-box">
        <Icon name="close" class="close" @click.native="$emit('close')"></Icon>
        <div class="self-box">
            <div class="title df-sb">
                <div class="title-l">
                    <span>我的频道</span>
                    <small>点击删除以下频道</small>
                </div>
            </div>
            <ul class="cf">
                <li class="fl" v-for="news in newsList">
                    <a href="javascript:;" @click="$store.dispatch('delHomeTag', news)">{{news.title}}</a>
                </li>
            </ul>
        </div>
        <div class="recommend-box">
            <div class="title df-sb">
                <div class="title-l">
                    <span>推荐频道</span>
                    <small>点击添加以下频道</small>
                </div>
            </div>
            <ul class="cf">
                <li class="fl" v-for="news in allNewsList">
                    <a href="javascript:;" @click="$store.dispatch('addHomeTag', news)">{{news.title}}</a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    import { newsList as allNewsList } from 'src/store/modules/classify'
    export default {
        data () {
            return {
                animate: 'slide-top'
            }
        },
        created () {
            console.log(this.animate)
        },
        computed: {
            ...mapGetters([
                'newsList'
            ]),
            allNewsList () {
                return allNewsList.filter( news => {
                    return !this.newsList.some( v => news.title === v.title)
                }) 
            }
        }
    }
</script>
<style lang="less" scoped>
    
    .top-bar-box {
        position: fixed;
        top: 100%;left:0;
        width: 100%;
        height: e("calc(100% - 0.1rem)");
        background: #f5f5f5;
        text-align: left;
        border-top-right-radius: 0.1rem;
        border-top-left-radius: 0.1rem;
        z-index: 99;
        padding: 0.1rem;
        padding-top: 0.34rem;
        transition: top .2s ease-out;
        .close {
            position: absolute;
            left: 0.05rem;top: 0.05rem;
            padding: 0.05rem;
            font-size: 0.24rem;
        }
        .title {
            small {
                color: #666
            }
        }
        li {
            width: 25%;
            margin: 0.06rem 0;
            a {
                display: block;
                width: 0.8rem;
                text-align: center;
                line-height: 0.35rem;
                background: #f0f0f0;
                color: @font-gray;
            }
        }

        .recommend-box {
            margin-top: 0.2rem;
        }
    }
</style>