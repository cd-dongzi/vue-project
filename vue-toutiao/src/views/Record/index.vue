<template>
    <div class="record-wrapper">
        <!-- title -->
        <HeaderBar title="收藏/历史"></HeaderBar>

        <!-- tabs -->
        <div class="tabs df-c border-half-top">
            <div class="tab" v-for="(type, i) in recordTypes" :class="{'tab-active': i === recordIndex}" @click="activeTabs(i)">{{type.title}}</div>
        </div>
        
        <!-- loading -->
        <div class="swiper-mask df-c" v-show="recordLoading">
            <CircleLoading></CircleLoading>
        </div>
        <swiper ref="swiper-wrapper" id="swiper-container" @slideChangeTransitionEnd="end">
            <swiper-slide v-for="(type,index) in recordTypes" :key="index">
                <section class="swiper-box">
                    <p class="tip">昨天总共阅读了{{type.list.length || 0}}篇文章</p>
                    <ul>
                        <li v-for="item in type.list" class="item border-half-bottom" @click="skip($router, item.id)">
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
                    <NoneData v-if="type.list.length > 0"></NoneData>
                </section>
            </swiper-slide>
        </swiper>
    </div>
</template>
<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import { mapGetters } from 'vuex'
    export default {
        components: {
            swiper, 
            swiperSlide
        },
        mounted () {
            this.slidePage(this.$route.params.type)
        },
        methods: {
            slidePage (index) {
                this.$store.state.record.index = index || 0
                this.$store.dispatch('getRecordList', this.recordTypes[this.recordIndex])
                this.swiper.slideTo(index)
            },
            activeTabs (index) {
                this.slidePage(index)
            },
            async end () {
                this.$store.state.record.index = this.swiper.activeIndex
                this.$store.dispatch('getRecordList', this.recordTypes[this.recordIndex])
            }
        },
        computed: {
            swiper () {
                return this.$refs['swiper-wrapper'].swiper
            },
            ...mapGetters([
                'recordTypes',
                'recordIndex',
                'recordLoading',
                'recordEnd'
            ])
        },
        watch: {
            $route () {
                this.slidePage(this.$route.params.type)
            }
        }
    }
</script>
<style lang="less" scoped>
    .swiper-mask {
        width: 100%;
        height: e("calc(100% - 0.8rem)");
        position: absolute;
        left: 0;top: 0.8rem;
        background: #f4f4f4;
        z-index: 9;
    }
    .tabs {
        background-color: #fff;
        .tab {
            width: 0.7rem;
            text-align: center;
            line-height: 0.4rem;
            font-size: 0.14rem;
            margin: 0 0.15rem;
            border-bottom: 0.02rem solid transparent;
        }
        .tab-active {
            color: @theme-red;
            border-bottom: 0.02rem solid @theme-red;
        }
    }
    #swiper-container {
        width: 100%;
        height: e("calc(100% - 0.9rem)");
        .swiper-box {
            width: 100%;
            height: 100%;
            overflow-y: scroll;
        }
        .tip {
            line-height: 0.4rem;
            color: @font-gray;
            padding: 0 0.1rem;
            font-size: 0.14rem;
        }
        .item {
            padding: 0.2rem 0.1rem;
            background-color: #fff;
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
