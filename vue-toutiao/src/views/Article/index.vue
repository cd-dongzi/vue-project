<template>
    <article class="article-wrapper">
        <div class="head df-sb border-half-bottom">
            <Icon name="jiantou" @click.native="back($router)"></Icon>
            <Icon name="More" @click.native="more"></Icon>
        </div>
        <h2>ID：{{articleInfo.id}}</h2>
        <h2>{{articleInfo.title}}</h2>
        <div class="info df-sb">
            <div class="info-a">
                <div class="avatar bg-cover-all" :style="{backgroundImage: `url(${articleInfo.avatar})`}"></div>
                <div>
                    <h6>{{articleInfo.source}}</h6>
                    <time>{{articleInfo.time}}小时前</time>
                </div>
            </div>
            <div class="like-box" :class="articleInfo.attention?'like-n border-half':'like-y'" @click="articleInfo.attention = !articleInfo.attention">{{articleInfo.attention?'已关注':'关注'}}</div>
        </div>
        <p class="intro">{{articleInfo.intro}}</p>
        <div class="tags">
            <div class="tag" v-for="tag in articleInfo.tags">{{tag}}</div>
        </div>
        <div class="like-container df-sa">
            <div class="like df-c" :class="articleInfo.islike ? 'like-y':''" @click="articleInfo.islike = !articleInfo.islike">
                <Icon name="zan"></Icon>
                <span>{{articleInfo.like_num}}</span>
            </div>
        </div>
    </article>
</template>
<script>
    import { mapGetters } from 'vuex'
    export default {
        async created () {
            this.$showLoading()
            await this.$store.dispatch('getArticle', {id: this.$route.params.id})
            this.$hideLoading()
        },
        methods: {
            more () {
                this.$alert('没有更多信息哦!')
            }
        },
        computed: {
            ...mapGetters([
                'articleInfo'
            ])
        },
        watch: {
            async $route () {
                this.$showLoading()
                await this.$store.dispatch('getArticle', {id: this.$route.params.id})
                this.$hideLoading()
            }
        }
    }
</script>
<style lang="less" scoped>
    .article-wrapper {
        padding: 0 0.1rem;
        .head {
            width: 100%;
            height: 0.5rem;
            font-size: 0.25rem;
        }
        .info {
            .info-a {
                >* {
                    display: inline-block;
                    vertical-align: middle;
                    font-size: 0.12rem;
                }
                time {
                    color: #ccc;
                }
                .avatar {
                    width: 0.4rem;
                    height: 0.4rem;
                    border-radius: 50%;
                }
            }
            .like-box {
                padding: 0.06rem 0.15rem;
                border-radius: 0.04rem;
                font-size: 0.14rem;
            }
            .like-y {
                color: #f4f4f4;
                background-color: @theme-bg-red;
            }
            .like-n {
                color: #bbb;
            }
        }
        h2 {
            margin: 0.1rem 0;
        }
        .intro {
            margin: 0.2rem 0;
            line-height: 0.25rem;
            font-size: 0.16rem;
        }
        .tags {
            .tag {
                display: inline-block;
                margin-right: 0.15rem;
                margin-bottom: 0.15rem;
                padding: 0.06rem 0.1rem;
                background: #ccc;
                color: #333;
                border-radius: 0.04rem;
                font-size: 0.12rem;
            }
        }
        .like-container {
            height: 0.6rem;
            >* {
                width: 1rem;
                height: 0.3rem;
                font-size: 0.12rem;
                border: 1px solid #ccc;
                border-radius: 0.15rem;
                svg {
                    font-size: 0.16rem;
                }
                span {
                    margin-left: 0.1rem;
                }
            }
            .like-y {
                color: @theme-red;
                border-color: @theme-red; 
            }
        }
    }
</style>