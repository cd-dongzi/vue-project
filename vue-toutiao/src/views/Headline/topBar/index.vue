<template>
    <div class="headeline-top-bar df-c">
        <div class="item border-half-right" v-for="item in list" @click="show(item.title)">
            <Icon :name="item.icon"></Icon>
            <span>{{item.title}}</span>
        </div>
        <TextComponent :class="{'text-active':textBol}" @close="textBol=false"></TextComponent>
    </div>
</template>
<script>
    import TextComponent from '../text/index'
    export default {
        components: { TextComponent },
        data () {
            return {
                list: [
                    {title: '文字', icon: '24'},
                    {title: '图片', icon: 'tupian'},
                    {title: '上传视频', icon: 'shipin'},
                ],
                textBol: false
            }
        },
        methods: {
            show (text) {
                if (!this.$store.state.user.user.name) {
                    this.$alert({content: '请先登录!'}).then ( () => {
                        this.$store.state.user.isLogin = true
                    })
                    return
                }
                if (text === '文字') {
                    this.textBol = true 
                }else if(text === '图片') {
                    this.$alert('图片模块暂未完成!!!')
                }else if(text === '上传视频') {
                    this.$alert('上传视频模块暂未完成!!!')
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .headeline-top-bar {
        padding: 0.1rem 0;
        .text-active {
            top: 0;
        }
    }
    
    .item {
        width: e("calc(100% / 3)");
        text-align: center;
        font-size: 0.16rem;
        height: 0.2rem;
        line-height: 0.2rem;
        >* {
            display: inline-block;
            vertical-align: middle;
        }
        svg {
            font-size: 0.2rem;
        }
    }
    .item:nth-child(1) {
        svg {color: @theme-blue;}
    }
    .item:nth-child(2) {
        svg {color: @theme-green;}
    }
    .item:nth-child(3) {
        svg {color: @theme-red;}
    }
</style>