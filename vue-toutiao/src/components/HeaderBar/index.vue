<template>
    <section>
        <div class="head">
            <Icon name="jiantou" class="back" @click.native="back($router)"></Icon>
            <h2>{{title}}</h2>
        </div>
    </section>
</template>
<script>
    export default {
        props: {
            title: {
                type: String,
                default: '今日头条'
            }
        }
    }
</script>
<style lang="less" scoped>
    .head {
        width: 100%;
        height: 0.5rem;
        position: relative;
        background-color: #fff;
        svg {
            font-size: 0.25rem;
        }
        h2 {
            height: 100%;
            line-height: 0.5rem;
            font-size: 0.18rem;
            text-align: center;
            color: #555;
        }
        .back {
            position: absolute;
            left: 0.1rem;top: 50%;
            transform: translateY(-50%);
        }
    }
</style>