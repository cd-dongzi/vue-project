<template>
    <article class="hotnews-wrapper">
        <div class="hotnews-topbar border-half-bottom">
            <div class="top-menu-bar">
                <swiper :options="swiperOption" ref="swiper-box">
                    <swiper-slide 
                        v-for="(news, index) in hotNewsList" 
                        :class="{'active': hotNewsIndex === index}" 
                        @click.native="active(index)" 
                        :key="index">
                        {{news.title}}
                    </swiper-slide>
                </swiper>
            </div>
        </div>

        <div class="swiper-mask df-c" v-show="hotNewsLoading">
            <CircleLoading></CircleLoading>
        </div>

        <swiper ref="swiper-wrapper" id="swiper-container" @slideChangeTransitionEnd="end">
            <swiper-slide v-for="(news, index) in hotNewsList" :key="index">
                <section class="swiper-box">
                    <ul>
                        <li v-for="item in news.list" class="item border-half-bottom" @click="skip($router, item.id)">
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
                                    <img :src="img" :alt="img" :style="{width: item.images.length === 2 ? '40%':'25%'}" v-for="img in item.images">
                                </div>
                                <div class="df-sb">
                                    <div class="small-box">
                                        <span>{{item.source}}</span>
                                        <span>评论：{{item.comment}}</span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <NoneData v-if="news.list&&news.list.length>0"></NoneData>
                </section>
            </swiper-slide>
        </swiper>
    </article>
</template>
<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import { mapGetters } from 'vuex'
    import CircleLoading from 'components/CircleLoading'
    import NoneData from 'components/NoneData'
    export default {
        components: {
            swiper, 
            swiperSlide,
            CircleLoading,
            NoneData
        },
        data () {
            return {
                swiperOption: {
                    slidesPerView: 3
                }
            }
        },
        created () {
            this.$store.dispatch('getHotNewsList', this.hotNewsList[this.hotNewsIndex])
        },
        methods: {
            async active (index) {
                this.$store.state.hotnews.hotNewsIndex = index
                await this.$store.dispatch('getHotNewsList', this.hotNewsList[this.hotNewsIndex])
            },
            async end () {
                this.$store.state.hotnews.hotNewsIndex = this.swiper.activeIndex
                let data = await this.$store.dispatch('getHotNewsList', this.hotNewsList[this.hotNewsIndex])
            },
            skip (router, id) {
                router.push({path: `/article/${id}`})
            }
        },
        computed: {
            swiper () {
                return this.$refs['swiper-wrapper'].swiper
            },
            ...mapGetters([
                'hotNewsList',
                'hotNewsIndex',
                'hotNewsLoading',
                'hotNewsEnd'
            ])
        },
        watch: {
            hotNewsIndex () {
                if (this.$refs['swiper-wrapper']) {
                    this.swiper.slideTo(this.hotNewsIndex)
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    @bar-color: #f4f5f6;
    
    .hotnews-wrapper {
        overflow-y: scroll;
    }
    
    .hotnews-topbar {
        height: 0.4rem;
        line-height: 0.4rem;
        color: @font-normal;
        font-size: 0.16rem;
        text-align: center;
        position: relative;
        background: @bar-color;
        .active {
            color: @theme-red;
        }
        .top-menu-bar {
            width: 100%;
            position: absolute;
        }
    }
    
    .swiper-mask {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;top: 0.4rem;
        background: #f4f4f4;
        z-index: 9;
    }
    
    #swiper-container {
        width: 100%;
        height: e("calc(100% - 0.4rem)");
        .swiper-box {
            width: 100%;
            height: 100%;
            overflow-y: scroll;
        }
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
                >* {
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
