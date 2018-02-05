<template>
    <div class="home-topbar-wrapper border-half-bottom">
        <div class="top-menu-bar">
            <swiper :options="swiperOption" ref="swiper-box">
                <swiper-slide v-for="(news, index) in newsList" :class="{'active': homeNewsIndex === index}" @click.native="active(index)" :key="index">{{news.title}}</swiper-slide>
            </swiper>
        </div>
        <a class="top-menu-more-btn df-c" href="javascript:void(0)" @click="isTopBarBox=true"><i class="list-shadow"></i><span class="cross"></span></a>

        <TopBarBox :class="{'top-bar-active-active': isTopBarBox}" @close="isTopBarBox=false"></TopBarBox>
        
    </div>
</template>
<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import { mapGetters } from 'vuex'
    import TopBarBox from 'components/TopBarBox'
    export default {
        components: {
            swiper, 
            swiperSlide,
            TopBarBox
        },
        data () {
            return{
                swiperOption: {
                    slidesPerView: 6
                },
                isTopBarBox: false
            }
        },
        methods: {
            async active (index) {
                this.$store.state.home.newsIndex = index
                await this.$store.dispatch('getHomeList', this.newsList[this.homeNewsIndex])
            }
        },
        computed: {
            swiper () {
                return this.$refs['swiper-box'].swiper
            },
            ...mapGetters([
                'newsList',
                'homeNewsIndex'
            ])
        }
    }
</script>
<style lang="less" scoped>
    @bar-color: #f4f5f6;
    .home-topbar-wrapper {
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
            width: e("calc(100% - 0.4rem)");
            position: absolute;
            
        }
        .top-bar-active-active {
            top: 0.1rem;
        }
        .top-menu-more-btn {
            position: absolute;
            right: 0;top: 0;
            width: 0.4rem;
            height: 0.4rem;
            background: @bar-color;
            z-index: 9;
            .list-shadow {
                position: absolute;
                right: 100%;top: 0;
                width: 0.1rem;
                height: 100%;
                background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAABXCAQAAACjUt0DAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAAEgAAABIAEbJaz4AAAAJdnBBZwAAABIAAABXAK421QoAAAFiSURBVEjH1ZbbtoMgDERnKP//yaYPVSAhF077dHQtamU7k0RKAxwcPCF4ItF+tWMNsVZS91uJhNlRX7FGPMgizOrEObJSiZUUAnRkR6q0qnErm7Lhc9UDBaXUt0kN0FOaOo4SQ5BRCahOA3HT5KwTE50GZhV37VazJKYljjE2SE+sPsittC1XW/FmgNVsZJcvuhvrAbLqffNadPXLYgaLzs8wWSo6rk9FYdeBUW/x1DRswfS6ysuNlcDZ7ssTSCpIfDsZn/J8b+Omh8pjR/X8DkuWndwnINpOlukFbtvzVslAEmF+TCMaCC4fkr8oKUgVzmQ4IBojHfqFqwd28O0S6AXA7ib2P+HOTlzLcXZ3+tFz6yRObiOmGY+3k6ev5XN97Uq7FoCXkl5HTrT6tQiw2u1aY/TrZF551jyMFPZiOqW1O5zXiJx1PV/2Tw52tD8ddYc/9Zlq7qhBrlrtuhX/98cbycGBFpNaiv0AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTQtMDItMjdUMTc6NDQ6NDErMDg6MDDFbrv7AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE0LTAyLTI3VDE3OjQ0OjQxKzA4OjAwtDMDRwAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAASUVORK5CYII=) no-repeat center right;
                background-size: contain;
            }
            .cross {
                width: 0.17rem;
                height: 0.17rem;
                &:before, &:after {
                    position: absolute;
                    content: ' ';
                    height: 0.17rem;
                    width: 0.04rem;
                    background-color: @theme-red;
                }
                &:before {
                    transform: rotate(90deg);
                }
            }
        }
    }
</style>