<template>
    <div class="system-wrapper">
        <HeaderBar title="系统设置"></HeaderBar>
        <div class="box border-half">
            <div class="li df-sb border-half-bottom">账号设置</div>
            <div class="li df-sb border-half-bottom">账号和隐私设置</div>
            <div class="li df-sb border-half-bottom">黑名单</div>
        </div>

        <div class="box border-half">
            <div class="li df-sb border-half-bottom">清除缓存</div>
            <div class="li df-sb border-half-bottom">
                <span>字体大小</span>
                <Icon name="arrow"></Icon>
            </div>
            <div class="li df-sb border-half-bottom">
                <span>列表显示摘要</span>
                <SwitchCheck v-model="info.list" @click.native="save"></SwitchCheck>
            </div>
            <div class="li df-sb border-half-bottom">
                <span>非wifi网络流量</span>
                <small>最佳效果（下载大图）</small>
            </div>
            <div class="li df-sb border-half-bottom">
                <span>非wifi网络播放提醒</span>
                <small>提醒一次</small>
            </div>
            <div class="li df-sb border-half-bottom">
                <span>推送通知</span>
                <SwitchCheck v-model="info.send" @click.native="save"></SwitchCheck>
            </div>
        </div>

        <div class="box border-half">
            <div class="li df-sb border-half-bottom">
                <span>头条封面</span>
                <Icon name="arrow"></Icon>
            </div>
            <div class="li df-sb border-half-bottom">
                <span>当前版本</span>
                <Icon name="arrow">6.5.1</Icon>
            </div>
        </div>
        

        <div class="box esc" @click="esc">退出登录</div>
        
    </div>
</template>
<script>
    import { Local } from 'src/utils/storage'
    export default {
        data () {
            return {
                info: {
                    send: Local.get('system_send') || false,
                    list: Local.get('system_list') || false
                }
            }
        },
        methods: {
            save () {
                Local.set({
                    system_send: this.info.send,
                    system_list: this.info.list
                })
            },
            esc () {
                this.$store.dispatch('esc')
                this.$set(this.$store.state.user.footerBarList, 3, {title: '未登录', icon: 'account', path: '/account'})
                this.$router.animate = 2
                this.$router.push('/account')
            }
        }
    }
</script>
<style lang="less" scoped>
    .box {
        margin-top: 0.1rem;
        padding-left: 0.1rem;
        background: #fff;
        &:before {
            border-left: none;
            border-right: none;
        }
        :last-child {
            &:before {
                border-bottom: none;
            }
        }

        .li {
            width: 100%;
            height: 0.4rem;
            font-size: 0.14rem;
            color: #333;
            padding-right: 0.1rem;
        }
        svg {
            color: #bbb;
        }
        small {
            color: @font-gray;
            font-size: 0.12rem;
        }
    }
    .esc {
        text-align: center;
        line-height: 0.4rem;
        margin-top: 0.3rem;
        color: @theme-red;
    }
</style>