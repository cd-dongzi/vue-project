<template>
    <div class="nonedata-wrappe">
        <Icon name="icon2"></Icon>
        <span>这家伙太懒！什么也没留下</span>
    </div>
</template>
<style lang="less" scoped>
    .nonedata-wrappe {
        margin-top: 0.5rem;
        text-align: center;
        svg {
            font-size: 0.7rem;
            color: @font-gray;
        }
        span {
            font-size: 0.16rem;
            margin-left: 0.2rem;
            color: @font-gray;
        }
        >* {
            display: inline-block;
            vertical-align: middle;
            font-size: 0.14rem;
            color: @font-gray;
        }
    }
</style>