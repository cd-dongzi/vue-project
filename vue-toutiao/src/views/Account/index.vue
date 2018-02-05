<template>
    <article>
        <div class="account-container">
            <Head></Head>
            <Body></Body>  
        </div>
        <footerBar></footerBar>
    </article>
</template>
<script>
    import footerBar from 'views/Layout/footerBar'
    import Head from './head/index'
    import Body from './body/index'
    export default {
        components: { footerBar, Head, Body },
        methods: {
            demo (obj) {
                console.log(obj)
            }
        }
    }
</script>
<style lang="less" scoped>
    .account-container {
        height: e("calc(100% - 0.5rem)");
    }
</style>