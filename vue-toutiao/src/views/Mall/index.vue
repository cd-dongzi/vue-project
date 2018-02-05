<template>
    <div class="record-wrapper">
        <HeaderBar title="头条商城"></HeaderBar>
		
		<div class="recommend">
			<h4>精选推荐</h4>
			<div class="recommend-box df-sb">
				<div class="item" @click="$alert(`暂未 “放心购” 模块`)">
					<h5>放心购</h5>
					<span>放心买好货</span>
				</div>
				<div class="item" @click="$alert(`暂未 “火车票” 模块`)">
					<h5>火车票</h5>
					<span>春运抢票</span>
				</div>
			</div>
		</div>
		<div class="box border-half">
			<h4>头条服务</h4>
            <div class="li df-sb border-half-bottom" v-for="v in headList" @click="$alert(`暂未 “${v.title}” 模块`)">
                <span>{{v.title}}</span>
                <Icon name="arrow"></Icon>
            </div>
        </div>
        <div class="tip">客服电话服务工作时间：看心情</div>
    </div>
</template>
<script>
    export default {
    	data () {
    		return {
    			headList: [
    				{title: '邀请有礼'},
    				{title: '卡包'},
    				{title: '免流量服务'},
    				{title: '今日特卖'},
    				{title: '火车票'},
    				{title: '股票'},
    				{title: '我的订单'},
    				{title: '我的交易'}
    			]
    		}
    	}
    }
</script>
<style lang="less" scoped>
	.recommend {
		background-color: #fff;
		padding: 0.1rem;
	}
	.recommend-box {
		.item {
			width: 47%;
			padding: 0.4rem 0;
			background-color: #eee;
			padding-left: 0.1rem;
		}
		h5 {
			font-size: 0.2rem;
			color: #333;
		}
		span {
			font-size: 0.16rem;
			color: #aaa;
			line-height: 0.24rem;
		}
	}
	h4 {
		line-height: 0.4rem;
	}
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
	.tip {
		text-align: center;
		font-size: 0.12rem;
		color: @font-gray;
		margin-top: 0.2rem;
	}
</style>
