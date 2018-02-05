<template>
    <div class="search-wrapper">
        <HeadComponent></HeadComponent>
        <BodyComponent></BodyComponent>
    </div>
</template>
<script>
    import HeadComponent from './head/index'
    import BodyComponent from './body/index'
    export default {
        components: { HeadComponent, BodyComponent },
        datat () {
            return {

            }
        }
    }
</script>
<style lang="less" scoped>
    .search-wrapper {
        width: 100%; height: 100%;
        background: #fff;
    }
</style>