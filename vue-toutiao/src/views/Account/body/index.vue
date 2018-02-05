<template>
    <section class="body-wrapper border-half">
        <div class="li border-half" @click="$router.push('/msg')">
            <div>消息通知</div>
            <Icon name="arrow"></Icon>
        </div>
        
        <div class="li border-half-top" @click="$router.push('/mall')">
            <div>头条商城</div>
            
            <div class="df-c">
                <span>邀请好友得200元现金</span>
                <Icon name="arrow"></Icon>
            </div>
            
        </div>
        <div class="li border-half" @click="$router.push('/jd')">
            <div>京东特供</div>
            <div class="df-c">
                <span>新人领188红包</span>
                <Icon name="arrow"></Icon>
            </div>
        </div>

        <div class="li border-half-top" @click="$router.push('/feedback')">
            <div>用户反馈</div>
            <Icon name="arrow"></Icon>
        </div>
        <div class="li border-half-top" @click="$router.push('/system')">
            <div>系统设置</div>
            <Icon name="arrow"></Icon>
        </div>
    </section>
</template>
<style lang="less" scoped>
    .body-wrapper {
        border-left: none;
        border-right: none;
    }
    .li {
        height: 0.5rem;
        line-height: 0.5rem;
        width: 100%;
        padding: 0 0.1rem;
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        svg {
            color: #bbb;
        }
        span {
            color: @font-gray;
            font-size: 0.12rem;
            margin-right: 0.08rem;
        }

        &:nth-child(1) {
            margin: 0.1rem 0;
            &:before {
                border-left: none;
                border-right: none;
            }
        }
        &:nth-child(3) {
            margin-bottom: 0.1rem;
            &:before {
                border-left: none;
                border-right: none;
            }
        }
    }
</style>