<template>
    <article class="video-wrapper" v-scroll="loadingMore">
        <div class="video-container">
            <section class="item border-half-bottom" v-for="(item, index) in videoList">
                <div class="video">
                    <video :src="item.video"></video>

                    <!-- canvas代替video播放 -->
                    <div class="canvas-video bg-cover" :style="{backgroundImage: `url(${item.images})`}">
                        <canvas @click="pause(index, item)"></canvas>
                    </div>

                    <div class="title" v-show="!item.playBol">
                        <h4>{{item.title}}</h4>
                        <small>{{item.video_num}}次播放</small>
                    </div>
                    <div class="play" @click="play(index, item)" v-show="!item.playBol">
                        <Icon name="play"></Icon>
                    </div>
                    <time v-show="!item.playBol">{{item.time}}</time>
                    <div class="avatar bg-cover-all" v-show="!item.playBol" :style="{backgroundImage: `url(${item.image})`}"></div>
                </div>
                <div class="intro df-sb">
                    <div class="source">{{item.source}}</div>
                    <div class="box df-c">
                        <div @click="item.attention = !item.attention">
                            <div v-if="item.attention">已关注</div>
                            <div v-else>
                                <Icon name="attention"></Icon>
                                <span>关注</span>
                            </div>
                        </div>
                        <div>
                            <Icon name="custom-comment"></Icon>
                            <span>{{item.comment_num || '评论'}}</span>
                        </div>
                        <div>
                            <Icon name="More"></Icon>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <DefaultLoading v-show="videoLoading"></DefaultLoading>
        <NoneData v-if="videoEnd"></NoneData>
    </article>
</template>
<script>
    import { mapGetters } from 'vuex'
    export default {
        data () {
            return {
                pageindex: 1
            }
        },
        created () {
            this.$store.dispatch('getVideoList', { pageindex: this.pageindex })
        },
        methods: {
            // 加载更多
            loadingMore () {
                return new Promise( async (resolve, reject) => {
                    this.pageindex ++
                    await this.$store.dispatch('getVideoList', { pageindex: this.pageindex })
                    resolve()
                })
            },
            // 播放
            play (index, item) {
                item.playBol = true
                this.$set(this.videoList, index, item)
                this.dragVideo(index)
            },
            // 暂停
            pause (index, item) {
                document.querySelectorAll('video')[index].pause()
                item.playBol = false
                this.$set(this.videoList, index, item)
            },
            // canvas 绘制
            dragVideo (index) {
                let video = document.querySelectorAll('video')[index],
                    ctx = document.querySelectorAll('canvas')[index].getContext('2d')
                video.play()
                let fps = 1000/30,
                    w = document.querySelectorAll('.video')[index].clientWidth,
                    h = document.querySelectorAll('.video')[index].clientHeight

                video.addEventListener('play', () => {
                    setInterval( () => {
                        ctx.drawImage(video, 0, 0, 320, 176);
                    }, fps)
                })
            }
        },
        computed: {
            ...mapGetters([
                'videoList',
                'videoLoading',
                'videoEnd'
            ])
        }
    }
</script>
<style lang="less" scoped>
    .video-wrapper {
        overflow-y: scroll;
    }
    .item {
        padding: 0.1rem 0;
        .video {
            width: 100%;
            height: 2rem;
            background-color: #000;
            position: relative;
            video {
                width: 100%;
                display: none;
                height: 100%;
            }
            .canvas-video {
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;top: 0;
                canvas {
                    width: 100%;
                    height: 100%;
                }
            }
            
            .play {
                position: absolute;
                left: 50%;top: 50%;
                transform: translate(-50%, -50%);
                background-color: rgba(0, 0, 0, .3);
                border-radius: 50%;
                z-index: 3;
                svg {
                    color: #fff;
                    font-size: 0.4rem;
                }
            }
            .title {
                position: absolute;
                left: 0;top: 0;
                line-height: 0.2rem; 
                width: 100%;
                color: #f4f4f4;
                padding: 0.04rem 0.1rem;
                background: linear-gradient(top , rgba(0, 0, 0, .45), rgba(0, 0, 0, 0) 100%);
                background: -webkit-linear-gradient(top , rgba(0, 0, 0, .45), rgba(0, 0, 0, 0) 100%);
                small {
                    font-size: 0.12rem;
                }
            }
            time {
                position: absolute;
                right: 0.1rem; bottom: 0.1rem;
                font-size: 0.1rem;
                padding: 0.04rem 0.08rem;
                border-radius: 0.06rem;
                background-color: rgba(0, 0, 0, .5);
                color: #f4f4f4;
            }
            .avatar {
                width: 0.4rem;
                height: 0.4rem;
                border-radius: 50%;
                position: absolute;
                bottom: -0.1rem;
                left: 0.2rem;
            }
        }

        .intro {
            margin-top: 0.1rem;
            padding: 0 0.1rem;
            .source {
                font-size: 0.14rem;
            }
            .box {
                >*{
                    margin-left: 0.14rem;
                    font-size: 0.12rem;
                    color: @font-gray;
                }
            }
        }
    }
</style>