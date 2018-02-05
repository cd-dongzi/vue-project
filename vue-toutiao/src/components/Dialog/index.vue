<template>
    <div class="dialog-wrapper" v-if="show">
        <div class="dialog-box">
            <div class="dialog-hd">
                <strong>{{title}}</strong>
            </div>
            <div class="dialog-bd">{{content}}</div>
            <div class="dialog-ft border-half-top" @click="success">{{btn}}</div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                show: true,
                title: '提示',
                content: '',
                btn: '确定'
            }
        },
        methods: {
            success () {}
        }
    }
</script>
<style lang="less" scoped>
    .dialog-wrapper {
        position: fixed;
        width: 100%;height: 100%;
        left: 0;top: 0;
        z-index: 1000;
        background-color: rgba(0, 0, 0, .3);
        .dialog-box {
            position: absolute;
            width: 85%;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            background-color: #fafafc;
            text-align: center;
            border-radius: 3px;
            overflow: hidden;

            .dialog-hd {
                padding: 0.16rem 0 0.1rem 0;
                line-height: 0.18rem;
                color: #333;
            }
            .dialog-bd {
                padding: 0 0.1rem;
                font-size: 0.15rem;
                color: #888;
                word-wrap: break-word;
                word-break: break-all;
            }
            .dialog-ft {
                position: relative;
                line-height: 0.42rem;
                margin-top: 0.2rem;
                font-size: 0.17rem;
                color: #0bb20c;
                cursor: pointer;
            }
        }
    }
</style>