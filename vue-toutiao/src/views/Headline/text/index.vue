<template>
    <div class="text-wrapper">
        <div class="title df-sb border-half-bottom">
            <div class="t-l" @click="$emit('close')">取消</div>
            <div class="t-r t-disable" :class="{'t-active': val}" @click="send">发布</div>
        </div>
        <div class="text-box">
            <textarea placeholder="分享新鲜事..." v-model="val" ref="text"></textarea>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                val: ''
            }
        },
        mounted () {
            this.$refs.text.focus()
        },
        methods: {
            async send () {
                await this.$store.dispatch('addHeadline', {
                    intro: this.val,
                    name: this.$store.state.user.user.name
                })
                this.$emit('close')
            }
        }
    }
</script>
<style lang="less" scoped>
    .text-wrapper {
        position: fixed;
        width: 100%; height: 100%;
        left: 0;top: 100%;
        background-color: #fff;
        z-index: 100;
        transition: top .2s ease-out;
        .title {
            color: #333;
            height: 0.4rem;
            line-height: 0.4rem;
            padding: 0 0.1rem;
            font-size: 0.14rem;
            
            .t-disable {
                color: #ccc;
                pointer-events: none;
            }
            .t-active {
                color: @theme-blue;
                pointer-events: inherit;
            }
        }
        .text-box {
            width: 100%;
            height: e("calc(100% - 0.5rem)");
            textarea {
                width: 100%;
                height: 100%;
                padding: 0.1rem;
                font-size: 0.14rem;
                border: 1px solid transparent;
                outline: none;
                transition: border-color .2s cubic-bezier(.645,.045,.355,1);
            }
        }

    }
</style>