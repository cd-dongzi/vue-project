<template>
    <article class="headline-wrapper">
        <section>
            <TopBar></TopBar>
        </section>
        <div class="header-container" v-scroll="loadingMore">
            <div class="header-box">
                <section class="item border-half-top" v-for="item in headlineList" @click="skip($router, item.id)">
                    <div class="item-t df-sb">
                        <div class="item-t-l">
                            <div class="avatar bg-cover-all" :style="{backgroundImage: `url(${item.avatar})`}"></div>
                            <div class="info">
                                <div class="name">{{item.name}}</div>
                                <div class="info-box">
                                    <time>{{item.time}}小时以前</time> ·
                                    <span>{{item.tag}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="item-t-r" @click.stop="item.attention = !item.attention">
                            <span v-if="item.attention" class="like-y">已关注</span>
                            <span v-else class="like-n">关注</span>
                        </div>
                    </div>
                    <div class="item-m">
                        <p>{{item.intro}}</p>
                        <div class="images">
                            <img :src="img" :class="item.images.length > 2 ? 'three':item.images.length === 2 ? 'two':'one'" v-for="img in item.images">
                        </div>
                        <span>{{item.read_num}}阅读</span>
                    </div>
                    <div class="item-b df-c">
                        <div class="item-b-icon df-c" @click.stop="$alert('暂不支持！')">
                            <Icon name="exchangejiaohuan"></Icon>
                            <span>{{item.opinion_num}}</span>
                        </div>
                        <div class="item-b-icon df-c" @click.stop="$alert('暂不支持！')">
                            <Icon name="comment"></Icon>
                            <span>{{item.comment_num}}</span>
                        </div>
                        <div class="item-b-icon df-c" :class="{'item-b-icon-active': item.islike}" @click.stop="likeNum(item)">
                            <Icon name="zan"></Icon>
                            <span>{{item.like_num}}</span>
                        </div>
                    </div>
                </section>
            </div>
            <NoneData v-if="headlineEnd"></NoneData>
        </div>

        <DefaultLoading v-show="headlineLoading"></DefaultLoading>
    </article>
</template>
<script>
    import TopBar from './topBar/index'
    import { mapGetters } from 'vuex'
    export default {
        components: { TopBar },
        data () {
            return {
                pageindex: 1
            }
        },
        created () {
            this.$store.dispatch('getHeadlineList', { pageindex: this.pageindex })
        },
        
        methods: {
            loadingMore () {
                return new Promise( async (resolve, reject) => {
                    this.pageindex ++
                    await this.$store.dispatch('getHeadlineList', { pageindex: this.pageindex })
                    resolve()
                })
            },
            // 点赞
            likeNum (item) {
                item.islike = !item.islike
                if (item.islike) {
                    item.like_num ++
                }else{
                    item.like_num --
                } 
            }
        },
        computed: {
            ...mapGetters([
                'headlineList',
                'headlineLoading',
                'headlineEnd'
            ])
        },
        watch: {
            $route () {
                console.log(11)
            }
        }
    }
</script>
<style lang="less" scoped>
    .header-container {
        height: e("calc(100% - 0.4rem)");
        overflow-y: scroll;
    }
    .item {
        padding-top: 0.1rem;
    }
    .item-t, .item-m {
        padding: 0 0.1rem;
    }
    .item-t {
        .item-t-l{
            >* {
                display: inline-block;
                vertical-align: middle;
            } 
            .avatar {
                width: 0.4rem;
                height: 0.4rem;
                border-radius: 50%;
                margin-right: 0.08rem;
            }
            .name {
                color: #111;
            }  
            .info-box {
                color: @font-gray;
                font-size: 0.1rem;
            }
        }
        .item-t-r {
            font-size: 0.12rem;
            .like-y {
                color: @font-gray;
            }
            .like-n {
                color: @theme-red;
            }
        }
    }
    .item-m {
        padding-bottom: 0.1rem;
        p {
            line-height: 0.25rem;
        }
        .images {
            margin-top: 0.04rem;
            display: flex;
            align-items: flex-start;
            flex-wrap:wrap;
            img {
                margin-top: 0.1rem;
            }
            .one {
                width: 50%;
            }
            .two {
                width: 40%;
                margin-right: 10%;
            }
            .three {
                width: 30%;
                margin-right: 3%;
            }
        }
        span {
            font-size: 0.1rem;
            color: @font-gray;
        }
    }
    .item-b {
        .item-b-icon {
            width: e("calc(100% / 3)");
            height: 0.4rem;
            text-align: center;
            font-size: 0.14rem;
            color: @font-gray;
            span {
                margin-left: 0.08rem;
            }
        }
        .item-b-icon-active {
            color: @theme-red;
        }
    }
</style>