<template>
    <div class="search-body-wrapper" v-scroll="loadingMore">
        <div class="search-container">
            <div class="guess" v-if="searchList.length < 1">
                <div class="tip">猜你想搜</div>
                <ul class="search-menu border-half cf">
                    <li class="fl border-half" v-for="news in keywordList" :key="news" @click="getSearchData(news)">{{news}}</li>
                </ul>
                <div class="history" v-if="searchHistory.length > 0">
                    <div class="history-head df-sb">
                        <span class="history-title">最近搜索</span>
                        <span class="history-clear" @click="clearHistory">清空</span>
                    </div>
                    <ul class="history-menu">
                        <li class="history-item" v-for="item in searchHistory" :key="item">
                            <span class="history-keyword" @click="getSearchData(item)">{{item}}</span>
                            <span class="history-remove" @click.stop="removeHistory(item)">×</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="search-box" v-else>
                <section v-for="item in searchList" :key="item.id" class="item border-half-bottom" @click="skip(item.id)">
                    <div v-if="item.images.length === 0">
                        <h4>{{item.title}}</h4>
                        <p class="wes-3">{{item.intro}}</p>
                        <div class="df-sb">
                            <div class="small-box">
                                <span>{{item.source}}</span>
                                <span>评论：{{item.comment}}</span>
                                <span>{{item.time}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="df-sb" v-else-if="item.images.length === 1">
                        <div class="item-l">
                            <h4>{{item.title}}</h4>
                            <p class="wes-2">{{item.intro}}</p>
                            <div class="df-sb">
                                <div class="small-box">
                                    <span>{{item.source}}</span>
                                    <span>评论：{{item.comment}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="item-r">
                            <img :src="item.images[0]" alt="">
                        </div>
                    </div>
                    <div v-else>
                        <div class="item-t">
                            <h4>{{item.title}}</h4>
                            <p class="wes-1">{{item.intro}}</p>
                        </div>
                        <div class="item-b df-sb">
                            <img :src="img" :alt="img" :style="{width: item.images.length === 2 ? '40%' : '25%'}" v-for="img in item.images" :key="img">
                        </div>
                        <div class="df-sb">
                            <div class="small-box">
                                <span>{{item.source}}</span>
                                <span>评论：{{item.comment}}</span>
                            </div>
                        </div>
                    </div>
                </section>
                <NoneData v-if="searchEnd"></NoneData>
            </div>
        </div>
        <DefaultLoading v-show="searchLoading"></DefaultLoading>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'

    export default {
        data () {
            return {
                keywordList: ['Easy-Mock', 'webpack', 'vue', 'Javascript']
            }
        },
        methods: {
            skip (id) {
                this.$router.animate = 1
                this.$router.push('/article/' + id)
            },
            getSearchData (keyword) {
                this.$store.state.search.keyword = keyword
                this.$store.state.search.pageindex = 1
                this.$store.state.search.loadingMore = false
                this.$store.state.search.end = false
                this.$store.dispatch('addSearchHistory', keyword)
                this.$store.dispatch('getSearchList', { keyword, pageindex: this.$store.state.search.pageindex })
            },
            clearHistory () {
                this.$store.dispatch('clearSearchHistory')
            },
            removeHistory (keyword) {
                this.$store.dispatch('removeSearchHistory', keyword)
            },
            loadingMore () {
                return new Promise(async (resolve) => {
                    this.$store.state.search.pageindex++
                    await this.$store.dispatch('getSearchList', { keyword: this.keyword, pageindex: this.searchPageindex })
                    resolve()
                })
            }
        },
        computed: {
            ...mapGetters([
                'keyword',
                'searchPageindex',
                'searchList',
                'searchHistory',
                'searchLoading',
                'searchEnd'
            ])
        }
    }
</script>
<style lang="less" scoped>
    .search-body-wrapper {
        height: e("calc(100% - 0.5rem)");
        overflow-y: scroll;
    }
    .guess {
        .tip {
            color: #ccc;
            line-height: 0.35rem;
            font-size: 0.1rem;
            padding: 0 0.1rem;
        }
        .search-menu {
            li {
                width: e("calc(100% / 2)");
                text-align: center;
                line-height: 0.35rem;
                font-size: 0.14rem;
                color: #333;
                &:before {
                    border-top: none;
                }
            }
            li:nth-child(2n) {
                &:before {
                    border-left: none;
                }
            }
        }
        .history {
            padding: 0.14rem 0.1rem 0;
        }
        .history-head {
            margin-bottom: 0.12rem;
        }
        .history-title {
            font-size: 0.12rem;
            color: #999;
        }
        .history-clear {
            font-size: 0.12rem;
            color: @theme-blue;
        }
        .history-menu {
            display: flex;
            flex-wrap: wrap;
        }
        .history-item {
            display: flex;
            align-items: center;
            margin: 0 0.08rem 0.08rem 0;
            padding: 0 0.1rem;
            line-height: 0.28rem;
            border-radius: 0.14rem;
            background: #f5f6f7;
            color: #333;
            font-size: 0.12rem;
        }
        .history-keyword {
            max-width: 1.2rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .history-remove {
            margin-left: 0.08rem;
            color: #999;
            font-size: 0.14rem;
        }
    }
    .search-box {
        .item {
            padding: 0.2rem 0.1rem;
            h4 {
                color: @font-normal;
            }
            p {
                font-size: 0.16rem;
                line-height: 0.2rem;
                margin: 0.1rem 0;
            }
            .small-box {
                > * {
                    display: inline-block;
                    vertical-align: middle;
                    font-size: 0.1rem;
                    margin-right: 0.04rem;
                    color: #999;
                }
            }
        }
        .item-l {
            width: 70%;
            padding-right: 10px;
        }
        .item-r {
            width: 30%;
            img {
                width: 100%;
            }
        }
    }
</style>
