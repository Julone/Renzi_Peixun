<template>
    <div class="ERROR_MODULE MODULE">

        <van-empty image="search" description="找不到此页面">
            <van-button borderless type="info"  plain :to="{path: '/'}">返回首页</van-button>
        </van-empty>
    </div>
</template>
<script>
    export default {

    }
</script>
<style lang="less">
    .ERROR_MODULE{
        .flex(@d: column);
        width: 100%;
        height: 500px;
    }
</style>